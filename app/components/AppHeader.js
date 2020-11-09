import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../config/colors";

function AppHeader({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.secondary,
    // flex: 1,
    // alignSelf: "stretch",
  },
  title: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "bold",
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.white,
    // fontWeight: "bold",
  },
});

export default AppHeader;
