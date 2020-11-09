import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function WelcomeScreenAppButton({ color = "primary", title, onPress, icon }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            style={styles.icon}
            color={colors.secondary}
          />
        )}

        <AppText style={styles.buttonText}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.primary,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
    // marginLeft: 5,
  },
  buttonText: {
    color: colors.dark,
  },
  container: {
    // backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
    marginTop: 4,
  },
});

export default WelcomeScreenAppButton;
