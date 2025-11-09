import AnimerryFooter from "../components/composite/AnimerryFooter";
import CheckboxDropdown from "../components/composite/CheckboxDropdown";
import Navbar from "../components/composite/Navbar";
import SearchResultsGrid from "../components/composite/SearchResultsGrid";
import SearchBar from "../components/composite/Searchbar";
import { Button } from "../components/ui/button";

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

const SearchPage = () => {
  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden">

      <Navbar />

      <div className="container w-full max-w-5xl mx-auto">
        <div className="flex justify-evenly items-end gap-4">
          <SearchBar />
          <CheckboxDropdown title="Genres" data={genreSelection} />
          <CheckboxDropdown title="Type" data={typeSelection} />
          <CheckboxDropdown title="Status" data={statusSelection} />
          <Button className="btn-theme text-primary-foreground hover:bg-primary/90 h-[3rem] cursor-pointer px-8">
            Search
          </Button>
        </div>
        <SearchResultsGrid />
      </div>

      <AnimerryFooter />
    </main>
  );
};

export default SearchPage;
