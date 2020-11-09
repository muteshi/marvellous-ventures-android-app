import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import _ from "lodash";
import moment from "moment";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import RoomPicker from "../components/RoomPicker";
import { numberWithCommas } from "../utility/importantFuncs";

const RoomsScreen = ({ navigation, route }) => {
  const getRoomsApi = useApi(hotelsApi.getRooms);
  const [roomData, setRoomData] = useState([]);
  const [roomTotals, setRoomTotals] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [roomQtyTotal, setRoomQtyTotal] = useState([]);
  const [roomTotal, setRoomTotal] = useState();

  useEffect(() => {
    const roomSubTotals = roomData.map((room) => room.sub_total);
    setRoomTotals(roomSubTotals);
  }, [roomData]);

  useEffect(() => {
    const roomQty = roomData.map((room) => room.qty);
    setRoomQtyTotal(roomQty);
  }, [roomData]);

  useEffect(() => {
    getRoomsApi.request(route.params.id);
  }, []);

  useEffect(() => {
    const total = roomTotals.reduce((a, b) => {
      return a + b;
    }, 0);
    setFinalTotal(total);
  }, [roomTotals]);

  //room quantity total
  useEffect(() => {
    const total = roomQtyTotal.reduce((a, b) => {
      return a + b;
    }, 0);
    setRoomTotal(total);
  }, [roomQtyTotal]);

  const bookingDetails = {
    final_total: finalTotal,
    roomData,
    roomQty: roomTotal,
    checkin: route.params.checkin,
    checkout: route.params.checkout,
    hotelName: route.params.hotelName,
    hotelId: route.params.id,
    hotelOwner: route.params.hotelOwner,
    photo: route.params.photo,
    address: route.params.address,
    stay_duration: route.params.stayDuration,
  };

  const roomQtyOptions = (item) =>
    _.range(0, item.total_Rooms + 1).map(function (num) {
      const roomPrice = item.room_Price * num;
      const roomNum = num > 1 ? " Rooms for " : " Room for ";
      const roomPriceShow = `${num}${roomNum}${"KES "}${numberWithCommas(
        roomPrice
      )}`;

      return {
        qty: num,
        label: `${roomPrice === 0 ? "Remove selection" : roomPriceShow}`,
        room_Price: item.room_Price,
        id: item.id,
        rooms: item.id,
        is_conference_room: false,
        roomUser: item.user,
        description: item.room_details,
        room_Name: item.room_Name,
        name: route.params.hotelName,
        hotelId: item.hotel,
        stay_duration: route.params.stayDuration,
        total_guests: item.max_adults,
        sub_total: route.params.stayDuration * item.room_Price * num,
        checkin: moment(new Date(route.params.checkin)).format("YYYY-MM-DD"),
        checkout: moment(new Date(route.params.checkout)).format("YYYY-MM-DD"),
      };
    });

  return (
    <>
      <ActivityIndicator visible={getRoomsApi.loading} />
      <Screen style={styles.screen}>
        {getRoomsApi.error && (
          <>
            <AppText>Couldn't retrieve rooms.</AppText>
            <AppButton title="Retry" onPress={getRoomsApi.request} />
          </>
        )}

        <FlatList
          data={getRoomsApi.data.filter((room) => {
            return !room.is_conference_room;
          })}
          keyExtractor={(room) => room.id.toString()}
          renderItem={({ item }) => (
            <>
              <Card
                title={item.room_Name}
                taxInfo={`includes taxes and charges`}
                subTitle={"KES " + numberWithCommas(item.room_Price)}
                priceSummary={`Price for 1 night, ${item.max_adults} adults`}
                imageUrl={item.room_photo}
                addressInfo={item.room_details}
              />
              <RoomPicker
                selectedRoom={`${
                  roomData.find((x) => x.id === item.id)
                    ? roomData.find((x) => x.id === item.id).qty
                    : 0
                } ${
                  roomData.find((x) => x.id === item.id) &&
                  roomData.find((x) => x.id === item.id).qty > 1
                    ? "rooms"
                    : "room"
                } selected`}
                onSelectRoom={(room) => {
                  let roomIndex = roomData.findIndex(
                    (room) => room.id == item.id
                  );
                  const newState = [...roomData];
                  newState[roomIndex] = room;
                  roomData[roomIndex]
                    ? setRoomData(newState)
                    : setRoomData([...roomData, room]);
                  setRoomTotals([]);
                }}
                items={roomQtyOptions(item)}
                icon="apps"
                placeholder="Select Room"
              />
            </>
          )}
        />
        <View style={styles.reservation}>
          <View style={styles.text}>
            {finalTotal >= 1 ? (
              <>
                <AppText>KES {numberWithCommas(finalTotal)}</AppText>
                <AppText style={styles.chargesTaxes}>
                  Includes charges and taxes
                </AppText>
              </>
            ) : (
              <AppText style={styles.noRoomText}>
                You are yet to select a room
              </AppText>
            )}
          </View>
          <View style={styles.reserveBtn}>
            <AppButton
              color="secondary"
              title="Reserve"
              onPress={() => {
                finalTotal > 1
                  ? navigation.navigate(routes.BOOKING_FORM, bookingDetails)
                  : Alert.alert(
                      "Select your stay",
                      `${roomData[0].room_Price}`
                    );
              }}
            />
          </View>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  chargesTaxes: {
    color: colors.medium,
    fontSize: 13,
  },
  noRoomText: {
    color: colors.medium,
    fontSize: 15,
    marginTop: 10,
  },
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
  reservation: {
    flexDirection: "row",
    justifyContent: "center",
  },
  reserveBtn: {
    width: "50%",
  },
  text: {
    width: "50%",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
});

export default RoomsScreen;
