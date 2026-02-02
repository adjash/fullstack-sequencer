const fetchAPI = async (endpoint, method = "GET", body = null) => {
  try {
    const res = await (
      await fetch(`http://localhost:3000/api${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      })
    ).json();
    console.log(res);
  } catch (err) {
    console.log("backend code probably isn\'t running");
    console.log("this is fine if you aren\'t saving");
  }
};
export default fetchAPI;
