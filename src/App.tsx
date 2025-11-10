import Navbar from "./components/composite/Navbar";
import HomeAnimeGrid from "./components/composite/HomeAnimeGrid";
import AnimerryFooter from "./components/composite/AnimerryFooter";
import { SEASON_ANIME_URL, TOP_ANIME_URL, UPCOMING_ANIME_URL } from "./api/constants";

function App() {

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
      <Navbar />

      <section className="container w-full max-w-7xl mx-auto">
        <div className="flex justify-start items-center">
        <img src="/icon.png" className="w-[5rem] -translate-x-2" alt="Animerry logo" />
        <h1 className="fredericka-the-great-regular text-theme text-4xl lg:text-6xl font-bold">Animerry</h1>
        </div>
        <p className="text-light mt-4">Dive into Animerry—your home for discovering, tracking, and celebrating anime you love. Explore fresh releases, timeless favorites, and hidden gems with clean, fast search and beautiful visuals. Build watchlists, filter by genre, rating, or status, and jump into rich detail pages with trailers, cast, and summaries. Stay organized with status tags and episode progress, and never miss what’s trending. Whether you’re a newcomer or a dedicated otaku, Animerry turns browsing into an adventure and makes choosing your next watch delightfully simple.</p>
      </section>

      <section className="container w-full max-w-7xl mx-auto">
        <HomeAnimeGrid title="Most Popular This Season" anime_url={SEASON_ANIME_URL} />
        <HomeAnimeGrid title="Top Recommendations" anime_url={TOP_ANIME_URL} />
        <HomeAnimeGrid title="Upcoming Next Season" anime_url={UPCOMING_ANIME_URL} /> 
      </section>

      <AnimerryFooter />
    </main>
  );
}

export default App;