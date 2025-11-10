import searchSlice from "./slice/searchSlice";
import quickSearchSlice from "./slice/quickSearchSlice";
import animeDetailsSlice from "./slice/animeDetailsSlice";

export const rootReducer = {
  search: searchSlice,
  quickSearch: quickSearchSlice,
  animeDetails: animeDetailsSlice,
};
