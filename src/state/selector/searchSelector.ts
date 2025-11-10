import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectSearchState = (s: RootState) => s.search;

export const selectSearchResults = createSelector(
  selectSearchState,
  (s) => s.results
);

export const selectSearchPagination = createSelector(
  selectSearchState,
  (s) => s.pagination
);

export const selectSearchLoading = createSelector(
  selectSearchState,
  (s) => s.loading
);

export const selectSearchCurrentPage = createSelector(
  selectSearchState,
  (s) => s.currentPage
);

export const selectSearchCurrentQuery = createSelector(
  selectSearchState,
  (s) => s.currentQuery
);

export const selectSearchStarted = createSelector(
  selectSearchState,
  (s) => s.searchStarted
);