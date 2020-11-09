import React, { useContext, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import dayjs from "dayjs";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { AuthContext } from "../auth/context";
import Card from "../components/Card";
import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import { numberWithCommas, phoneRegExp } from "../utility/importantFuncs";
import Screen from "../components/Screen";
import { useKeyboardStatus } from "../hooks/useKeyboardStatus";
import UploadScreen from "../screens/UploadScreen";
import routes from "../navigation/routes";
import WelcomeScreenAppButton from "../components/WelcomeScreenAppButton";

function BookingFormScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingNumber, setBookingNumber] = useState();
  const [progress, setProgress] = useState(0);

  const validationSchema = Yup.object().shape({
    guest_name: user
      ? Yup.string(user.name)
      : Yup.string().required().label("Name"),
    email: user
      ? Yup.string(user.email)
      : Yup.string().required().email().label("Email"),
    mobile_Number: Yup.string()
      .required()
      .matches(phoneRegExp, "Mobile number is not valid")
      .min(10)
      .label("Mobile number"),
    special_requests: Yup.string().label("Special requests"),
    company_name: Yup.string().label("Company name"),
  });

  const isOpen = useKeyboardStatus();

  const roomData = route.params.roomData;
  const hotelData = route.params;

  const handleSubmit = async ({
    guest_name,
    email,
    mobile_Number,
    special_requests,
    company_name,
  }) =>
    // { resetForm }
    {
      setProgress(0);
      setUploadVisible(true);

      const result = await hotelsApi.addBooking(
        {
          guest_name: user ? user.name : guest_name,
          email: user ? user.email : email,
          mobile_Number,
          special_requests,
          hotel: hotelData.hotelId,
          items: roomData,
          user: hotelData.hotelOwner,
          company_name: hotelData.is_conference_room ? company_name : "N/A",
          final_total: hotelData.final_total,
          payment_option: 1,
        },
        (progress) => setProgress(progress)
      );
      setModalVisible(false);
      setBookingNumber(result.data.invoice_number);

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not post the booking");
      }
    };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          navigation.navigate(routes.BOOKING_CONFIRMATION, {
            ...hotelData,
            bookingNumber,
            clientName: user ? user.name : null,
          });
        }}
        progress={progress}
        visible={uploadVisible}
      />
      {!user && (
        <WelcomeScreenAppButton
          color="light"
          title="Sign in"
          onPress={() => navigation.navigate(routes.WELCOME_SCREEN, route)}
        />
      )}
      <AppForm
        initialValues={{
          guest_name: user ? user.name : "",
          email: user ? user.email : "",
          mobile_Number: "",
          special_requests: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <ErrorMessage error={error} visible={error} /> */}
        <AppFormField
          autoCorrect={false}
          icon="account-outline"
          name="guest_name"
          value={user ? user.name : ""}
          placeholder="Full name"
        />
        {hotelData.is_conference_room && (
          <AppFormField
            autoCorrect={false}
            icon="office-building"
            name="company_name"
            placeholder="Company name"
          />
        )}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email-outline"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          value={user ? user.email : ""}
          textContentType="emailAddress"
        />
        <AppFormField
          keyboardType="phone-pad"
          icon="cellphone"
          name="mobile_Number"
          autoFocus={user ? true : false}
          placeholder="Mobile phone"
        />
        <AppFormField
          maxLength={255}
          multiline
          scrollEnabled
          name="special_requests"
          numberOfLines={3}
          placeholder={
            hotelData.is_conference_room
              ? "Enter names of guests each on new line"
              : "Special requests if any (please note the requests are not guaranteed)"
          }
        />

        {!isOpen && (
          <View style={styles.reservation}>
            {/* {console.log(values)} */}
            <View style={styles.text}>
              <AppText>KES {numberWithCommas(hotelData.final_total)}</AppText>
              <AppText style={styles.chargesTaxes}>
                Includes charges and taxes
              </AppText>
            </View>
            <View style={styles.reserveBtn}>
              <AppButton
                color="secondary"
                title="Review booking"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        )}
        <Modal visible={modalVisible} animationType="slide">
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <ScrollView style={styles.scrollView}>
            <View style={styles.paymentCard}>
              <Card
                title={`No payment required now`}
                addressInfo={`You are not required to make any payment for this property now. You will submit your payment on checkin`}
              />
            </View>
            <View style={styles.hotelCard}>
              <Card
                title={hotelData.hotelName}
                imageUrl={hotelData.photo}
                addressInfo={hotelData.address}
              />
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
                  {dayjs(new Date(hotelData.checkout)).format(
                    "ddd DD MMM YYYY"
                  )}
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
          <View style={styles.reservationModal}>
            <View style={styles.text}>
              <AppText>KES {numberWithCommas(hotelData.final_total)}</AppText>

              <AppText style={styles.btnText}>
                Includes charges and taxes
              </AppText>
            </View>
            <View style={styles.reserveBtn}>
              <SubmitButton title="Book now" icon="account-plus-outline" />
            </View>
          </View>
        </Modal>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: colors.medium,
    fontSize: 14,
    paddingBottom: 5,
  },
  cardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  container: {
    padding: 10,
  },
  chargesTaxes: {
    color: colors.black,
    fontSize: 13,
    paddingBottom: 5,
  },
  checkinText: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    width: "50%",
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
  checkinContainer: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  hotelCard: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginBottom: 3,
    paddingBottom: 0,
  },
  finalTotalText: {
    color: colors.dark,
  },
  subTotalText: {
    color: colors.medium,
    fontSize: 16,
    // alignItems: "flex-start",
  },
  scrollView: {
    marginBottom: 10,
  },
  reservation: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "flex-end",
  },
  reservationModal: {
    bottom: 5,
    borderTopWidth: 1,
    borderTopColor: colors.light,

    // flex: 1,
    // // flexDirection: "row",
    // justifyContent: "flex-end",
  },
  roomItems: {
    paddingLeft: 15,
    paddingBottom: 15,
    color: colors.medium,
    fontSize: 16,
  },
  roomName: {
    padding: 10,
    color: colors.dark,
    fontSize: 16,
  },
  reserveBtn: {
    width: "50%",
    position: "absolute",
    right: 0,
  },
  paymentCard: {
    borderBottomColor: colors.light,
    borderBottomWidth: 8,
    marginBottom: 10,
  },
  text: {
    width: "50%",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
});

export default BookingFormScreen;
