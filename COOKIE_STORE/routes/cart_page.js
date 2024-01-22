let express = require('express')
let authorize = require('../public/javascript/authorize.js')
let router = express.Router()
let database = require('../public/javascript/dataquery.js')

router.get('/', authorize('user'), async function (req, res, next) {
  let username = req.signedCookies['admin'] || req.signedCookies['user']

  user = await database.get_userdata('NAME', username, 'ID')

  let ID_array = await database.get_user_cart(user[0]['ID'])
  let array = []

  for (element of ID_array) {
    let product = await database.get_productdata('ID', element['PRODUCT_ID'])
    array.push(product[0])
  }

  res.render('cart', { products: array })
})

module.exports = router