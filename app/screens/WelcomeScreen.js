import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import WelcomeScreenAppButton from "../components/WelcomeScreenAppButton";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation, route }) {
  const { googleLogin, loading } = useAuth();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <ImageBackground
        blurRadius={2}
        style={styles.background}
        source={require("../assets/bg_photo.jpg")}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <View style={styles.buttonsContainer}>
          <WelcomeScreenAppButton
            color="light"
            icon="google"
            title="Sign in with Google"
            onPress={() => {
              route.params
                ? googleLogin(route.params.name, route.params)
                : googleLogin(routes.HOME_SCREEN);
            }}
          />
          <WelcomeScreenAppButton
            color="light"
            icon="email-outline"
            title="Sign in with email"
            onPress={() => {
              route.params
                ? navigation.navigate("Login", route.params)
                : navigation.navigate("Login");
            }}
          />
          <WelcomeScreenAppButton
            color="light"
            icon="account-plus-outline"
            title="Register your account"
            onPress={() => navigation.navigate("Register", route.params)}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },

  logo: {
    width: 250,
    height: 250,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});

export default WelcomeScreen;
