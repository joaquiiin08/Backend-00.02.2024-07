const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


app.get("/", (req, res) => {
    res.json({ message: "bienvenido a la aplicacion de pacha" });
});
require("./app/routes/routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
