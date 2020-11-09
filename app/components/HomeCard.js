import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "./AppText/";
import colors from "../config/colors";

function HomeCard({
  addressInfo,
  taxInfo,
  title,
  subTitle,
  imageUrl,
  onPress,
  priceSummary,
  roomName,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {imageUrl && (
          <Image
            style={styles.image}
            tint="light"
            // preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        )}
        <View style={styles.detailsContainer}>
          {title && (
            <AppText style={styles.title} numberOfLines={2}>
              {title}
            </AppText>
          )}
          {addressInfo && (
            <AppText style={styles.addressInfo} numberOfLines={2}>
              {addressInfo}
            </AppText>
          )}
          {priceSummary && (
            <AppText style={styles.priceSummary} numberOfLines={2}>
              {priceSummary}
            </AppText>
          )}
          {roomName && (
            <AppText style={styles.roomName} numberOfLines={2}>
              {roomName}
            </AppText>
          )}
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
          {taxInfo && (
            <AppText style={styles.taxInfo} numberOfLines={2}>
              {taxInfo}
            </AppText>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  addressInfo: {
    color: colors.medium,
    fontSize: 13,
  },
  card: {
    backgroundColor: colors.white,
    overflow: "hidden",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    marginRight: 5,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 13,
  },
  priceSummary: {
    color: colors.black,

    fontSize: 17,
  },
  roomName: {
    color: colors.medium,
    fontSize: 13,
  },
  taxInfo: {
    color: colors.medium,
    fontSize: 13,
  },
  title: {
    fontSize: 15,
    marginBottom: 1,
  },
});

export default HomeCard;
