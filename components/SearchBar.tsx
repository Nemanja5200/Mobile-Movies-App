import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View style={styles.searchBarContainer}>
      <Image source={icons.search} style={styles.searchIcon} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#a8b5db"
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.DARK[200],
    borderRadius: 9999,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    paddingBottom: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#ab8bff",
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
    color: "white",
  },
});
