import { COLORS } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search for movies...",
  autoFocus = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={icons.search} style={styles.searchIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.LIGHT[300]}
        style={styles.input}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && onClear && (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <View style={styles.clearIcon}>
            <View style={styles.clearLine1} />
            <View style={styles.clearLine2} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.DARK[200],
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.DARK[100],
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.LIGHT[100],
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  clearLine1: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: COLORS.LIGHT[300],
    transform: [{ rotate: "45deg" }],
  },
  clearLine2: {
    position: "absolute",
    width: 14,
    height: 2,
    backgroundColor: COLORS.LIGHT[300],
    transform: [{ rotate: "-45deg" }],
  },
});
