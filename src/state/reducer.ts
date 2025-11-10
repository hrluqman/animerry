import searchSlice from "./slice/searchSlice";
import quickSearchSlice from "./slice/quickSearchSlice";
import animeDetailsSlice from "./slice/animeDetailsSlice";
import mangaSearchSlice from "./slice/mangaSearchSlice";

export const rootReducer = {
  search: searchSlice,
  quickSearch: quickSearchSlice,
  animeDetails: animeDetailsSlice,
  mangaSearch: mangaSearchSlice,
};
