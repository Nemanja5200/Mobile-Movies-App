import { tmdbService } from "@/api/service/tmdbService";
import MovieSection from "@/components/MovieSection";
import SearchBar from "@/components/SearchBar";
import TrendingSection from "@/components/TrendingSection";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    isLoading: isTrendingLoading,
    refetch: refetchTrending,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => tmdbService.getTrendingMovies("week"),
  });

  const {
    data: nowPlayingMovies,
    isLoading: isNowPlayingLoading,
    refetch: refetchNowPlaying,
  } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => tmdbService.getNowPlayingMovies(),
  });

  const {
    data: upcomingMovies,
    isLoading: isUpcomingLoading,
    refetch: refetchUpcoming,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => tmdbService.getUpcomingMovies(),
  });

  const {
    data: popularSeries,
    isLoading: isSeriesLoading,
    refetch: refetchSeries,
  } = useQuery({
    queryKey: ["popularSeries"],
    queryFn: () => tmdbService.getPopularSeries(),
  });

  const isRefreshing =
    isTrendingLoading ||
    isNowPlayingLoading ||
    isUpcomingLoading ||
    isSeriesLoading;

  const handleRefresh = () => {
    refetchTrending();
    refetchNowPlaying();
    refetchUpcoming();
    refetchSeries();
  };

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.backdrop} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.LIGHT[100]}
          />
        }
      >
        <Image source={icons.logo} style={styles.logo} />

        <View style={styles.searchBarContainer}>
          <SearchBar
            onPress={() => {
              router.push("/Search");
            }}
            placeholder="Search for movie"
          />
        </View>

        <TrendingSection
          data={trendingMovies?.results}
          isLoading={isTrendingLoading}
        />

        <MovieSection
          title="Now Playing"
          data={nowPlayingMovies?.results}
          isLoading={isNowPlayingLoading}
          type="movie"
        />

        <MovieSection
          title="Upcoming Movies"
          data={upcomingMovies?.results}
          isLoading={isUpcomingLoading}
          type="movie"
        />

        <MovieSection
          title="Popular Series"
          data={popularSeries?.results}
          isLoading={isSeriesLoading}
          type="tv"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  backdrop: {
    width: "100%",
    zIndex: 0,
    position: "absolute",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 5,
    paddingBottom: 100,
  },
  logo: {
    width: 48,
    height: 48,
    marginTop: 50,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  searchBarContainer: {
    marginTop: 20,
  },
});
