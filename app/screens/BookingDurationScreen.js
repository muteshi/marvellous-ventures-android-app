import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { StyleSheet, View } from "react-native";
import Dates from "react-native-dates";
import dayjs from "dayjs";
import { LogBox } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import bookingDates from "../auth/storage";

const today = dayjs();

class BookingDurationScreen extends Component {
  state = {
    date: null,
    focus: "startDate",
    startDate: null,
    endDate: null,
  };

  async componentDidUpdate(prevState) {
    // check all dates have updated
    if (prevState.endDate !== null) {
      bookingDates.storeBookingDates({
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      });
    }
  }

  render() {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
    const isDateBlocked = (date) => date.isBefore(dayjs(), "day");

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) => this.setState({ ...this.state, date });

    const { startDate, endDate, focus } = this.state;
    const duration = endDate
      ? dayjs(endDate).diff(dayjs(startDate), "days")
      : null;
    return (
      <>
        <View style={styles.container}>
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={startDate}
            endDate={endDate}
            focusedInput={focus}
            focusedMonth={dayjs(today, "DD/MM/YYYY")}
            range
          />
          {duration && (
            <AppText style={styles.date}>
              {dayjs(startDate).format("DD MMM")} -
              {dayjs(endDate).format("DD MMM")} ({duration} nights)
            </AppText>
          )}
        </View>
        <View style={styles.viewRoomsBtn}>
          <AppButton
            color="secondary"
            title="Select dates"
            onPress={() => {
              this.props.route.params.resetData();
              this.props.navigation.goBack();
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20,
  },
  date: {
    marginTop: 50,
    marginLeft: 20,
  },
  viewRoomsBtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 5,
    left: 5,
    bottom: 5,
  },
  focused: {
    color: "blue",
  },
});

export default withNavigation(BookingDurationScreen);
