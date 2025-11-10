import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type MangaSearchFilters = {
  status: string;
  genres: string;
  type: string;
  rating: string;
  q: string;
  limit: number; // always 24 by default
  page: number;
};

interface MangaSearchState {
  loading: boolean;
  results: Record<string, any> | null;
  pagination: Record<string, any> | null;
  currentPage: string;
  currentQuery: MangaSearchFilters;
  searchStarted: boolean;
}

const defaultQuery: MangaSearchFilters = {
  status: "",
  genres: "",
  type: "",
  rating: "",
  q: "",
  limit: 24,
  page: 1,
};

const initialState: MangaSearchState = {
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
    setMangaSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // 2) set searched results
    setMangaSearchResults(state, action: PayloadAction<Record<string, any>>) {
      state.results = action.payload;
    },
    setMangaSearchPagination(state, action: PayloadAction<Record<string, any>>) {
      state.pagination = action.payload;
    },
    // 3) set current page (string)
    setMangaSearchCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    // 4) set current query (merge with defaults; keeps limit=24 unless overridden)
    setMangaSearchCurrentQuery(state, action: PayloadAction<Partial<MangaSearchFilters> | MangaSearchFilters>) {
      state.currentQuery = { ...defaultQuery, ...state.currentQuery, ...action.payload };
      if (!("limit" in action.payload)) state.currentQuery.limit = 24;
    },
    setMangaSearchStarted(state, action: PayloadAction<boolean>) {
      state.searchStarted = action.payload;
    },
    // (optional) quick reset between searches
    resetMangaSearch(state) {
      state.loading = false;
      state.results = null;
      state.currentPage = "1";
      state.currentQuery = defaultQuery;
    },
  },
});

export const { setMangaSearchLoading, setMangaSearchResults, setMangaSearchPagination, setMangaSearchCurrentPage, setMangaSearchCurrentQuery, setMangaSearchStarted, resetMangaSearch } =
  slice.actions;
export default slice.reducer;
