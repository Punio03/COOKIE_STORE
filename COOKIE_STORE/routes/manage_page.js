let express = require('express')
let router = express.Router()
let authorize = require('../public/javascript/authorize')
const database = require('../public/javascript/dataquery')

router.get('/', authorize('admin'), function (req, res, next) {
  res.render('manage', { message1: '', message2: '' })
});

router.post('/', authorize('admin'), async function (req, res, next) {
  let product_name = req.body.name
  let product_price = req.body.price
  let type = req.query['type']
  
  if (type == 'add') {
    await database.set_productdata({ name: product_name, price: product_price })
    res.render('manage', { message1: 'added new product', message2: '' })
  } else if (type == 'delete') {
    if (await database.check_if_id_exists(product_id)) {
      await database.delete_data('PRODUCTDATA', product_id)
      res.render('manage', { message1: '', message2: 'deleted' })
    } else {
      res.render('manage', { message1: '', message2: 'wrong id' })
    }
  }
});

module.exports = router