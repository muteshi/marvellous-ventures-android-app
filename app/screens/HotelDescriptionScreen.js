import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../components/AppText";

function HotelDescriptionScreen({ route }) {
  return (
    <View style={styles.container}>
      <AppText>{route.params}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HotelDescriptionScreen;
