const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://www.faeshare.in";

export default baseUrl;
