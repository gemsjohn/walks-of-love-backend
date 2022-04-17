require("dotenv").config();
// make express available to the app (aka instantiates express)
const express = require("express");
const cors = require("cors");
// assigns express to the variable app
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
// Node module that allows you to extract module.exports object
const path = require("path");
// define the routing
const routes = require("./controllers");
// tell sequelize where the connection is located
const sequelize = require("./config/connection");
const session = require("express-session");

// set up handlebars as the template engine
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// connect to npm module connect-session-sequelize and pass through express sessionStore property
const SequelizeStore = require("connect-session-sequelize")(session.Store);


// Middleware to parse information for the db
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use the path node and express middleware to serve static resources in public folder
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
