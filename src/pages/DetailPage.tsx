import { useEffect, useState } from "react";
import { fetchJikanApi } from "../api/http";
import { useParams } from "react-router-dom";
import { ANIME_RECOMMEND_URL, DETAIL_URL } from "../api/constants";
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
import type { JikanRecommendation } from "../lib/jikanTyping";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [animeRecommendations, setAnimeRecommendations] = useState<JikanRecommendation[]>([]);
  const animeDetails = useAppSelector(selectAnimeDetails);
  const animeDetailsLoading = useAppSelector(selectAnimeDetailsLoading);

  const fetchAnimeInformation = async (id: string, anime_url: string, type?: string) => {
    dispatch(setDetailsLoading(true));

    try {
      const ac = new AbortController();
      const response: Record<string, any> = await fetchJikanApi(
        anime_url,
        { id: id },
        { signal: ac.signal }
      );
      type == 'recommendations' ? setAnimeRecommendations(response.data.slice(0, 6)) : dispatch(setAnimeDetails(response));
    } catch (error) {
      console.error();
    } finally {
      dispatch(setDetailsLoading(false));
    }
  };

  useEffect(() => {
    if (id) {
      fetchAnimeInformation(id, DETAIL_URL);
      fetchAnimeInformation(id, ANIME_RECOMMEND_URL, 'recommendations');
    }
  }, [id]);

  if (animeDetailsLoading)
    return (
      <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4">
        <p className="text-center text-light">Loading...</p>
      </main>
    );

  if (!animeDetailsLoading && animeDetails)
    return <AnimeDetailPage data={animeDetails?.data} animeRecommendations={animeRecommendations}  />;

  return (
    <main className="bg-theme-dark min-h-screen w-full pt-[8rem] overflow-x-hidden p-4"></main>
  );
};

export default DetailPage;
