const { deserializeUser } = require("passport");
const { checkAuthenticated, checkNotAuthenticated } = require("../helpers");
const { Agent, User, Property, Review } = require("../models");

const router = require("express").Router();

//get the main homepage
router.get("/", async (req, res) => {
  try {
    const agentsData = await Agent.findAll({
      attributes: { exclude: ["bio"] },
    });

    const agents = agentsData.map((post) => post.get({ plain: true }));

    res.status(200).render("homepage", {
      agents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders the login page the login route is called
router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders registration page
router.get("/register", async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders reviews page
router.get("/reviews", async (req, res) => {
  console.log(req);
  try {
    res.status(200).render("reviews");
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders agents page
router.get("/agents", async (req, res) => {
  try {
    const agentsData = await Agent.findAll();

    const agents = agentsData.map((post) => post.get({ plain: true }));

    res.status(200).render("agents", {
      agents,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders reviews page
router.get("/reviews", async (req, res) => {
  try {
    res.status(200).render("reviews");
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders properties page
router.get("/properties", async (req, res) => {
  try {
    const propertiesData = await Property.findAll({
      include: [{ model: Agent, as: "agent" }],
    });

    const properties = propertiesData.map((post) => post.get({ plain: true }));

    res.status(200).render("properties", {
      properties,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviewsData = await Review.findAll();

    const reviews = reviewsData.map((post) => post.get({ plain: true }));

    res.status(200).render("reviews", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
