import { COLORS } from "@/constants/colors";
import { Movie } from "@/types/TMBDTypes";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TrendingCard from "./TrendingCard";

interface Props {
  data: Movie[] | undefined;
  isLoading?: boolean;
}

const TrendingSection = ({ data, isLoading = false }: Props) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Trending Movies</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.LIGHT[100]} />
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Movies</Text>
      <FlatList
        data={data.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TrendingCard movie={item} index={index} />
        )}
      />
    </View>
  );
};

export default TrendingSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    color: COLORS.LIGHT[100],
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 5,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  loadingContainer: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
});
