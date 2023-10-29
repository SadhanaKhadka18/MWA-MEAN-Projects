const { ObjectId } = require("mongodb");
const dbconnection = require("../data/dbconnection")
const getAll = function (req, res) {
    let max = parseInt(process.env.MAX_TO_DISPLAY,10);
    let min= parseInt(process.env.MIN_TO_DISPLAY,10);
    let count = min;
    let offset = 0;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {

        count = parseInt(req.query.count, 10);
        if (count >= max) {
            count = max;
        }
        if (count <= min) {
            count = min;
        }
    }

    const db = dbconnection.get()
    const gameCollection = db.collection(process.env.GAME_COllECTION);
    gameCollection.find().skip(offset).limit(count).toArray(function (err, docs) {//work to fix this sync code
        // console.log("Found Games", docs);
        res.status(200).json(docs);

    });

}

const getOne = function (req, res) {
    const db = dbconnection.get();
    const gameCollection = db.collection(process.env.GAME_COllECTION);
    const gameId = req.params.gameId;
    gameCollection.findOne({ _id: ObjectId(gameId) }, function (err, game) {
        console.log("found Game", game);
        res.status(200).json(game);
    });

}
const addOne = function (req, res) {
    const db = dbconnection.get();
    const gameCollection = db.collection(process.env.GAME_COllECTION);
    let newGame = {}
    if (req.body && req.body.title && req.body.year && req.body.price &&
        req.body.minPlayers && req.body.minAge) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.minPlayers = parseInt(req.body.minPlayers, 10);
        newGame.minAge = parseInt(req.body.minAge, 10);
        newGame.year = req.body.year
        if (newGame.minPlayers >= process.env.MIN_PLAYERS_LOWER_BOUNDARY && newGame.minPlayers <= process.env.MIN_PLAYERS_UPPER_BOUNDARY
             && newGame.minAge >= process.env.MIN_AGE_LOWER_BOUNDARY && newGame.minAge <= process.env.MIN_AGE_UPPER_BOUNDARY) {

            gameCollection.insertOne(newGame, function (err, response) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    // console.log(response);
                    res.status(200).json(response);
                }
            })
        } else {
            console.log("missing data for adding game");
            res.status(400).json({ error: "Required condition not satisfied" });
        }

    }
    else {
        console.log("missing data for adding game");
        res.status(400).json({ error: "Required data missing from post" });
    }
}
const deleteOne=function(req,res){
    const db = dbconnection.get();
    const gameCollection = db.collection(process.env.GAME_COllECTION);
    const gameId = req.params.gameId;
    gameCollection.deleteOne({ _id: ObjectId(gameId) }, function (err, game) {
        console.log("deleted Game", game);
        res.status(200).json(game);
    });
}
module.exports = {
    getAll
    , getOne
    , addOne
    ,deleteOne
}