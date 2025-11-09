import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SearchFilters = {
  status: string;
  genres: string;
  type: string;
  rating: string;
  q: string;
  limit: number; // always 24 by default
  page: number;
};

interface SearchState {
  loading: boolean;
  results: Record<string, any> | null;
  pagination: Record<string, any> | null;
  currentPage: string;
  currentQuery: SearchFilters;
  searchStarted: boolean;
}

const defaultQuery: SearchFilters = {
  status: "",
  genres: "",
  type: "",
  rating: "",
  q: "",
  limit: 24,
  page: 1,
};

const initialState: SearchState = {
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // 2) set searched results
    setResults(state, action: PayloadAction<Record<string, any>>) {
      state.results = action.payload;
    },
    setPagination(state, action: PayloadAction<Record<string, any>>) {
      state.pagination = action.payload;
    },
    // 3) set current page (string)
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    // 4) set current query (merge with defaults; keeps limit=24 unless overridden)
    setCurrentQuery(state, action: PayloadAction<Partial<SearchFilters> | SearchFilters>) {
      state.currentQuery = { ...defaultQuery, ...state.currentQuery, ...action.payload };
      if (!("limit" in action.payload)) state.currentQuery.limit = 24;
    },
    setSearchStarted(state, action: PayloadAction<boolean>) {
      state.searchStarted = action.payload;
    },
    // (optional) quick reset between searches
    resetSearch(state) {
      state.loading = false;
      state.results = null;
      state.currentPage = "1";
      state.currentQuery = defaultQuery;
    },
  },
});

export const { setLoading, setResults, setPagination, setCurrentPage, setCurrentQuery, setSearchStarted, resetSearch } =
  slice.actions;
export default slice.reducer;
