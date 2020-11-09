import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";

function ImagesScreen({ route: photos }) {
  console.log(photos.params < 0);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={photos.params}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => (
            <Image uri={item} style={styles.image} tint="light" />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.black,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
});

export default ImagesScreen;
