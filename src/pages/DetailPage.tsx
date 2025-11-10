import { useEffect } from "react";
import { fetchJikanApi } from "../api/http";
import { useParams } from "react-router-dom";
import { DETAIL_URL } from "../api/constants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAnimeDetails, setDetailsLoading } from "../app/slice/animeDetailsSlice";
import { selectAnimeDetails, selectAnimeDetailsLoading } from "../app/selector/animeDetailsSelector";
import AnimeDetailPage from "../components/composite/AnimeDetails";

const DetailPage = () => {
  const { id } = useParams();
  const dispach = useAppDispatch();
  const animeDetails = useAppSelector(selectAnimeDetails);
  const animeDetailsLoading = useAppSelector(selectAnimeDetailsLoading);

  const fetchAnimeDetails = async (id: string) => {
    setDetailsLoading(true);

    try {
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        DETAIL_URL,
        { id: id },
        { signal: ac.signal }
      );
      dispach(setAnimeDetails(response));
    } catch (error) {
      console.error();
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    if(id) fetchAnimeDetails(id);
  }, [id]);

  if(animeDetailsLoading) return <div>Loading...</div>;

  if(!animeDetailsLoading && animeDetails) return <AnimeDetailPage data={animeDetails?.data} />;

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
    </main>
  )
};

export default DetailPage;
