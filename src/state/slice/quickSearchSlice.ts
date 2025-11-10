import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type QuickSearchFilters = {
  status: string;
  genres: string;
  type: string;
  rating: string;
  q: string;
  limit: number; // always 24 by default
  page: number;
};

interface QuickSearchState {
  loading: boolean;
  results: Record<string, any> | null;
  pagination: Record<string, any> | null;
  currentPage: string;
  currentQuery: QuickSearchFilters;
  searchStarted: boolean;
  error: string | null;
}

const defaultQuery: QuickSearchFilters = {
  status: "",
  genres: "",
  type: "",
  rating: "",
  q: "",
  limit: 24,
  page: 1,
};

const initialState: QuickSearchState = {
  loading: false,
  results: null,
  pagination: null,
  currentPage: "1",
  currentQuery: defaultQuery,
  searchStarted: false,
  error: null,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuickSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setQuickSearchResults(state, action: PayloadAction<Record<string, any>>) {
      state.results = action.payload;
    },
    setQuickSearchPagination(
      state,
      action: PayloadAction<Record<string, any>>
    ) {
      state.pagination = action.payload;
    },
    setQuickSearchCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    // set current query (merge with defaults; keeps limit=24 unless overridden)
    setQuickSearchCurrentQuery(
      state,
      action: PayloadAction<Partial<QuickSearchFilters> | QuickSearchFilters>
    ) {
      state.currentQuery = {
        ...defaultQuery,
        ...state.currentQuery,
        ...action.payload,
      };
      if (!("limit" in action.payload)) state.currentQuery.limit = 24;
    },
    setQuickSearchStarted(state, action: PayloadAction<boolean>) {
      state.searchStarted = action.payload;
    },
    setQuickSearchError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetQuickSearch(state) {
      state.loading = false;
      state.results = null;
      state.currentPage = "1";
      state.currentQuery = defaultQuery;
      state.error = null;
    },
  },
});

export const {
  setQuickSearchLoading,
  setQuickSearchResults,
  setQuickSearchPagination,
  setQuickSearchCurrentPage,
  setQuickSearchCurrentQuery,
  setQuickSearchStarted,
  setQuickSearchError,
  resetQuickSearch,
} = slice.actions;
export default slice.reducer;
