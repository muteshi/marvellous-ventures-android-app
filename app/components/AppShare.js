import React from "react";
import { Share } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
const mainUrl = "https://marvellousventures.com/";

const AppShare = ({ slug, hotelName }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out ${hotelName} on Marvellous Ventures! ${
          mainUrl + slug
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <MaterialCommunityIcons
      onPress={() => onShare()}
      name="share-variant"
      color={colors.white}
      size={30}
    />
  );
};

export default AppShare;
