import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet, FlatList } from "react-native";
import { LogBox } from "react-native";

import colors from "../config/colors";
import hotelsApi from "../api/hotels";
import Screen from "../components/Screen";
import searchedHotel from "../auth/storage";
import useApi from "../hooks/useApi";
import { ListItem, ListItemSeparator } from "../components/lists";
import routes from "../navigation/routes";

function SearchScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const getHotelsApi = useApi(hotelsApi.getHotels);

  useEffect(() => {
    getHotelsApi.request();
  }, []);

  const results = getHotelsApi.data.filter((hotel) => {
    if (searchText !== "")
      return (
        hotel.name.includes(searchText.toLowerCase()) ||
        hotel.city.includes(searchText.toLowerCase()) ||
        hotel.address.includes(searchText.toLowerCase())
      );
  });

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  return (
    <Screen>
      <SearchBar
        placeholder="Enter destination.."
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainerStyle}
        value={searchText}
        onChangeText={(search) => setSearchText(search)}
      />
      <FlatList
        data={results}
        keyExtractor={(hotel) => hotel.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            image={item.property_photo}
            title={item.name}
            onPress={() => {
              searchedHotel.storeSearchedHotel(item);
              route.params.resetData();
              navigation.navigate(routes.HOME_SCREEN);
              //   setSearchText("");
            }}
            subTitle={`${item.address}, ${item.city}, ${item.country}`}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: colors.light,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  searchContainer: {
    backgroundColor: colors.white,
    padding: 0,
    padding: 20,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

export default SearchScreen;
