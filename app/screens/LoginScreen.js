import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms/";
import useAuth from "../auth/useAuth";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginScreen({ navigation, route }) {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    setLoading(true);
    if (result.ok) {
      //to redirect user approprietely
      setLoading(false);
      route.params
        ? navigation.navigate(route.params.name, route.params.params)
        : navigation.navigate(routes.HOME_SCREEN);
    }
    if (!result.ok) {
      setLoginFailed(true);
      setLoading(false);
    }

    logIn(result.data.access);
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email-outline"
          name="email"
          keyboardType="email-address"
          placeholder="Your email address"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-outline"
          name="password"
          placeholder="Your password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Sign in" icon="login-variant" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
