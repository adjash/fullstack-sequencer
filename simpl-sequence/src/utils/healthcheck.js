import fetchAPI from "./fetch";

const apiHealthCheck = () => {
  fetchAPI("/health");
};

export default apiHealthCheck;
