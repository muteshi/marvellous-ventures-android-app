import { StyleSheet } from "react-native";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      android: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Roboto",
      },
    }),
  },
});

export default styles;
