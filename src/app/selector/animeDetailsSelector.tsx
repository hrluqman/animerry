import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectDetailsState = (s: RootState) => s.animeDetails;

export const selectAnimeDetailsLoading = createSelector(
  [selectDetailsState],
  (s) => s.loading
);

export const selectAnimeDetails = createSelector(
  [selectDetailsState],
  (s) => s.details
);

export const selectAnimeHasDetails = createSelector(
  [selectAnimeDetails],
  (d) => !!d && Object.keys(d).length > 0
);
