import fetchAPI from "./fetch";

const apiHealthCheck = () => {
  fetchAPI("/health", "GET", null);
};

export default apiHealthCheck;
