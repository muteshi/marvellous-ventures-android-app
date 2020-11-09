import React, { useContext, useEffect, useState } from "react";
import { InstagramLoader } from "react-native-easy-content-loader";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import authStorage from "../auth/storage";
import { AuthContext } from "../auth/context";
import bookingDates from "../auth/storage";
import HomeCard from "../components/HomeCard";
import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import Screen from "../components/Screen";
import SearchTextInput from "../components/SearchTextInput";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [hotel, setHotel] = useState();
  const [checkin, setCheckinDate] = useState(new Date());
  const [checkout, setCheckoutDate] = useState(tomorrow);
  const getHotelsApi = useApi(hotelsApi.getHotels);

  useEffect(() => {
    getHotelsApi.request();
  }, []);

  const results = getHotelsApi.data.filter((h) => {
    if (hotel) return hotel.city === h.city;
  });

  const mostPopular = getHotelsApi.data.sort((a, b) => {
    return b.hotel_hits - a.hotel_hits;
  });

  const restoreSearchedHotel = async () => {
    const searchedHotel = await authStorage.getHotel();
    if (searchedHotel) setHotel(searchedHotel);
  };

  const restoreDates = async () => {
    const dates = await bookingDates.getDates();
    if (dates) {
      setCheckinDate(new Date(dates.startDate));
      setCheckoutDate(new Date(dates.endDate));
    }
  };

  useEffect(() => {
    restoreDates();
    restoreSearchedHotel();
  }, []);

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={styles.welcomeTxt}>
          {user && <AppText>Hi, {user.name.split(" ")[0]}</AppText>}
          <AppText style={styles.searchTxt}>
            Search Destination/Property name
          </AppText>
        </View>
        <View style={styles.searchBoxContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.SEARCH_SCREEN, {
                resetData: restoreSearchedHotel,
              });
            }}
          >
            <SearchTextInput
              icon="magnify"
              placeholder={
                hotel ? hotel.name : "Search Destination/Property name"
              }
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.BOOKING_DURATION, {
                resetData: restoreDates,
              });
            }}
          >
            <SearchTextInput
              editable={false}
              icon="calendar-blank-outline"
              placeholder={`${moment(checkin).format("ddd, MMM D")} - ${moment(
                checkout
              ).format("ddd, MMM D")}`}
            />
          </TouchableOpacity>
          <SearchTextInput
            editable={false}
            icon="account-group-outline"
            placeholder="1 room, 2 adults, 0 children"
          />
          <AppButton
            color="secondary"
            title="Search"
            onPress={() => navigation.navigate(routes.HOTEL_DETAILS, hotel)}
            disabled={hotel === undefined ? true : false}
          />
        </View>
        {hotel && user && (
          <>
            <InstagramLoader active avatar loading={getHotelsApi.loading}>
              <View style={styles.welcomeTxt}>
                <AppText>You might also like..</AppText>
                <AppText style={styles.searchTxt}>
                  Based on your last search
                </AppText>
              </View>
              <ScrollView horizontal style={styles.scrollViewContainer}>
                {results.map((h) => (
                  <HomeCard
                    key={h.id}
                    title={h.name}
                    onPress={() => navigation.navigate(routes.HOTEL_DETAILS, h)}
                    imageUrl={h.property_photo}
                    subTitle={"KES " + h.hotel_lowest_price[0]}
                  />
                ))}
              </ScrollView>
            </InstagramLoader>
          </>
        )}
        <>
          <InstagramLoader active avatar loading={getHotelsApi.loading}>
            <View style={styles.popularText}>
              <AppText>Most popular hotels..</AppText>
              <AppText style={styles.searchTxt}>
                Most of our guests really loved them!
              </AppText>
            </View>
            <ScrollView horizontal style={styles.scrollViewContainer}>
              {mostPopular.slice(0, 5).map((h) => (
                <HomeCard
                  key={h.id}
                  title={h.name}
                  onPress={() => navigation.navigate(routes.HOTEL_DETAILS, h)}
                  imageUrl={h.property_photo}
                  subTitle={"KES " + h.hotel_lowest_price[0]}
                />
              ))}
            </ScrollView>
          </InstagramLoader>
        </>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchTxt: {
    color: colors.medium,
    fontSize: 15,
  },
  searchBoxContainer: {
    borderBottomColor: colors.white,
    borderBottomWidth: 8,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 60,
  },
  scrollViewContainer: {
    top: 5,
  },
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
  welcomeTxt: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  popularText: {
    marginTop: 30,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: colors.white,
    borderTopWidth: 8,
  },
});

export default HomeScreen;
