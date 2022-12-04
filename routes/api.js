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

router.get("/sorting", async (req, res) => {
	try {
		const search = req.query.search || "";
		let sort = req.query.sort || "Default";

		// const genreOptions = [
		// 	"Action",
		// 	"Romance",
		// 	"Fantasy",
		// 	"Drama",
		// 	"Crime",
		// 	"Adventure",
		// 	"Thriller",
		// 	"Sci-fi",
		// 	"Music",
		// 	"Family",
		// ];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));

		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)

		const total = await Movie.countDocuments({
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			movies,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

module.exports = router;