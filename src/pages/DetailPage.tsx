import { useEffect } from "react";
import { fetchJikanApi } from "../api/http";
import { useParams } from "react-router-dom";
import { DETAIL_URL } from "../api/constants";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  setAnimeDetails,
  setDetailsLoading,
} from "../state/slice/animeDetailsSlice";
import {
  selectAnimeDetails,
  selectAnimeDetailsLoading,
} from "../state/selector/animeDetailsSelector";
import AnimeDetailPage from "../components/composite/AnimeDetails";

const DetailPage = () => {
  const { id } = useParams();
  const dispach = useAppDispatch();
  const animeDetails = useAppSelector(selectAnimeDetails);
  const animeDetailsLoading = useAppSelector(selectAnimeDetailsLoading);

  const fetchAnimeDetails = async (id: string) => {
    dispach(setDetailsLoading(true));

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
      dispach(setDetailsLoading(false));
    }
  };

  useEffect(() => {
    if (id) fetchAnimeDetails(id);
  }, [id]);

  if (animeDetailsLoading)
    return (
      <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
        <p className="text-center text-light">Loading...</p>
      </main>
    );

  if (!animeDetailsLoading && animeDetails)
    return <AnimeDetailPage data={animeDetails?.data} />;

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4"></main>
  );
};

export default DetailPage;
