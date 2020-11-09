import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Alert } from "react-native";
import routes from "./routes";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

export default HomeScreenNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.HOME_SCREEN}
      component={HomeScreen}
      options={() => ({
        title: "Marvellous Ventures",
        headerTitleAlign: "center",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerRight: () => (
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              onPress={() =>
                Alert.alert(
                  "Your notifications",
                  "You do not have any notification"
                )
              }
              name="bell-outline"
              color={colors.white}
              size={24}
            />
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen
      name={routes.SEARCH_SCREEN}
      component={SearchScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 10,
    flexDirection: "row",
  },
  msgContainer: {
    marginRight: 20,
  },
});
