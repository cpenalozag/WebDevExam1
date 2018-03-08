var express = require("express");
var router = express.Router();


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/public/index.html"));
});

module.exports = router;
