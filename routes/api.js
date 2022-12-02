const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

router.get("/getproducts", (req, res) => {
    const conn = mongoose.connection;
    conn.execute("SELECT * FROM `products`", [], function (err, results) {
        res.json(results);
        db.disconnect(conn);
    });
});

router.get("/getproduct", (req, res) => {
    const conn = mongoose.connection;
    conn.execute(
        "SELECT * FROM `products` WHERE `ID` = ?",
        [req.query.id],
        function (err, results) {
            res.json(results);
            db.disconnect(conn);
        }
    );
});

module.exports = router;