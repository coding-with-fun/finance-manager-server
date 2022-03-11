const app = require("./app");
const connectDB = require("./utils/db");
const routes = require("./routes/routes");
require("dotenv").config();

const PORT = process.env.PORT || 3030;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.info(`Server is running on port ${PORT}...`);
        });

        app.use("/api/v1", routes);
    })
    .catch((error) => {
        console.error(error.message);
    });
