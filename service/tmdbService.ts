import { api } from "@/api/api.ts";
import { ParseTMDBResponse } from "@/utils/Parser.ts";
import { TMBD_ROUTE } from "@/constants/constants/TMBD";
import {
  CreditsResponse,
  DetailsResponse,
  MoviesResponse,
  RawCredits,
  RawDetailsResponse,
  RawMovieResponse,
  RawSeriesDetails,
  RawTVResponse,
  TVShowsResponse,
} from "@/types/TMBDTypes.ts";

export const tmdbService = {
  getNowPlayingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<RawMovieResponse>(
      TMBD_ROUTE.NOW_PLAYING_MOVIES,
      {
        params: { page },
      },
    );
    return ParseTMDBResponse(response.data) as MoviesResponse;
  },

  getTrendingMovies: async (
    timeWindow: string = "week",
  ): Promise<MoviesResponse> => {
    const url = `${TMBD_ROUTE.TRENDING_MOVIES}${timeWindow}`;
    const response = await api.get<RawMovieResponse>(url);
    return ParseTMDBResponse(response.data) as MoviesResponse;
  },

  getPopularSeries: async (page: number = 1): Promise<TVShowsResponse> => {
    const response = await api.get<RawTVResponse>(TMBD_ROUTE.POPULAR_SHOWS, {
      params: { page },
    });
    return ParseTMDBResponse(response.data) as TVShowsResponse;
  },
  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<RawMovieResponse>(
      TMBD_ROUTE.UPCOMING_MOVIES,
      {
        params: { page },
      },
    );
    return ParseTMDBResponse(response.data) as MoviesResponse;
  },

  getMovieDetails: async (id: number): Promise<DetailsResponse> => {
    const response = await api.get<RawDetailsResponse>(
      TMBD_ROUTE.MDETAILS + id.toString(),
    );
    return ParseTMDBResponse(response.data) as DetailsResponse;
  },

  getSeriesDetails: async (id: number): Promise<DetailsResponse> => {
    const response = await api.get<RawSeriesDetails>(
      TMBD_ROUTE.SDETAILS + id.toString(),
    );
    return ParseTMDBResponse(response.data) as DetailsResponse;
  },

  getMovieCredits: async (id: number): Promise<CreditsResponse> => {
    const response = await api.get<RawCredits>(
      TMBD_ROUTE.MOViE_CREDITS.replace("{id}", id.toString()),
    );
    return ParseTMDBResponse(response.data) as CreditsResponse;
  },

  getSeriesCredits: async (id: number): Promise<CreditsResponse> => {
    const response = await api.get<RawCredits>(
      TMBD_ROUTE.SERIES_CREDITS.replace("{id}", id.toString()),
    );
    return ParseTMDBResponse(response.data) as CreditsResponse;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<RawMovieResponse>(TMBD_ROUTE.SEARCH_MOVIES, {
      params: { query, page },
    });
    return ParseTMDBResponse(response.data) as MoviesResponse;
  },
};
