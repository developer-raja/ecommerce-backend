const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Actual routes goes here
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Get route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete route
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

//Export
module.exports = router;
