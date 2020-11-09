import React from "react";
import { View, StyleSheet, Modal, Image } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={colors.secondary}
            progress={progress}
            width={200}
          />
        ) : (
          <>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
            </View>
            <LottieView
              autoPlay
              loop={false}
              // onAnimationFinish={onDone}
              source={require("../assets/animations/done.json")}
              style={styles.animation}
            />
            <AppText style={styles.confirmedText}>Confirmed!</AppText>
            <View style={styles.subTitleContainer}>
              <AppText style={styles.confirmedSubtitle}>
                You will get an email with a confirmation
              </AppText>
              <AppButton title={"View confirmation"} onPress={onDone} />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  animation: {
    width: 200,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.light,
  },
  confirmedText: {
    marginTop: -40,
    color: colors.secondary,
    fontSize: 30,
  },
  confirmedSubtitle: {
    color: colors.dark,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitleContainer: {
    marginTop: -20,
    padding: 20,
    alignItems: "center",
  },
});

export default UploadScreen;
