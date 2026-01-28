const express = require("express");
const routes = require("./routes/health");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Sequencer app listening on port ${port}`);
});
