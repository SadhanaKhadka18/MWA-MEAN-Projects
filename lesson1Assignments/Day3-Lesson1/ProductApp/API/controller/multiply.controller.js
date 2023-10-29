module.exports.multiply = function (req, res) {
    console.log(req.query);
    const firstPart = parseInt(req.params.firstPart, 10);
    const secondPart = parseInt(req.query.secondpart, 10);
    const product = firstPart * secondPart;
    const response = "<h1>the product of " + firstPart + " and " + secondPart + " is " + product + "</h1>";
    res.send(response)

};