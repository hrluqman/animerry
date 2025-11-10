// ---- Image types ----
export type JikanImageVariant = {
  image_url: string | undefined;
  small_image_url?: string | undefined;
  large_image_url?: string | undefined;
};

export type JikanImages = {
  jpg?: JikanImageVariant;
  webp?: JikanImageVariant;
};

// ---- Trailer ----
export type JikanTrailerImages = {
  image_url: string | null;
  small_image_url: string | null;
  medium_image_url: string | null;
  large_image_url: string | null;
  maximum_image_url: string | null;
};

export type JikanTrailer = {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: JikanTrailerImages;
};

// ---- Title / Dates ----
export type JikanTitle = { type: "Default" | "Synonym" | "Japanese" | "English"; title: string };

export type JikanAiredProp = {
  from: { day: number | null; month: number | null; year: number | null };
  to: { day: number | null; month: number | null; year: number | null };
};

export type JikanAired = {
  from: string | null;
  to: string | null;
  prop: JikanAiredProp;
  string: string | null;
};

// ---- Companies / Tags ----
export type JikanCompany = { mal_id: number; type: "anime"; name: string; url: string };
export type JikanGenre = { mal_id: number; type: "anime"; name: string; url: string };
export type JikanDemographic = JikanGenre;

// ---- Full detail (matches your object) ----
export interface AnimeDetail {
  mal_id: number;
  url: string;
  images: JikanImages;
  trailer: JikanTrailer;
  approved: boolean;
  titles: JikanTitle[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;                // "TV" | "Movie" | ...
  source: string | null;       // "Manga" | ...
  episodes: number | null;
  status: string;              // "Finished Airing" | ...
  airing: boolean;
  aired: JikanAired;
  duration: string | null;     // e.g. "24 min per ep"
  rating: string | null;       // e.g. "PG-13 - Teens 13 or older"
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;       // "fall"
  year: number | null;         // 2023
  broadcast?: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };

  producers: JikanCompany[];
  licensors: JikanCompany[];
  studios: JikanCompany[];

  genres: JikanGenre[];
  explicit_genres: JikanGenre[];
  themes: JikanGenre[];
  demographics: JikanDemographic[];
}

export type AnimeCardItem = Pick<
  AnimeDetail,
  "mal_id" | "images" | "title" | "type" | "synopsis" | "status" | "genres"
>;

// Helper to pick best poster URL
export const getPoster = (img?: JikanImages) =>
  img?.webp?.image_url ?? img?.jpg?.image_url ?? "";

// Helper to pick large/backdrop-ish
export const getLargeImage = (img?: JikanImages) =>
  img?.webp?.large_image_url ?? img?.jpg?.large_image_url ?? getPoster(img);
