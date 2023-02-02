const { Agent } = require("../models");

const router = require("express").Router();

//get the main homepage 
router.get("/", async (req, res) => {
  try {
    const agentsData = await Agent.findAll();

    const agents = agentsData.map((post) => post.get({ plain:true}))

    res.status(200).render("homepage", {agents});
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

module.exports = router;
