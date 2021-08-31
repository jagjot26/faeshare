const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://social----media.herokuapp.com";

export default baseUrl;
