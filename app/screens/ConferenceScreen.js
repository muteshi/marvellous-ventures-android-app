import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import useApi from "../hooks/useApi";
import AppButton from "../components/AppButton";

function ConferenceScreen({ navigation }) {
  const getHotelsApi = useApi(hotelsApi.getHotels);

  useEffect(() => {
    getHotelsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getHotelsApi.loading} />
      <Screen style={styles.screen}>
        {getHotelsApi.error && (
          <>
            <AppText>Couldn't retrieve the hotels.</AppText>
            <AppButton title="Retry" onPress={getHotelsApi.request} />
          </>
        )}

        <FlatList
          data={getHotelsApi.data.filter((hotel) => {
            return hotel.has_conference;
          })}
          keyExtractor={(hotel) => hotel.id.toString()}
          renderItem={({ item }) => (
            <Card
              addressInfo={`${item.address}, ${item.city}, ${item.country}`}
              title={item.name}
              taxInfo={`includes taxes and charges`}
              subTitle={"KES " + item.conference_lowest_price[0]}
              priceSummary={`Price for a guest per day`}
              roomName={`${item.conference_lowest_price[2]}- ${item.conference_lowest_price[1]} max guest`}
              imageUrl={item.property_photo}
              onPress={() =>
                navigation.navigate(routes.CONFERENCE_HOTEL_DETAILS, item)
              }
              // thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
});

export default ConferenceScreen;
