require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const keys = require("./config/keys");
const routes = require("./routes");
const socket = require("./socket");
const setupDB = require("./utils/db");

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  })
);
app.use(cors());

setupDB();
require("./config/passport")(app);
app.use(routes);

// Import swagger.yaml file
const swagger = require("./swagger-output.json");

// Configure Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

const server = app.listen(port, () => {
  console.log(
    `${chalk.bold.green("✓")} ${chalk.bold.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ fetch API ${chalk.bold.red(
        "OR"
      )} ${chalk.bold.blue(
        `Visit http://localhost:${port}/api-docs read document`
      )}`
    )}`
  );
});

socket(server);
