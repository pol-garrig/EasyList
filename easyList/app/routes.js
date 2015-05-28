// ---------------------------------------------------- //
// Define App routes. Mainly CRUD operations over Item  //
// ---------------------------------------------------- //

var Item = require('./models/item');

// Return all Items found in Mongo in JSON format
function getItems(res) {
    Item.find(function (err, items) {

        if (err)
            res.send(err);

        res.json(items);
    });
}

// Define routes
module.exports = function (app) {

    // GET /api/items
    // Return all items
    app.get('/api/items', function (req, res) {

        // use mongoose to get all items in the database
        getItems(res);
    });

    // POST /api/items
    // Create a new item
    app.post('/api/items', function (req, res) {

        Item.create({
            text: req.body.text
        }, function (err, item) {
            if (err)
                res.send(err);

            // return all items (from Mongo)
            getItems(res);
        });

    });

    // POST /api/items/1
    // For now, close an item
    app.post('/api/items/:item_id', function (req, res) {
        Item.update({_id: req.params.item_id}, { closed: true },
            function (err, item) {
            if (err)
                res.send(err);

            // return all items (from Mongo)
            getItems(res);
        });

    });

    // DELETE /api/items/1
    // Remove an item (delete it from Mongo)
    app.delete('/api/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);

            getItems(res);
        });
    });

    // GET /
    // Return to index.html
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
};