import { COLORS } from "@/constants/colors";
import { CastMember } from "@/types/TMBDTypes";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  cast: CastMember;
}

const CastCard = ({ cast }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          cast.profilePath
            ? { uri: cast.profilePath }
            : require("@/assets/icons/person.png")
        }
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <Text style={styles.name} numberOfLines={1}>
        {cast.name}
      </Text>
      <Text style={styles.character} numberOfLines={1}>
        {cast.character}
      </Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    width: 80,
    marginRight: 12,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.DARK[100],
  },
  name: {
    color: COLORS.LIGHT[100],
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  character: {
    color: COLORS.LIGHT[300],
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
});
