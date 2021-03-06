import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "./AppText/";
import colors from "../config/colors";

function HotelCard({
  addressInfo,
  taxInfo,
  title,
  subTitle,
  imageUrl,
  onPress,
  priceSummary,
  roomName,
  prefix,
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
          {prefix && (
            <AppText style={styles.addressInfo} numberOfLines={2}>
              {prefix}
            </AppText>
          )}
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
    paddingLeft: 20,
  },
  card: {
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 5,
  },
  detailsContainer: {
    // padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5,
  },
  priceSummary: {
    color: colors.medium,
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  roomName: {
    color: colors.medium,
    fontSize: 13,
  },
  taxInfo: {
    color: colors.medium,
    fontSize: 13,
    paddingLeft: 20,
  },
  title: {
    marginBottom: 1,
    paddingTop: 10,
    paddingLeft: 20,
  },
});

export default HotelCard;
