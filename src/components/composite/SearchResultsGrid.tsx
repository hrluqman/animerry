import { Card } from "../ui/card";
import { Alert } from "../ui/alert";
import TopAnimeGrid from "./TopAnimeGrid";

const SearchResultsGrid = () => {
  const query = "";
  const data: any = [];
  const isFetching = false;
  const isError = false;
  const error = null;

  if (!query)
    return (
      <div className="mb-8">
        <TopAnimeGrid />
      </div>
    );

  if (isError)
    return (
      <Alert className="mt-6">
        {String((error as any)?.status || "Error")} loading results.
      </Alert>
    );

  return (
    <>
      <h2 className="text-light font-semibold mt-8 mb-4">Search results:</h2>
      <div className="grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isFetching ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-transparent h-full border-0 w-full aspect-[2/3] bg-zinc-800 animate-pulse" />
          ))
        ) : data?.data?.length > 0 ? (
          data.data?.map((item: any) => (
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
          ))
        ) : (
          <p className="text-light text-center my-4">No results found. Try another keyword.</p>
        )}
      </div>
    </>
  );
}
 
export default SearchResultsGrid;
