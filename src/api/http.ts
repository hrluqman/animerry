import { JIKAN_BASE_URL } from "./constants";

export interface ApiOptions {
  signal?: AbortSignal;
  retries?: number;
  timeoutMs?: number;
  init?: RequestInit;
}

type Params = Record<string, string | number | boolean | undefined>;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const join = (base: string, ep: string) =>
  `${base.replace(/\/$/, "")}/${ep.replace(/^\//, "")}`;

/** Replace :param or {param} in path using params; returns [path, restParams] */
function applyPathParams(
  path: string,
  params?: Params
): [string, Params | undefined] {
  if (!params) return [path, undefined];
  const rest: Params = { ...params };

  // :param
  path = path.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const val = rest[key];
    delete rest[key];
    return encodeURIComponent(String(val ?? ""));
  });

  // {param}
  path = path.replace(/\{([A-Za-z0-9_]+)\}/g, (_, key) => {
    const val = rest[key];
    delete rest[key];
    return encodeURIComponent(String(val ?? ""));
  });

  // Clean empty values from rest
  Object.keys(rest).forEach((k) => (rest[k] == null ? delete rest[k] : null));
  return [path, Object.keys(rest).length ? rest : undefined];
}

export async function fetchJikanApi<T = unknown>(
  endpoint: string,
  params?: Params,
  { signal, retries = 1, timeoutMs = 10_000, init }: ApiOptions = {}
): Promise<T> {
  const [templated, rest] = applyPathParams(endpoint, params);
  const url = new URL(join(JIKAN_BASE_URL, templated));

  Object.entries(rest ?? {}).forEach(
    ([k, v]) => v !== undefined && url.searchParams.append(k, String(v))
  );

  const withTimeout = <R>(p: Promise<R>) =>
    new Promise<R>((resolve, reject) => {
      const t = setTimeout(
        () => reject(new Error("Request timed out")),
        timeoutMs
      );
      p.then((x) => {
        clearTimeout(t);
        resolve(x);
      }).catch((e) => {
        clearTimeout(t);
        reject(e);
      });
    });

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await withTimeout(
        fetch(url.toString(), { method: "GET", signal, ...init })
      );
      const isJson = (res.headers.get("content-type") || "").includes(
        "application/json"
      );
      const body = isJson ? await res.json() : await res.text();
      if (!res.ok) {
        if ((res.status === 429 || res.status >= 500) && attempt < retries) {
          attempt++;
          await delay(300 * attempt);
          continue;
        }
        const err = new Error(`HTTP ${res.status}`);
        (err as any).status = res.status;
        (err as any).payload = body;
        throw err;
      }
      return body as T;
    } catch (e: any) {
      if (e?.name === "AbortError") throw e;
      if (attempt < retries) {
        attempt++;
        await delay(300 * attempt);
        continue;
      }
      throw e;
    }
  }
}
