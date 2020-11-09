import { useState } from "react";
import moment from "moment";

const today = moment();
const tomorrow = moment().add(1, "days");

export default useBookingDuration = () => {
  const [todayDate, setTodayDate] = useState(today);
  const [tomorrowDate, setTomorrowDate] = useState(tomorrow);
  const [displayedDate, setDisplayedDate] = useState(today);

  const onSetDates = (startDate, endDate) => {
    try {
      setTodayDate(startDate);
      setTomorrowDate(endDate);
    } catch (error) {
      console.log("Error setting checkin date", error);
    }
  };

  return {
    onSetDates,
    displayedDate,
    todayDate,
    tomorrowDate,
  };
};
