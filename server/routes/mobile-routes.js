const {Router} = require("express");
const {
    authenticateToken,
    authorizeBuyer,
    authorizeSeller,
} = require("../middlewares/authentication");
const {check} = require("express-validator");
const {
    addMobile,
    searchMobiles,
    searchMobilesForSeller,
    addToCart,
    deleteFromCart,
} = require("../controllers/mobile-controllers");

const router = Router();

router
    .route("/")
    .get(searchMobiles)
    .post(
        authenticateToken,
        authorizeSeller,
        [check("name").notEmpty(), check("os").notEmpty(), check("processor").notEmpty(), check("type").notEmpty(), check("memory").notEmpty(), check("price").isNumeric()],
        addMobile
    );

router
    .route("/seller")
    .get(authenticateToken, authorizeSeller, searchMobilesForSeller);

router
    .route("/cart")
    .post(authenticateToken, authorizeBuyer, addToCart)
    .delete(authenticateToken, authorizeBuyer, deleteFromCart);

module.exports = router;
