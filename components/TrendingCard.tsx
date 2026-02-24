import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Movie } from "@/types/TMBDTypes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image as RNImage,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

interface Props {
  movie: Movie;
  index: number;
}

const TrendingCard = ({ movie, index }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{index + 1}</Text>
      </View>
      <Image
        source={
          movie.poster
            ? { uri: movie.poster }
            : require("@/assets/images/highlight.png")
        }
        style={styles.poster}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.4,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  rankContainer: {
    position: "absolute",
    bottom: 40,
    left: -10,
    zIndex: 10,
  },
  rank: {
    fontSize: 100,
    fontWeight: "900",
    color: COLORS.LIGHT[100],
    textShadowColor: COLORS.PRIMARY,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    opacity: 0.9,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 40,
    backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
