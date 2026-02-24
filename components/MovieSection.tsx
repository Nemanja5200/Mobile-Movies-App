import { COLORS } from "@/constants/colors";
import { Movie, TVShow } from "@/types/TMBDTypes";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MovieCard from "./MovieCard";

interface Props {
  title: string;
  data: Movie[] | TVShow[] | undefined;
  isLoading?: boolean;
  type?: "movie" | "tv";
}

const MovieSection = ({ title, data, isLoading = false, type = "movie" }: Props) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.LIGHT[100]} />
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            poster={item.poster}
            title={item.title}
            type={type}
          />
        )}
      />
    </View>
  );
};

export default MovieSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    color: COLORS.LIGHT[100],
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  loadingContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});
