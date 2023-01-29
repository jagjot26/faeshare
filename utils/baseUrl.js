const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "http://54.236.48.80";

export default baseUrl;
