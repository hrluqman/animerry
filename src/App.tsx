import Navbar from "./components/composite/Navbar";
import HomeAnimeGrid from "./components/composite/HomeAnimeGrid";
import AnimerryFooter from "./components/composite/AnimerryFooter";
import { SEASON_ANIME_URL, TOP_ANIME_URL, UPCOMING_ANIME_URL } from "./api/constants";

function App() {

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
      <Navbar />

      <div className="container w-full max-w-7xl mx-auto">
        <HomeAnimeGrid title="Most Popular This Season" anime_url={SEASON_ANIME_URL} />
        <HomeAnimeGrid title="Top Recommendations" anime_url={TOP_ANIME_URL} />
        <HomeAnimeGrid title="Upcoming Next Season" anime_url={UPCOMING_ANIME_URL} /> 
      </div>

      <AnimerryFooter />
    </main>
  );
}

export default App;