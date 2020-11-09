import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-google-app-auth";
import jwtDecode from "jwt-decode";
import { useContext, useState } from "react";

import logger from "../utility/logger";

import keys from "../config/google";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import { AuthContext } from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const authenticateUserApi = useApi(usersApi.authenticateGoogleUser);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);

    setUser(user);
    authStorage.storeToken(authToken);
  };

  const googleLogin = async (routeName, routeParams) => {
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidStandaloneAppClientId: keys.ANDROID_CLIENT_KEY,
        scopes: ["profile", "email"],
      });
      setLoading(false);
      if (result.type === "success") {
        const authenticateUser = await authenticateUserApi.request({
          token: result.accessToken,
        });
        const user = jwtDecode(authenticateUser.data.access_token);
        setUser(user);
        authStorage.storeToken(authenticateUser.data.access_token);
        navigation.navigate(routeName, routeParams);
      } else {
        const err = new Error("Google login cancelled");
        logger.log(err);
      }
    } catch (e) {
      logger.log(e);
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { googleLogin, user, logIn, loading, logOut };
};
