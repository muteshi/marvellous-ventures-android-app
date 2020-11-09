import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import dayjs from "dayjs";

import AppText from "../components/AppText";
import colors from "../config/colors";
import { numberWithCommas } from "../utility/importantFuncs";
import HotelCard from "../components/HotelCard";

function ConfirmationScreen({ route }) {
  const bookingData = route.params;
  const roomData = route.params.items;

  return (
    // <Screen>
    <ScrollView style={styles.scrollView}>
      <View style={styles.hotelCard}>
        <HotelCard
          title={bookingData.hotel_name}
          imageUrl={"https://marvellousventures.com" + bookingData.hotel_photo}
          addressInfo={bookingData.address}
          priceSummary={bookingData.booking_status}
        />
      </View>
      <View style={styles.checkinContainer}>
        <View style={styles.checkinText}>
          <AppText style={styles.confirmationNumber}>
            Confirmation number
          </AppText>
        </View>
        <View style={styles.checkinDate}>
          <AppText style={styles.checkinDateText}>
            #{bookingData.reservation_id}
          </AppText>
        </View>
      </View>
      <View style={styles.checkinContainer}>
        <View style={styles.checkinText}>
          <AppText style={styles.confirmationNumber}>Check-in</AppText>
        </View>
        <View style={styles.checkinDate}>
          <AppText style={styles.checkinDateText}>
            {dayjs(new Date(roomData[0].checkin)).format("ddd DD MMM YYYY")}
          </AppText>
        </View>
      </View>
      <View style={styles.checkinContainer}>
        <View style={styles.checkinText}>
          <AppText style={styles.confirmationNumber}>Check-out</AppText>
        </View>
        <View style={styles.checkinDate}>
          <AppText style={styles.checkinDateText}>
            {dayjs(new Date(roomData[0].checkout)).format("ddd DD MMM YYYY")}
          </AppText>
        </View>
      </View>

      <View style={styles.checkinContainer}>
        <View style={styles.checkinText}>
          <AppText>Total price</AppText>
        </View>
        <View style={styles.checkinDate}>
          <AppText style={styles.finalTotalText}>
            KES {numberWithCommas(bookingData.final_total)}
          </AppText>
        </View>
      </View>
      {roomData
        .filter((item) => item.qty !== 0)
        .map((item, index) => (
          <View key={index}>
            <HotelCard
              key={item.id}
              prefix={`Room details`}
              title={
                !item.is_conference_room
                  ? `${item.qty} x ${item.room_Name}`
                  : `${item.room_Name}`
              }
              subTitle={
                !item.is_conference_room
                  ? `Ksh ${numberWithCommas(item.sub_total)} for ${
                      item.qty
                    } rooms ${item.stay_duration} nights`
                  : `Ksh ${numberWithCommas(item.sub_total)} for ${
                      item.qty
                    } guests ${item.stay_duration} days`
              }
              addressInfo={item.description}
              taxInfo={
                item.is_conference_room
                  ? `Ksh ${numberWithCommas(item.room_Price)} per day`
                  : `Ksh ${numberWithCommas(item.room_Price)} per night`
              }
            />
            <View key={item.roomName} style={styles.cardBorder}></View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  confirmationNumber: {
    fontSize: 14,
  },
  checkinDate: {
    width: "50%",
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    color: colors.medium,
  },

  checkinDateText: {
    color: colors.medium,
    fontSize: 15,
  },
  checkinText: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    width: "50%",
  },
  checkinContainer: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  finalTotalText: {
    color: colors.dark,
  },
  hotelCard: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginBottom: 3,
    paddingBottom: 0,
  },
  paymentCard: {
    borderBottomColor: colors.light,
    borderBottomWidth: 8,
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 10,
  },
  welcomeText: {
    marginBottom: 10,
    color: colors.secondary,
  },
});

export default ConfirmationScreen;
