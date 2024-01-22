let express = require('express');
let router = express.Router();
const database = require('../public/javascript/dataquery');
const COOKIE_EXPIRATION_TIME = 2592000000 // 30 days in ms

router.route('/')
  .get(async function (req, res, next) {
    await handle_request(req, res);
  }).post(async function (req, res, next) {
    await handle_request(req, res);
  })


async function handle_request(req, res, next) {
  let username = ''
  let logged = false
  let admin = false
  let products = await database.get_products()

  if (req.signedCookies['admin']) {
    username = req.signedCookies.admin
    logged = true
    admin = true
  } else if (req.signedCookies['user']) {
    username = req.signedCookies.user
    logged = true
  }

  if (logged) {
    let id = req.query.id
    if (id !== undefined) {
      user = await database.get_userdata('NAME', username, 'ID')
      database.add_to_user_cart(user[0]['ID'], id)
    }
  }

  res.render('home', { username: username, logged: logged, admin: admin, products: products });
};

module.exports = router;