import { tmdbService } from "@/api/service/tmdbService";
import CastCard from "@/components/CastCard";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image as RNImage,
} from "react-native";

const { width, height } = Dimensions.get("window");
const HERO_HEIGHT = height * 0.45;

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const movieId = parseInt(id || "0", 10);

  const {
    data: movie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => tmdbService.getMovieDetails(movieId),
    enabled: movieId > 0,
  });

  const {
    data: credits,
    isLoading: isCreditsLoading,
  } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => tmdbService.getMovieCredits(movieId),
    enabled: movieId > 0,
  });

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatRating = (rating: number): string => {
    return rating.toFixed(1);
  };

  if (isMovieLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.LIGHT[100]} />
      </View>
    );
  }

  if (movieError || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load movie details</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Backdrop */}
        <View style={styles.heroContainer}>
          <Image
            source={
              movie.heroPoster
                ? { uri: movie.heroPoster }
                : require("@/assets/images/bg.png")
            }
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={["transparent", COLORS.PRIMARY]}
            style={styles.heroOverlay}
          />
        </View>

        {/* Back Button */}
        <Pressable style={styles.backButtonHeader} onPress={() => router.back()}>
          <RNImage source={icons.arrow} style={styles.backIcon} />
        </Pressable>

        {/* Content */}
        <View style={styles.content}>
          {/* Poster and Info */}
          <View style={styles.posterInfoContainer}>
            <Image
              source={
                movie.poster
                  ? { uri: movie.poster }
                  : require("@/assets/images/highlight.png")
              }
              style={styles.poster}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              
              <View style={styles.metaRow}>
                <View style={styles.ratingContainer}>
                  <RNImage source={icons.star} style={styles.starIcon} />
                  <Text style={styles.rating}>{formatRating(movie.rating)}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailText}>{movie.release_date?.split("-")[0]}</Text>
                <Text style={styles.detailDot}>•</Text>
                <Text style={styles.detailText}>{formatDuration(movie.duration)}</Text>
              </View>

              <View style={styles.genreContainer}>
                <Text style={styles.genre}>{movie.genre}</Text>
              </View>

              {credits?.director && (
                <Text style={styles.director}>Director: {credits.director}</Text>
              )}
            </View>
          </View>

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>

          {/* Cast */}
          {credits?.cast && credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast</Text>
              <FlatList
                data={credits.cast}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <CastCard cast={item} />}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: COLORS.LIGHT[200],
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: COLORS.DARK[100],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.LIGHT[100],
    fontSize: 14,
  },
  heroContainer: {
    width: width,
    height: HERO_HEIGHT,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.6,
  },
  backButtonHeader: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
    transform: [{ rotate: "180deg" }],
  },
  content: {
    marginTop: -80,
    paddingHorizontal: 16,
  },
  posterInfoContainer: {
    flexDirection: "row",
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: COLORS.DARK[100],
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFD700",
    marginRight: 4,
  },
  rating: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    color: COLORS.LIGHT[300],
    fontSize: 13,
  },
  detailDot: {
    color: COLORS.LIGHT[300],
    marginHorizontal: 8,
  },
  genreContainer: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.DARK[100],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  genre: {
    color: COLORS.LIGHT[100],
    fontSize: 12,
  },
  director: {
    color: COLORS.LIGHT[300],
    fontSize: 12,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: COLORS.LIGHT[100],
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  overview: {
    color: COLORS.LIGHT[200],
    fontSize: 14,
    lineHeight: 22,
  },
});
