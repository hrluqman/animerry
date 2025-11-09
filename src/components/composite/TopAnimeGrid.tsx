import { useEffect, useState } from "react";
import { fetchJikanApi } from "../../api/http";
import { TOP_ANIME_URL } from "../../api/constants";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const TopAnimeGrid = () => {
  const [topAnime, setTopAnime] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(false);

  const fetchTopAnime = async () => {
    setLoading(true);
    const ac = new AbortController();
    const response: Record<string, any> = await fetchJikanApi(
      TOP_ANIME_URL,
      {},
      { signal: ac.signal }
    );
    setTopAnime(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopAnime();
  }, []);

  return (
    <>
      <h2 className="text-light font-semibold mt-8 mb-4">
        Top Recommendations
      </h2>
      <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card
              key={i}
              className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse"
            />
          ))
        ) : (
          <>
            {topAnime?.length > 0 &&
              topAnime?.map((item: any) => (
                <a key={item.mal_id} href={item.url} target="_blank">
                  <Card className="bg-transparent h-full flex flex-col justify-between border-0 hover:shadow-md gap-2 pt-0">
                    {/* Fixed aspect-ratio image wrapper */}
                    <div className="relative w-full aspect-[2/3] overflow-hidden rounded">
                      <img
                        src={item.images?.jpg?.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <p className="absolute text-light bg-theme text-xs p-2 top-0 right-0 rounded-bl-sm">
                        {item.type}
                      </p>
                    </div>

                    <p className="text-light text-sm font-semibold truncate">
                      {item.title}
                    </p>
                  </Card>
                </a>
              ))}
          </>
        )}
      </div>
      {topAnime?.length > 0 && (
        <div className="flex justify-center items-center gap-2">
          <Button className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8">
            Previous
          </Button>
          <Button className="btn-theme text-primary-foreground hover:bg-primary/90 w-[8rem] cursor-pointer px-8">
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default TopAnimeGrid;
