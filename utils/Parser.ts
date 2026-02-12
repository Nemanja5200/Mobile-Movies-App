import {
  CastMember,
  Credits,
  CrewMember,
  Details,
  Movie,
  MoviesResponse,
  ParsedMediaResponse,
  RawCastMember,
  RawCreditsResponse,
  RawCrewMember,
  RawDetails,
  RawDetailsResponse,
  RawMediaResponse,
  RawMovie,
  RawMovieResponse,
  RawSeriesDetails,
  RawSeriesDetailsResponse,
  RawTVResponse,
  RawTVShow,
  TVShow,
  TVShowsResponse,
} from "@/types/TMBDTypes";
import { getResponseType, TMBD_RESPONCE_TYPE } from "@/utils/utils";

export const ParseTMDBResponse = <
  T extends RawMediaResponse | RawDetailsResponse,
>(
  rawResponse: T,
): ParsedMediaResponse | Details => {
  switch (getResponseType(rawResponse)) {
    case TMBD_RESPONCE_TYPE.MDETAILS:
      return ParseMovieDetails(rawResponse as RawDetailsResponse);

    case TMBD_RESPONCE_TYPE.SDETAISL:
      return ParseSeriesDetails(rawResponse as RawSeriesDetailsResponse);

    case TMBD_RESPONCE_TYPE.MOVIE:
      return {
        page: (rawResponse as RawMovieResponse).page,
        total_pages: (rawResponse as RawMovieResponse).total_pages,
        total_results: (rawResponse as RawMovieResponse).total_results,
        results: (rawResponse as RawMovieResponse).results.map(ParseMovie),
      } as MoviesResponse;

    case TMBD_RESPONCE_TYPE.TVSHOW:
      return {
        page: (rawResponse as RawTVResponse).page,
        total_pages: (rawResponse as RawTVResponse).total_pages,
        total_results: (rawResponse as RawTVResponse).total_results,
        results: (rawResponse as RawTVResponse).results.map(ParseTVShow),
      } as TVShowsResponse;

    case TMBD_RESPONCE_TYPE.CREDITS:
      return ParseCredits(rawResponse as RawCreditsResponse);

    default:
      throw new Error("Unknown response type");
  }
};

const ParseMovie = (rawMovie: RawMovie): Movie => ({
  id: rawMovie.id,
  title: rawMovie.title,
  poster: rawMovie.poster_path,
});

const ParseTVShow = (rawTVShow: RawTVShow): TVShow => ({
  id: rawTVShow.id,
  title: rawTVShow.name,
  poster: rawTVShow.poster_path,
});

const ParseMovieDetails = (rawDetails: RawDetails): Details => ({
  title: rawDetails.title,
  genre: rawDetails.genres[0]?.name || "Unknown",
  country: rawDetails.origin_country[0] || "Unknown",
  duration: rawDetails.runtime,
  heroPoster: rawDetails.backdrop_path || "",
  poster: rawDetails.poster_path || "",
  rating: rawDetails.vote_average,
  overview: rawDetails.overview,
  release_date: rawDetails.release_date,
});

const ParseSeriesDetails = (rawDetails: RawSeriesDetails): Details => ({
  title: rawDetails.name,
  genre: rawDetails.genres[0]?.name || "Unknown",
  country: rawDetails.origin_country[0] || "Unknown",
  duration: rawDetails.number_of_seasons,
  heroPoster: rawDetails.backdrop_path || "",
  poster: rawDetails.poster_path || "",
  rating: rawDetails.vote_average,
  overview: rawDetails.overview,
  release_date: rawDetails.first_air_date,
});

const ParseCastMember = (rawCast: RawCastMember): CastMember => ({
  id: rawCast.id,
  name: rawCast.name,
  character: rawCast.character,
  profilePath: rawCast.profile_path,
});

const ParseCrewMember = (rawCrew: RawCrewMember): CrewMember => ({
  id: rawCrew.id,
  name: rawCrew.name,
  job: rawCrew.job,
  department: rawCrew.department,
});

export const ParseCredits = (rawCredits: RawCreditsResponse): Credits => {
  const cast = rawCredits.cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 10)
    .map(ParseCastMember);

  const crew = rawCredits.crew.map(ParseCrewMember);

  const director =
    rawCredits.crew.find((c) => c.job === "Director")?.name ??
    rawCredits.crew.find((c) => c.known_for_department === "Directing")?.name ??
    rawCredits.crew.find((c) => c.job === "Producer")?.name ??
    rawCredits.crew.find((c) => c.known_for_department === "Production")
      ?.name ??
    "Director info not available";

  return {
    cast,
    director,
    crew,
  };
};
