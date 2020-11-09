import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import BookingsScreen from "../screens/BookingsScreen";
import BookingScreen from "../screens/BookingScreen";
import MessagesScreen from "../screens/MessagesScreen";
import routes from "./routes";
import colors from "../config/colors";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={() => ({
        title: "Your account",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
    />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name={routes.BOOKINGS_SCREEN}
      component={BookingsScreen}
      options={() => ({
        title: "Bookings",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
    />
    <Stack.Screen
      name={routes.BOOKING_SCREEN}
      component={BookingScreen}
      options={() => ({
        title: "Booking confirmation",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
    />
  </Stack.Navigator>
);
