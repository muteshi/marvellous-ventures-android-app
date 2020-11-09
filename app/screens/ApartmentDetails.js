import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import dayjs from "dayjs";
import PhotoGrid from "react-native-thumbnail-grid";
import { InstagramLoader } from "react-native-easy-content-loader";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import bookingDates from "../auth/storage";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import hotelsApi from "../api/hotels";
import routes from "../navigation/routes";
import useApi from "../hooks/useApi";

const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

function ApartmentDetails({ route, navigation }) {
  const [checkin, setCheckinDate] = useState(new Date());
  const [checkout, setCheckoutDate] = useState(tomorrow);
  const [stayDuration, setStayDuration] = useState();

  const getHotelPhotosApi = useApi(hotelsApi.getHotelPhotos);

  const restoreDates = async () => {
    const dates = await bookingDates.getDates();
    if (dates) {
      setCheckinDate(new Date(dates.startDate));
      setCheckoutDate(new Date(dates.endDate));
    }
    const duration = dayjs(checkout).diff(dayjs(checkin), "day");
    setStayDuration(duration);
  };

  useEffect(() => {
    getHotelPhotosApi.request(route.params.id);
  }, []);

  useEffect(() => {
    restoreDates();
  }, [stayDuration]);

  //convert hotel photos object to an array
  const hotelImages = () => {
    try {
      let images = [];
      for (const index in getHotelPhotosApi.data) {
        const photo = getHotelPhotosApi.data[index].image;
        images.push(photo);
      }

      return images;
    } catch (error) {
      console.log(error);
    }
  };

  const images = hotelImages();

  //append dates from local storage to route parameters
  const hotel = {
    stayDuration,
    id: route.params.id,
    hotelOwner: route.params.contact_person,
    hotelName: route.params.name,
    photo: route.params.property_photo,
    address: `${route.params.address},${route.params.city},${route.params.country}`,
    checkin: checkin.toDateString(),
    checkout: checkout.toDateString(),
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <InstagramLoader active avatar loading={getHotelPhotosApi.loading}>
          <View>
            <PhotoGrid
              source={images}
              onPressImage={() =>
                navigation.navigate(routes.IMAGES_SCREEN, images)
              }
            />
          </View>
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{route.params.name}</AppText>
            <AppText style={styles.subtitle}>{route.params.address}</AppText>
          </View>
        </InstagramLoader>
        <View style={styles.priceContainer}>
          <ListItem
            prefix={"from"}
            title={`KES ${route.params.apartment_lowest_price[0]}`}
            subTitle={`Price for a day per apartment`}
            onPress={() => navigation.navigate(routes.ROOMS, hotel)}
          />
        </View>

        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerContainerCheckin}>
            <AppText style={styles.textContainer}>Check-in Date</AppText>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(routes.BOOKING_DURATION, {
                  resetData: restoreDates,
                });
              }}
            >
              <AppText style={styles.dateTextContainer}>
                {dayjs(checkin).format("D, dddd, MMMM, YYYY")}
              </AppText>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.datePickerContainerCheckout}>
            <AppText style={styles.textContainer}>Check-out Date</AppText>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(routes.BOOKING_DURATION, {
                  resetData: restoreDates,
                });
              }}
            >
              <AppText style={styles.dateTextContainer}>
                {dayjs(checkout).format("D, dddd, MMMM, YYYY")}
              </AppText>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ListItem
          title={`Description`}
          subTitle={`${route.params.description}`}
          onPress={() =>
            navigation.navigate(
              routes.HOTEL_DESCRIPTION,
              route.params.description
            )
          }
        />
      </ScrollView>
      <View style={styles.viewRoomsBtn}>
        <AppButton
          color="secondary"
          title="Select rooms"
          onPress={() => navigation.navigate(routes.ROOMS, hotel)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  datePickerContainerCheckout: {
    // flex: 1,
    width: "50%",
    backgroundColor: colors.light,
    // height: 100,
    // backgroundColor: "green",
  },
  datePickerContainerCheckin: {
    // flex: 1,
    // backgroundColor: "red",
    width: "50%",
    backgroundColor: colors.light,
    // height: 100,
  },
  detailsContainer: {
    padding: 20,
    // backgroundColor: colors.light,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  dateTextContainer: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
  },
  textContainer: {
    // padding: 10,
    marginLeft: 10,
    marginTop: 10,
    color: colors.medium,
  },
  viewRoomsBtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 5,
    left: 5,
    bottom: 5,
  },
  priceContainer: {
    marginVertical: 20,
    borderWidth: 10,
    borderColor: colors.light,
    // alignItems: "center",
  },
  scrollView: {
    // backgroundColor: "pink",
    marginBottom: 100,
  },
});

export default ApartmentDetails;
