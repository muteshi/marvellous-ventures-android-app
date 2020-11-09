import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import dayjs from "dayjs";

import AppText from "../components/AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { numberWithCommas } from "../utility/importantFuncs";
import Card from "../components/Card";

function ConfirmationScreen({ route }) {
  const roomData = route.params.roomData;
  const hotelData = route.params;
  return (
    <Screen style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.hotelCard}>
          <AppText style={styles.welcomeText}>
            Dear {hotelData.clientName} welcome to{" "}
          </AppText>
          <Card
            title={hotelData.hotelName}
            imageUrl={hotelData.photo}
            addressInfo={hotelData.address}
          />
        </View>
        <View style={styles.checkinContainer}>
          <View style={styles.checkinText}>
            <AppText>Booking number</AppText>
          </View>
          <View style={styles.checkinDate}>
            <AppText style={styles.checkinDateText}>
              #{hotelData.bookingNumber}
            </AppText>
          </View>
        </View>
        <View style={styles.checkinContainer}>
          <View style={styles.checkinText}>
            <AppText>Check-in</AppText>
          </View>
          <View style={styles.checkinDate}>
            <AppText style={styles.checkinDateText}>
              {dayjs(new Date(hotelData.checkin)).format("ddd DD MMM YYYY")}
            </AppText>
          </View>
        </View>
        <View style={styles.checkinContainer}>
          <View style={styles.checkinText}>
            <AppText>Check-out</AppText>
          </View>
          <View style={styles.checkinDate}>
            <AppText style={styles.checkinDateText}>
              {dayjs(new Date(hotelData.checkout)).format("ddd DD MMM YYYY")}
            </AppText>
          </View>
        </View>
        <View style={styles.checkinContainer}>
          <View style={styles.checkinText}>
            <AppText>For</AppText>
          </View>
          <View style={styles.checkinDate}>
            <AppText style={styles.checkinDateText}>
              {hotelData.stay_duration}{" "}
              {hotelData.stay_duration > 1 ? " nights, " : " night, "}
              {hotelData.roomQty}
              {hotelData.roomQty > 1 ? " rooms " : " room "}
            </AppText>
          </View>
        </View>

        <View style={styles.checkinContainer}>
          <View style={styles.checkinText}>
            <AppText>Final total</AppText>
          </View>
          <View style={styles.checkinDate}>
            <AppText style={styles.finalTotalText}>
              KES {numberWithCommas(hotelData.final_total)}
            </AppText>
          </View>
        </View>
        {roomData
          .filter((item) => item.qty !== 0)
          .map((item, index) => (
            <View key={index}>
              <Card
                key={item.id}
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
                  !item.is_conference_room
                    ? `${item.total_guests} ${
                        item.total_guests > 1
                          ? "adults per room"
                          : "adult per room"
                      }`
                    : `${item.qty} out of ${item.total_guests} guests`
                }
              />
              <View key={item.roomName} style={styles.cardBorder}></View>
            </View>
          ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
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
