import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import moment from "moment";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import useApi from "../hooks/useApi";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import { numberWithCommas } from "../utility/importantFuncs";
import routes from "../navigation/routes";

function BookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const getBookingsApi = useApi(hotelsApi.getBookings);
  const delBookingsApi = useApi(hotelsApi.deleteBooking);

  useEffect(() => {
    getBookingsApi.request();
  }, []);

  useEffect(() => {
    setBookings(getBookingsApi.data);
  }, [bookings]);

  //   console.log(bookings);

  const handleDelete = (booking) => {
    setBookings(bookings.filter((b) => b.id !== booking));
    delBookingsApi.request(booking);
  };

  return (
    <>
      <ActivityIndicator visible={getBookingsApi.loading} />
      {/* <Screen style={styles.screen}> */}
      {getBookingsApi.error && (
        <>
          <AppText>Couldn't retrieve the bookings.</AppText>
          <AppButton title="Retry" onPress={getBookingsApi.request} />
        </>
      )}
      <FlatList
        data={bookings.length === 0 ? getBookingsApi.data : bookings}
        keyExtractor={(booking) => booking.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item.id)} />
            )}
            title={item.hotel_name}
            image={"https://marvellousventures.com" + item.hotel_photo}
            prefix={`${moment(item.items[0].checkin).format(
              "MMM D"
            )} - ${moment(item.items[0].checkout).format("MMM D")}`}
            subTitle={`KES ${numberWithCommas(item.final_total)}`}
            onPress={() => navigation.navigate(routes.BOOKING_SCREEN, item)}
          />
        )}
      />
      {/* </Screen> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
});

export default BookingsScreen;
