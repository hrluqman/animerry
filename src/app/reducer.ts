import searchSlice from "./slice/searchSlice";
import animeDetailsSlice from "./slice/animeDetailsSlice";

export const rootReducer = {
  search: searchSlice,
  animeDetails: animeDetailsSlice,
};
