import AsyncStorage from "@react-native-community/async-storage";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";
const bookingDates = "state";
const searchedHotel = "item";

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

const defaultDates = {
  startDate: new Date(),
  endDate: tomorrow,
};
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing auth token");
  }
};

const storeBookingDates = async (dates) => {
  try {
    await AsyncStorage.setItem(bookingDates, JSON.stringify(dates));
  } catch (error) {
    console.log("Error storing booking dates", error);
  }
};

const storeSearchedHotel = async (hotel) => {
  try {
    await AsyncStorage.setItem(searchedHotel, JSON.stringify(hotel));
  } catch (error) {
    console.log("Error storing searched hotel", error);
  }
};

const getSearchedHotel = async () => {
  try {
    const hotel = await AsyncStorage.getItem(searchedHotel);
    return JSON.parse(hotel);
  } catch (error) {
    console.log("Error getting searched hotel", error);
  }
};

const getBookingDates = async () => {
  try {
    const dates = await AsyncStorage.getItem(bookingDates);
    return JSON.parse(dates);
  } catch (error) {
    console.log("Error getting the booking date", error);
  }
};

const getHotel = async () => {
  try {
    return await getSearchedHotel();
  } catch (error) {
    console.log("Error hotel", error);
  }
};

const getDates = async () => {
  try {
    const dates = await getBookingDates();
    const isValidDate = new Date(dates.startDate) > new Date();
    return isValidDate ? dates : defaultDates;
  } catch (error) {
    console.log("Error getting user", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  try {
    const token = await getToken();
    return token && new Date(jwtDecode(token).exp * 1000) > new Date()
      ? jwtDecode(token)
      : removeToken();
  } catch (error) {
    console.log("Error getting user", error);
  }
};

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error deleting the auth token", error);
  }
};

export default {
  getBookingDates,
  getDates,
  storeBookingDates,
  getToken,
  getUser,
  storeToken,
  removeToken,
  storeSearchedHotel,
  getHotel,
};
