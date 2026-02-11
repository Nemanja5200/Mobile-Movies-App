import { Tabs } from "expo-router";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

type TabIconProps = {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
};

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={styles.focusedContainer}
        imageStyle={styles.imageBackground}
      >
        <Image source={icon} tintColor="#151312" style={styles.icon} />
        <Text style={styles.focusedText}>{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.unfocusedContainer}>
      <Image source={icon} tintColor="#A8B5DB" style={styles.icon} />
    </View>
  );
};

const tabs = [
  { name: "index", title: "Home", icon: icons.home },
  { name: "Search", title: "Search", icon: icons.search },
  { name: "Saved", title: "Saved", icon: icons.save },
  { name: "Profile", title: "Profile", icon: icons.person },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} title={tab.title} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  focusedContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    minWidth: 112,
    minHeight: 56,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageBackground: {
    borderRadius: 9999,
  },
  unfocusedContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
  icon: {
    width: 20,
    height: 20,
  },
  focusedText: {
    color: "#151312",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
