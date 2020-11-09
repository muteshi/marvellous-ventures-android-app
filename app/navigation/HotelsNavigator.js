import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigator";
import AppShare from "../components/AppShare";
import BookingDurationScreen from "../screens/BookingDurationScreen";
import BookingFormScreen from "../screens/BookingFormScreen";
import colors from "../config/colors";
import HotelDetailsScreen from "../screens/HotelDetailsScreen";
import HotelDescriptionScreen from "../screens/HotelDescriptionScreen";
import routes from "./routes";
import ImagesScreen from "../screens/ImagesScreen";
import RoomsScreen from "../screens/RoomsScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import ConferenceHotelDetails from "../screens/ConferenceHotelDetails";
import ApartmentDetails from "../screens/ApartmentDetails";
import ConferenceRoomsScreen from "../screens/ConferenceRooms";

const Stack = createStackNavigator();

const HotelsNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ gestureEnabled: true }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.HOTELS}
      component={AppNavigator}
    />

    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.WELCOME_SCREEN}
      component={WelcomeScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.ROOMS}
      component={RoomsScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.CONFERENCE_ROOMS}
      component={ConferenceRoomsScreen}
    />
    <Stack.Screen
      name={routes.IMAGES_SCREEN}
      component={ImagesScreen}
      options={() => ({
        title: "Photos",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
    />
    <Stack.Screen
      name={routes.BOOKING_CONFIRMATION}
      component={ConfirmationScreen}
      options={({ navigation }) => ({
        title: "Your booking details",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerLeft: () => (
          <MaterialCommunityIcons
            onPress={() => navigation.navigate(routes.HOTELS)}
            name="keyboard-backspace"
            color={colors.white}
            size={34}
          />
        ),
      })}
    />
    <Stack.Screen
      name={routes.BOOKING_FORM}
      component={BookingFormScreen}
      options={() => ({
        title: "Fill in your information",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
    />
    <Stack.Screen
      options={() => ({
        title: "Select check-in & check-out dates",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
      name="BookingDuration"
      component={BookingDurationScreen}
    />
    <Stack.Screen
      options={() => ({
        title: "Description",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      })}
      name="HotelDescription"
      component={HotelDescriptionScreen}
    />
    <Stack.Screen
      name="HotelDetails"
      component={HotelDetailsScreen}
      options={({ route }) => ({
        title: route.params.name,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerRight: () => (
          <View style={styles.icon}>
            <AppShare slug={route.params.slug} hotelName={route.params.name} />
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="ConferenceHotelDetails"
      component={ConferenceHotelDetails}
      options={({ route }) => ({
        title: route.params.name,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerRight: () => (
          <AppShare slug={route.params.slug} hotelName={route.params.name} />
        ),
      })}
    />
    <Stack.Screen
      name="ApartmentDetails"
      component={ApartmentDetails}
      options={({ route }) => ({
        title: route.params.name,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerRight: () => (
          <AppShare slug={route.params.slug} hotelName={route.params.name} />
        ),
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    right: 10,
  },
});

export default HotelsNavigator;
