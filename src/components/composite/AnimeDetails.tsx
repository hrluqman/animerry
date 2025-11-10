import type { Key } from "react";
import Navbar from "./Navbar";
import AnimerryFooter from "./AnimerryFooter";
import { Card } from "../ui/card";
import type { JikanRecommendation } from "../../lib/jikanTyping";

type Img = { webp?: { image_url?: string; large_image_url?: string } };

type Entry = { name: string; url?: string };

type AnimeDetail = {
  title?: string;
  title_english?: string;
  images?: Img;
  synopsis?: string;
  source?: string;
  score?: number;
  rating?: string;
  episodes?: number;
  status?: string;
  year?: number;
  genres?: Entry[];
  studios?: Entry[];
  streaming?: Entry[];
};

interface AnimeDetailPageProps {
  data: AnimeDetail;
  animeRecommendations: JikanRecommendation[];
}

const chip = (label: string, key?: Key) => (
  <span
    key={key}
    className="inline-flex items-center rounded-full border border-[#cf3422] bg-white/5 px-3 py-1 text-xs text-light"
  >
    {label}
  </span>
);

export default function AnimeDetailPage({
  data,
  animeRecommendations,
}: AnimeDetailPageProps) {
  const banner = data.images?.webp?.large_image_url || "";
  const cover = data.images?.webp?.image_url || banner;
  const title = data.title_english || data.title || "Untitled";

  return (
    <main className="min-h-screen w-full bg-theme-dark text-light">
      <Navbar className="bg-[#1c1c1c91]" />
      {/* Banner */}
      <div className="relative h-[30vh] min-h-[220px] w-full overflow-hidden">
        <img
          src={banner}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-theme-dark/95" />
      </div>

      {/* Content container */}
      <div className="mx-auto -mt-20 w-full max-w-6xl px-4 pb-16 sm:-mt-24 md:-mt-28">
        {/* Overlapping header section */}
        <div className="relative grid grid-cols-1 gap-6 rounded-xl bg-white/5 p-4 backdrop-blur-md sm:grid-cols-[160px,1fr] sm:p-6">
          {/* Cover image (overlaps between banner and card) */}
          <div className="-mt-24 h-[220px] w-[160px] overflow-hidden rounded-lg border border-white/10 shadow-lg sm:mt-0 sm:h-[240px] sm:w-[170px]">
            <img
              src={cover}
              alt={`${title} cover`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title + synopsis + source */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold leading-tight md:text-3xl">
              {title}
            </h1>
            {data.synopsis && (
              <p className="max-w-3xl text-sm/6 text-white/80">
                {data.synopsis}
              </p>
            )}
            {data.source && (
              <p className="pt-1 text-xs text-white/60">
                (Source: {data.source})
              </p>
            )}

            {/* Quick meta grid */}
            <dl className="mt-2 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div className="rounded-lg bg-white/5 p-3">
                <dt className="text-white/60">Score</dt>
                <dd className="text-base font-semibold">{data.score ?? "—"}</dd>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <dt className="text-white/60">Rating</dt>
                <dd className="text-base font-semibold">
                  {data.rating ?? "—"}
                </dd>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <dt className="text-white/60">Episodes</dt>
                <dd className="text-base font-semibold">
                  {data.episodes ?? "—"}
                </dd>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <dt className="text-white/60">Status / Year</dt>
                <dd className="text-base font-semibold">
                  {data.status ?? "—"}
                  {data.year ? ` • ${data.year}` : ""}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Tags & extra info */}
        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white/5 p-4 md:col-span-2">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70">
              Genres
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.genres?.length ? (
                data.genres.map((g) => chip(g.name, g.name))
              ) : (
                <span className="text-white/60">—</span>
              )}
            </div>

            <h2 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-white/70">
              Studios
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.studios?.length ? (
                data.studios.map((s) => chip(s.name, s.name))
              ) : (
                <span className="text-white/60">—</span>
              )}
            </div>
          </div>

          <aside className="rounded-xl bg-white/5 p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70">
              Where to Watch
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.streaming?.length ? (
                data.streaming.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-theme underline-offset-2 hover:underline"
                  >
                    {chip(s.name, s.name)}
                  </a>
                ))
              ) : (
                <p className="text-xs text-white/60">Not available</p>
              )}
            </div>
          </aside>
        </section>

        {/* Anime Recommendations */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/70">
            Recommendations
          </h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {animeRecommendations?.length ? (
              animeRecommendations.map((item: JikanRecommendation, index: number) => (
                <a
                  key={`${item.entry.mal_id}-${index}`}
                  href={`/anime/${item.entry.mal_id}`}
                >
                  <Card className="bg-transparent relative h-full flex flex-col justify-between border-0 hover:shadow-md gap-2 pt-0">
                    {/* Fixed aspect-ratio image wrapper */}
                    <div className="relative w-full aspect-[2/3] overflow-hidden rounded">
                      <img
                        src={item.entry.images?.webp?.large_image_url}
                        alt={item.entry.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </div>
                    <p className="text-light text-sm font-semibold truncate">
                      {item.entry.title}
                    </p>
                  </Card>
                </a>
              ))
            ) : (
              <p className="text-xs text-white/60">Not available</p>
            )}
          </div>
        </section>
      </div>

      <AnimerryFooter />
    </main>
  );
}
