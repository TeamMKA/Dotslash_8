import { StatusBar } from "expo-status-bar"; 
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";

import { icons } from "../../constants";
// import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: color, fontWeight: focused ? "600" : "400" }]}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Map"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="heatmap"
          options={{
            title: "HeatMap",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="HeatMap"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "CreateIncident",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Incidents"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    width: 60,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 10,
  },
  tabBar: {
    backgroundColor: "#161622",
    borderTopWidth: 1,
    borderTopColor: "#232533",
    height: 90,
  },
});

export default TabLayout;