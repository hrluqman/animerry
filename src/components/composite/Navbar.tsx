import { cn } from "../../lib/utils";
import { fetchJikanApi } from "../../api/http";
import { SEARCH_URL } from "../../api/constants";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  resetQuickSearch,
  setQuickSearchLoading,
  setQuickSearchPagination,
  setQuickSearchResults,
} from "../../state/slice/quickSearchSlice";
import { selectQuickSearchResults } from "../../state/selector/quickSearchSelector";
import { Card } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import SearchBar from "./Searchbar";

const SCROLL_THRESHOLD_PX = 24;

const Navbar = ({ className }: React.ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounced = useDebounce(searchQuery, 250);
  const quickSearchResults = useAppSelector(selectQuickSearchResults);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY || window.pageYOffset);
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;
          if (y <= SCROLL_THRESHOLD_PX) setVisible(true);
          else setVisible(y < lastY);
          lastYRef.current = y;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    lastYRef.current = Math.max(0, window.scrollY || window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fetchSearchAnime = async (searchParams: Record<string, any>) => {
    try {
      dispatch(setQuickSearchLoading(true));
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        SEARCH_URL,
        searchParams,
        { signal: ac.signal }
      );
      dispatch(setQuickSearchResults(response?.data));
      dispatch(setQuickSearchPagination(response?.pagination));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setQuickSearchLoading(false));
    }
  };

  useEffect(() => {
    const searchParams = { q: debounced.trim(), limit: 10, page: 1 };
    if (debounced.trim() !== "") fetchSearchAnime(searchParams);
    else dispatch(resetQuickSearch());
  }, [debounced, dispatch]);

  return (
    <nav
      className={cn(
        [
          "bg-theme-secondary-dark fixed top-0 left-0 w-full z-[999]",
          "transition-transform duration-500 ease-in-out",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" "),
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 md:px-8 lg:px-24">
        {/* Left: Logo + Brand + Search */}
        <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial md:w-2/3 mr-1 md:mr-0">
          <a href="/" className="shrink-0">
            <img src="/icon.png" className="w-10 md:w-16" alt="Animerry logo" />
          </a>
          <p className="hidden md:block fredericka-the-great-regular text-theme text-lg md:text-xl font-bold shrink-0">
            Animerry
          </p>

          {/* Search (full width on mobile) */}
          <div className="relative ml-2 flex-1 min-w-0 md:min-w-[20rem] w-full">
            <SearchBar
              hideTitle
              className="input-theme-nav pl-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e)}
            />
            {/* Quick results dropdown */}
            {quickSearchResults?.length > 0 && (
              <Card className="bg-theme-secondary-dark absolute left-0 right-0 top-[calc(100%+0.25rem)] max-h-[50svh] flex flex-col border-0 rounded-none hover:shadow-md gap-2 overflow-x-hidden overflow-y-auto z-50 p-4">
                {quickSearchResults?.map((item: any, index: number) => (
                  <a
                    key={`${item.mal_id}-${index}`}
                    href={`/anime/${item.mal_id}`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.images?.webp?.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-10 aspect-[2/3] object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-light text-sm font-semibold truncate">
                          {item.title}
                        </p>
                        <p className="text-light text-xs opacity-70">
                          {item.type}
                        </p>
                        <p className="text-light text-xs mt-1 line-clamp-1">
                          {item.genres?.map((g: any) => g.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    {index !== quickSearchResults?.length - 1 && (
                      <Separator className="h-[3px] border-b-[0.5px] border-white/10 pt-2" />
                    )}
                  </a>
                ))}
              </Card>
            )}
            {quickSearchResults?.length === 0 && debounced && (
              <Card className="bg-theme-secondary-dark absolute left-0 right-0 top-[calc(100%+0.25rem)] border-0 rounded-none hover:shadow-md z-50 p-4">
                <p className="text-light text-sm">No results found.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Right: Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <a className="text-light text-sm" href="/search">
            Anime
          </a>
          <a className="text-light text-sm" href="/manga">
            Manga
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded px-3 py-2 text-light text-xl"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>☰
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex justify-center items-center px-4 pb-3 pt-2 flex gap-4">
          <a
            className="text-light text-sm"
            href="/search"
            onClick={() => setMenuOpen(false)}
          >
            Anime
          </a>
          <a
            className="text-light text-sm"
            href="/manga"
            onClick={() => setMenuOpen(false)}
          >
            Manga
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
