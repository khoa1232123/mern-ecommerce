const Cart = require('../models/cart');
const slugify = require('slugify');

exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      // if cart already exists then update cart by quantity
      Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            cartItems: req.body.cartItems,
          },
        }
      );
      // res.status(200).json({ message: cart });
    } else {
      // if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) return res.status(201).json({ cart });
      });
    }
  });
};
