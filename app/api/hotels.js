import client from "./client";

const addbookingendpoint = "/booking/new/";
const getbookingsendpoint = "/booking/";
const hotelsendpoint = "/mobile-hotel/";
const roomssendpoint = "/hotel-room/";
const photosendpoint = "/hotel/photos/";

export const addBooking = (booking, onUploadProgress) => {
  return client.post(addbookingendpoint, booking, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getHotels = () => client.get(hotelsendpoint);
const getBookings = () => client.get(getbookingsendpoint);
const deleteBooking = (bookingId) =>
  client.delete(getbookingsendpoint + bookingId + "/delete/");
const getRooms = (hotelId) => client.get(roomssendpoint + hotelId + "/");
const getHotelPhotos = (hotelId) => client.get(photosendpoint + hotelId + "/");

export default {
  addBooking,
  deleteBooking,
  getBookings,
  getHotels,
  getHotelPhotos,
  getRooms,
};
