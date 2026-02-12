import { RawMediaResponse } from "@/types/TMBDTypes.ts";
import {
  isCreditsResponse,
  isMovieDetailsResponse,
  isMovieResponse,
  isSeriesDetailsResponse,
  isTVResponse,
} from "@/types/typeGuards.ts";

export const getResponseType = (rawResponse: RawMediaResponse): string => {
  if (isMovieDetailsResponse(rawResponse)) return TMBD_RESPONCE_TYPE.MDETAILS;
  if (isSeriesDetailsResponse(rawResponse)) return TMBD_RESPONCE_TYPE.SDETAISL;
  if (isMovieResponse(rawResponse)) return TMBD_RESPONCE_TYPE.MOVIE;
  if (isTVResponse(rawResponse)) return TMBD_RESPONCE_TYPE.TVSHOW;
  if (isCreditsResponse(rawResponse)) return TMBD_RESPONCE_TYPE.CREDITS;
  return "unknown";
};

export const TMBD_RESPONCE_TYPE = {
  MDETAILS: "MDetails",
  SDETAISL: "SDetails",
  MOVIE: "Movie",
  TVSHOW: "TvShow",
  CREDITS: "Credits",
};
