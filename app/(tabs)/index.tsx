import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.textContainer}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    color: COLORS.DARK[200],
    fontSize: 24,
    fontWeight: "bold",
  },
});
