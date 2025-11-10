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
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuickSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // 2) set searched results
    setQuickSearchResults(state, action: PayloadAction<Record<string, any>>) {
      state.results = action.payload;
    },
    setQuickSearchPagination(state, action: PayloadAction<Record<string, any>>) {
      state.pagination = action.payload;
    },
    // 3) set current page (string)
    setQuickSearchCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    // 4) set current query (merge with defaults; keeps limit=24 unless overridden)
    setQuickSearchCurrentQuery(state, action: PayloadAction<Partial<QuickSearchFilters> | QuickSearchFilters>) {
      state.currentQuery = { ...defaultQuery, ...state.currentQuery, ...action.payload };
      if (!("limit" in action.payload)) state.currentQuery.limit = 24;
    },
    setQuickSearchStarted(state, action: PayloadAction<boolean>) {
      state.searchStarted = action.payload;
    },
    // (optional) quick reset between searches
    resetQuickSearch(state) {
      state.loading = false;
      state.results = null;
      state.currentPage = "1";
      state.currentQuery = defaultQuery;
    },
  },
});

export const { setQuickSearchLoading, setQuickSearchResults, setQuickSearchPagination, setQuickSearchCurrentPage, setQuickSearchCurrentQuery, setQuickSearchStarted, resetQuickSearch } =
  slice.actions;
export default slice.reducer;
