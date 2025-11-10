import { useEffect, useState } from "react";
import AnimerryFooter from "../components/composite/AnimerryFooter";
import CheckboxDropdown from "../components/composite/CheckboxDropdown";
import Navbar from "../components/composite/Navbar";
import SearchResultsGrid from "../components/composite/SearchResultsGrid";
import SearchBar from "../components/composite/Searchbar";
import { Button } from "../components/ui/button";
import { fetchJikanApi } from "../api/http";
import { SEARCH_URL } from "../api/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetSearch,
  setCurrentQuery,
  setLoading,
  setPagination,
  setResults,
  setSearchStarted,
} from "../app/slice/searchSlice";
import { resetAnimeDetails } from "../app/slice/animeDetailsSlice";

// Enum: "tv" "movie" "ova" "special" "ona" "music" "tv_special"
const typeSelection = [
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
  { value: "tv_special", label: "TV Special" },
];

// Enum: "airing" "complete" "upcoming"
const statusSelection = [
  { value: "airing", label: "Airing" },
  { value: "complete", label: "Complete" },
  { value: "upcoming", label: "Upcoming" },
];

// Enum: "1 - Action" "2 - Adventure" "5 - Avant Garde" "4 - Comedy" "8 - Drama" "10 - Fantasy" "7 - Mystery" "22 - Romance" "36 - Slice of Life"
const genreSelection = [
  { value: "1", label: "Action" },
  { value: "2", label: "Adventure" },
  { value: "5", label: "Avant Garde" },
  { value: "4", label: "Comedy" },
  { value: "8", label: "Drama" },
  { value: "10", label: "Fantasy" },
  { value: "7", label: "Mystery" },
  { value: "22", label: "Romance" },
  { value: "36", label: "Slice of Life" },
];

// Enum: "g" "pg" "pg13" "r17" "r"
const ratingSelection = [
  { value: "g", label: "G - All Ages" },
  { value: "pg", label: "PG - Children" },
  { value: "pg13", label: "PG-13 - Teens 13 or older" },
  { value: "r17", label: "R - 17+ (violence & profanity)" },
  { value: "r", label: "R+ - Mild Nudity" },
];

const SearchPage = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [rating, setRating] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    dispatch(resetSearch());
    dispatch(resetAnimeDetails());
    const next = new URLSearchParams(params);
    next.set("page", "1");
    navigate(
      { pathname: "/search", search: next.toString() },
      { replace: false }
    );
  }, [dispatch]);

  const fetchSearchAnime = async (searchParams: Record<string, any>) => {
    try {
      dispatch(setLoading(true));
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        SEARCH_URL,
        searchParams,
        { signal: ac.signal }
      );
      dispatch(setResults(response?.data));
      dispatch(setPagination(response?.pagination));
      dispatch(setCurrentQuery(searchParams));
      const next = new URLSearchParams(params);
      next.set("page", searchParams.page.toString());
      navigate(
        { pathname: "/search", search: next.toString() },
        { replace: false }
      );
    } catch (error) {
      console.error();
    } finally {
      dispatch(setLoading(false));
    }
  };

  const filterSearch = async () => {
    dispatch(setSearchStarted(true));
    const searchParams = {
      status: status,
      genres: genres,
      type: type,
      rating: rating,
      q: searchQuery,
      limit: 24,
      page: 1,
    };
    fetchSearchAnime(searchParams);
  };

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
      <Navbar />

      <div className="container w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 items-end gap-4">
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e)} />
          <CheckboxDropdown
            title="Genres"
            data={genreSelection}
            value={genres}
            onChange={setGenres}
          />
          <CheckboxDropdown
            title="Type"
            data={typeSelection}
            value={type}
            onChange={setType}
            multiple={false}
          />
          <CheckboxDropdown
            title="Status"
            data={statusSelection}
            value={status}
            onChange={setStatus}
            multiple={false}
          />
          <CheckboxDropdown
            title="Rating"
            data={ratingSelection}
            value={rating}
            onChange={setRating}
            multiple={false}
          />
          <Button
            className="btn-theme text-primary-foreground hover:bg-primary/90 h-[2.5rem] cursor-pointer px-8"
            onClick={filterSearch}
          >
            Search
          </Button>
        </div>
        <SearchResultsGrid fetchSearchAnime={fetchSearchAnime} />
      </div>

      <AnimerryFooter />
    </main>
  );
};

export default SearchPage;
