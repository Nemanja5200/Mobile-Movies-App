import { COLORS } from "@/constants/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  id: number;
  poster: string | null;
  title: string;
  type?: "movie" | "tv";
}

const MovieCard = ({ id, poster, title, type = "movie" }: Props) => {
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
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 12,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: COLORS.DARK[100],
  },
  title: {
    color: COLORS.LIGHT[200],
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});
