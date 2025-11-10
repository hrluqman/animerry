import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectMangaSearchState = (s: RootState) => s.mangaSearch;

export const selectMangaSearchResults = createSelector(
  selectMangaSearchState,
  (s) => s.results
);

export const selectMangaSearchPagination = createSelector(
  selectMangaSearchState,
  (s) => s.pagination
);

export const selectMangaSearchLoading = createSelector(
  selectMangaSearchState,
  (s) => s.loading
);

export const selectMangaSearchCurrentPage = createSelector(
  selectMangaSearchState,
  (s) => s.currentPage
);

export const selectMangaSearchCurrentQuery = createSelector(
  selectMangaSearchState,
  (s) => s.currentQuery
);

export const selectMangaSearchStarted = createSelector(
  selectMangaSearchState,
  (s) => s.searchStarted
);

export const selectMangaSearchError = createSelector(
  selectMangaSearchState,
  (s) => s.error
);
