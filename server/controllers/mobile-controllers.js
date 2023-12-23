const { validationResult } = require("express-validator");
const Mobile = require("../models/Mobile");
const User = require("../models/User");

const addMobile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `${errors.array()[0].msg}: ${errors.array()[0].path}` });
    }

    const seller = await User.findOne({ username: req.user.username });

    const requestBody = req.body;
    const newMobile = new Mobile({ ...requestBody, seller: seller._id });
    const mobile = await newMobile.save();

    await User.findOneAndUpdate(
        { username: req.user.username },
        {
          $push: {
            mobiles: mobile._id,
          },
        }
    );

    const populatedMobile = await Mobile.findById(mobile._id).populate("seller", "-password");
    res.json(populatedMobile);
  } catch (error) {
    console.error("Error adding mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchMobiles = async (req, res) => {
  try {
    const filters = req.query;
    const mobiles = await Mobile.find(filters).populate("seller", "-password");
    res.json(mobiles);
  } catch (error) {
    console.error("Error searching mobiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchMobilesForSeller = async (req, res) => {
  try {
    const seller = await User.findOne({ username: req.user.username });
    const filters = {
      seller: seller._id,
    };
    const mobiles = await Mobile.find(filters).populate("seller", "-password");
    res.json(mobiles);
  } catch (error) {
    console.error("Error searching mobiles for seller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const mobile = await Mobile.findById(req.body._id);
    const updatedUser = await User.findOneAndUpdate(
        { username: req.user.username },
        {
          $push: {
            cart: mobile._id,
          },
        },
        { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const mobile = await Mobile.findById(req.query.productId);
    const updatedUser = await User.findOneAndUpdate(
        { username: req.user.username },
        {
          $pull: {
            cart: mobile._id,
          },
        },
        { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addMobile,
  searchMobiles,
  searchMobilesForSeller,
  addToCart,
  deleteFromCart,
};
