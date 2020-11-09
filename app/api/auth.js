import client from "./client";

const login = (email, password) =>
  client.post("/account/token/", { email, password });

export default {
  login,
};
