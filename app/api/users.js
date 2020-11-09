import client from "./client";

const regUserEndpoint = "/account/create-user-from-mobile/";
const authenticateGoogleUserEndpoint = "/account/google/";

const register = (userInfo) =>
  client.post(regUserEndpoint, {
    from_api: false,
    is_active: true,
    parent: null,
    ...userInfo,
  });

const authenticateGoogleUser = (token) =>
  client.post(authenticateGoogleUserEndpoint, token);

export default { register, authenticateGoogleUser };
