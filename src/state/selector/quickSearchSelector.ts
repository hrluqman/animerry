import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const selectQuickSearchState = (s: RootState) => s.quickSearch;

export const selectQuickSearchResults = createSelector(
  selectQuickSearchState,
  (s) => s.results
);

export const selectQuickSearchPagination = createSelector(
  selectQuickSearchState,
  (s) => s.pagination
);

export const selectQuickSearchLoading = createSelector(
  selectQuickSearchState,
  (s) => s.loading
);

export const selectQuickSearchCurrentPage = createSelector(
  selectQuickSearchState,
  (s) => s.currentPage
);

export const selectQuickSearchCurrentQuery = createSelector(
  selectQuickSearchState,
  (s) => s.currentQuery
);

export const selectQuickSearchStarted = createSelector(
  selectQuickSearchState,
  (s) => s.searchStarted
);

export const selectQuickSearchError = createSelector(
  selectQuickSearchState,
  (s) => s.error
);
