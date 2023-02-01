const { Agent } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const agentsData = await Agent.findAll();

    const agents = agentsData.map((post) => post.get({ plain:true}))

    res.status(200).render("agents", {agents});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
