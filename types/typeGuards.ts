import {
  RawCreditsResponse,
  RawDetailsResponse,
  RawMediaResponse,
  RawMovieResponse,
  RawSeriesDetailsResponse,
  RawTVResponse,
} from "@/types/TMBDTypes.ts";

export const isMovieResponse = (
  response: RawMediaResponse,
): response is RawMovieResponse => {
  return (
    "results" in response &&
    response.results.length > 0 &&
    "title" in response.results[0]
  );
};

export const isTVResponse = (
  response: RawMediaResponse,
): response is RawTVResponse => {
  return (
    "results" in response &&
    response.results.length > 0 &&
    "name" in response.results[0]
  );
};

export const isMovieDetailsResponse = (
  response: RawMediaResponse,
): response is RawDetailsResponse => {
  return (
    !("results" in response) && "genres" in response && "runtime" in response
  );
};

export const isSeriesDetailsResponse = (
  response: RawMediaResponse,
): response is RawSeriesDetailsResponse => {
  return (
    !("results" in response) &&
    "name" in response &&
    "first_air_date" in response &&
    "number_of_seasons" in response &&
    "number_of_episodes" in response
  );
};

export const isCreditsResponse = (
  response: RawMediaResponse,
): response is RawCreditsResponse => {
  return (
    typeof response === "object" &&
    "id" in response &&
    "cast" in response &&
    "crew" in response &&
    Array.isArray(response.cast) &&
    Array.isArray(response.crew)
  );
};
