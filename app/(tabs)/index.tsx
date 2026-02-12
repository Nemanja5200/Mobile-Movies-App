import { tmdbService } from "@/api/service/tmdbService";
import SearchBar from "@/components/SearchBar";
import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { MoviesResponse } from "@/types/TMBDTypes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.backdrop} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
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
  textContainer: {
    color: COLORS.DARK[200],
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 0,
    paddingLeft: 5,
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
    flex: 1,
    marginTop: 35,
  },
});
