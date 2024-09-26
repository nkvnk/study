import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Main/Home";
import Keep from "../Main/Keep";
import Setting from "../Main/Setting";
import { Ionicons } from "@expo/vector-icons"; // アイコンのためにインポート

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Keep") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#0d47a1", // Change this to your desired background color
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Keep"
        component={Keep}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
