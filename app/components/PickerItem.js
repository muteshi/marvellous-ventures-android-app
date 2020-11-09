import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function PickerItem({ label, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppText style={styles.text}>{label}</AppText>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  text: {
    padding: 20,
    color: colors.dark,
  },
});

export default PickerItem;
