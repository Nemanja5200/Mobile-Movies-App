import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
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
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  id: number;
  poster: string | null;
  title: string;
  rating?: number;
  year?: string;
}

const MovieGridCard = ({ id, poster, title, rating, year }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image
        source={
          poster
            ? { uri: poster }
            : require("@/assets/images/highlight.png")
        }
        style={styles.poster}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          {rating !== undefined && rating > 0 && (
            <View style={styles.ratingContainer}>
              <RNImage source={icons.star} style={styles.starIcon} />
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          )}
          {year && <Text style={styles.year}>{year}</Text>}
        </View>
      </View>
    </Pressable>
  );
};

export default MovieGridCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  poster: {
    width: "100%",
    height: CARD_WIDTH * 1.5,
    borderRadius: 12,
    backgroundColor: COLORS.DARK[100],
  },
  infoContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  title: {
    color: COLORS.LIGHT[100],
    fontSize: 13,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 12,
    height: 12,
    tintColor: "#FFD700",
    marginRight: 3,
  },
  rating: {
    color: "#FFD700",
    fontSize: 11,
  },
  year: {
    color: COLORS.LIGHT[300],
    fontSize: 11,
  },
});
