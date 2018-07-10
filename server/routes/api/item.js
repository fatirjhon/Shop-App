const Item = require('../../models/Item');
module.exports = (app) => {

  // Show all items
  app.get('/api/items', (req, res, next) => {
    Item.find()
      .sort({date: -1})
      .then(items => res.json(items));
  });

  // Create new item
  app.post('/api/item/create', (req, res, next) => {
    const {body} = req;
    const {
      itemName,
      size,
      color,
      price
    } = body;

    // validation
    if (!itemName) {
      return res.send({
        success: false,
        message: 'Item Name cannot be empty!'
      });
    }
    if (!size) {
      return res.send({
        success: false,
        message: 'Size must be selected!'
      });
    }
    if (!color) {
      return res.send({
        success: false,
        message: 'Color must be selected!'
      });
    }
    if (price < 1) {
      return res.send({
        success: false,
        message: 'Price cannot be empty!'
      });
    }

    // double item validation
    Item.find({
      itemName: itemName
    }, (err, prevItem) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Server error'
        });
      } else if (prevItem.length > 0) {
        return res.send({
          success: false,
          message: 'Item already exist!'
        });
      }

      // correct add new item
      const newItem = new Item();
      newItem.itemName = itemName;
      newItem.size = size;
      newItem.color = color;
      newItem.price = price;
      newItem.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Item successfully added.'
        });
      });
    });
  });

  // Delete item
  app.delete('/api/items/:id', (req, res, next) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.json({ success: false }));
  });

};
