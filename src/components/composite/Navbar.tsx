import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import SearchBar from "./Searchbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchJikanApi } from "../../api/http";
import { SEARCH_URL } from "../../api/constants";
import { useDebounce } from "../../hooks/useDebounce";
import {
  resetQuickSearch,
  setQuickSearchLoading,
  setQuickSearchPagination,
  setQuickSearchResults,
} from "../../app/slice/quickSearchSlice";
import { Card } from "../ui/card";
import { selectQuickSearchResults } from "../../app/selector/quickSearchSelector";
import { Separator } from "@radix-ui/react-dropdown-menu";

const SCROLL_THRESHOLD_PX = 24;

const Navbar = ({ className }: React.ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounced = useDebounce(searchQuery, 250); // waits 250ms after typing stops
  const quickSearchResults = useAppSelector(selectQuickSearchResults);

  useEffect(() => {
    // guard for SSR
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY || window.pageYOffset);

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;

          // Always show while within the threshold from the top
          if (y <= SCROLL_THRESHOLD_PX) {
            setVisible(true);
          } else {
            // Hide on scroll down, show on scroll up
            if (y > lastY) {
              setVisible(false);
            } else if (y < lastY) {
              setVisible(true);
            }
          }

          lastYRef.current = y;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    // initialize
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
      console.error();
    } finally {
      dispatch(setQuickSearchLoading(false));
    }
  };

  useEffect(() => {
    const searchParams = {
      q: debounced.trim(),
      limit: 10,
      page: 1,
    };
    if (debounced.trim() !== "") fetchSearchAnime(searchParams);
    if (debounced.trim() === "") dispatch(resetQuickSearch());
  }, [debounced, dispatch]);

  return (
    <nav
      className={cn(
        [
          "bg-theme-secondary-dark fixed top-0 left-0 w-full flex justify-between items-center z-[999] px-24 pt-2.5 pb-2",
          "transition-transform duration-500 ease-in-out",
          visible ? "translate-y-0" : "-translate-y-full",
        ].join(" "),
        className
      )}
    >
      <div className="flex justify-center items-center">
        <a href="/">
          <img src="/icon.png" className="w-[5rem]" alt="Animerry logo" />
        </a>
        <p className="fredericka-the-great-regular text-theme text-xl font-bold">Animerry</p>
        <div className="relative min-w-[20rem] w-full mx-4">
          <SearchBar
            hideTitle={true}
            className="input-theme-nav pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e)}
          />
          {quickSearchResults?.length > 0 && (
            <Card className="bg-theme-secondary-dark absolute w-full max-h-[50svh] flex flex-col justify-between border-0 rounded-none hover:shadow-md gap-2 overflow-x-hidden overflow-y-auto z-50 p-4">
              {quickSearchResults?.map((item: any, index: number) => (
                <a
                  key={`${item.mal_id}-${index}`}
                  href={`/anime/${item.mal_id}`}
                >
                  <div className="flex justify-start items-center">
                    <img
                      src={item.images?.webp?.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="inset-0 w-[2.5rem] aspect-[2/3] object-cover transition-all duration-300 ease-in-out mr-2"
                    />
                    <div className="flex flex-col justify-between items-start">
                      <p className="text-light text-sm font-semibold truncate w-full max-w-[12rem]">
                        {item.title}
                      </p>
                      <p className="text-light text-xs opacity-70">
                        {item.type}
                      </p>
                      <p className="text-light text-xs text-wrap mt-1">
                        {item.genres?.length > 0 &&
                          item.genres?.map((genre: any, index: number) => (
                            <span key={index} className="opacity-70">
                              {genre.name}
                              {index !== item.genres?.length - 1 && ", "}
                            </span>
                          ))}
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
          {quickSearchResults?.length == 0 && (
            <Card className="bg-theme-secondary-dark absolute w-full flex flex-col justify-between border-0 rounded-none hover:shadow-md gap-2 overflow-hidden z-50 p-4">
              <p className="text-light text-sm">No results found.</p>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-evenly items-center gap-4">
        <a className="text-light text-sm" href="/search">
          Anime
        </a>
        <a className="text-light text-sm" href="/manga">
          Manga
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
