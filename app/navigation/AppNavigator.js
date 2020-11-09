import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import HotelsScreen from "../screens/HotelsScreen";
import HomeScreenNavigator from "./HomeScreenNavigator";
import useNotifications from "../hooks/useNotifications";
import ConferenceScreen from "../screens/ConferenceScreen";
import ApartmentsScreen from "../screens/ApartmentsScreen";

const Tab = createBottomTabNavigator();
export default AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hotel" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Conferences"
        component={ConferenceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="projector"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Apartments"
        component={ApartmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-city-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
