import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function SearchTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.secondary}
          style={styles.icon}
        />
      )}
      <TextInput style={defaultStyles.textInput} {...otherProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 1,
    flexDirection: "row",
    padding: 15,
    marginVertical: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: defaultStyles.colors.primary,
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
});

export default SearchTextInput;
