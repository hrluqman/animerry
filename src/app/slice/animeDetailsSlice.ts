import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AnimeDetailsState {
  loading: boolean;
  details: Record<string, any> | null;
}

const initialState: AnimeDetailsState = {
  loading: false,
  details: null,
};

const animeDetailsSlice = createSlice({
  name: "animeDetails",
  initialState,
  reducers: {
    // 1) loading true/false
    setDetailsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // 2) set details payload
    setAnimeDetails(state, action: PayloadAction<Record<string, any> | null>) {
      state.details = action.payload;
    },
    resetAnimeDetails(state) {
      state.loading = false;
      state.details = null;
    },
  },
});

export const { setDetailsLoading, setAnimeDetails, resetAnimeDetails } =
  animeDetailsSlice.actions;
export default animeDetailsSlice.reducer;
