const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const allowedDomains = ["http://127.0.0.1:3000", "http://localhost:3000"];
const UI_DOMAIN = process.env.UI_DOMAIN;

const app = express();

app.use(express.json());

/**
 * @description Helmet configuration
 * @reference   https://www.securecoding.com/blog/using-helmetjs
 */
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "script-src": ["'self'", UI_DOMAIN],
            "style-src": null,
        },
    }),
    helmet.xssFilter(),
    helmet.noSniff(),
    helmet.hidePoweredBy(),
    helmet.frameguard({
        action: "deny",
    }),
    helmet.dnsPrefetchControl({
        allow: true,
    })
);

/**
 * @description CORS configuration
 * @reference   https://expressjs.com/en/resources/middleware/cors.html
 */
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (
            allowedDomains.indexOf(origin) !== -1 ||
            origin.includes(UI_DOMAIN)
        ) {
            return callback(null, true);
        }

        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

module.exports = app;
