export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ParsedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface RawTVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  origin_country: string[];
}

export interface RawDetails {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface RawSeriesDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }>;
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  next_episode_to_air: number | null;
  networks: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface SeriesDetails {
  heroPoster: string;
  title: string;
  overview: string;
  genre: string;
  country: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  firstAirDate: string;
  lastAirDate: string;
  rating: number;
  poster: string;
  status: string;
  tagline: string;
  inProduction: boolean;
}

export interface Movie {
  id: number;
  poster: string | null;
  title: string;
}

export interface Details {
  heroPoster: string;
  title: string;
  overview: string;
  genre: string;
  country: string;
  duration: number;
  release_date: string;
  rating: number;
  poster: string;
}

export interface TVShow {
  id: number;
  poster: string | null;
  title: string;
}

export interface RawCastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface RawCrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface RawCredits {
  id: number;
  cast: RawCastMember[];
  crew: RawCrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Credits {
  cast: CastMember[];
  director?: string;
  crew: CrewMember[];
}

export type RawMovieResponse = TMDBPaginatedResponse<RawMovie>;
export type RawTVResponse = TMDBPaginatedResponse<RawTVShow>;
export type RawDetailsResponse = RawDetails;
export type RawSeriesDetailsResponse = RawSeriesDetails;
export type RawCreditsResponse = RawCredits;

export type MoviesResponse = ParsedResponse<Movie>;
export type TVShowsResponse = ParsedResponse<TVShow>;
export type DetailsResponse = Details;
export type SeriesDetailsResponse = SeriesDetails;
export type CreditsResponse = Credits;

export type RawMediaResponse =
  | RawMovieResponse
  | RawTVResponse
  | RawDetailsResponse
  | RawSeriesDetailsResponse
  | RawCreditsResponse;

export type ParsedMediaResponse =
  | MoviesResponse
  | TVShowsResponse
  | DetailsResponse
  | SeriesDetailsResponse
  | CreditsResponse;
