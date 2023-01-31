const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Agent } = require("../../models/");

router.post("/", async (req, res) => {
  // creating hashed password
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const agentData = await Agent.findAll();
    const agents = agentData.map((agent) => agent.get({ plain: true }));
    const agentNum = Math.floor(Math.random() * agents.length) + 1;

    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      is_agent: false,
      email: req.body.email,
      password: hashedPassword,
      agent_id: agentNum,
    });

    res.status(200).render('agents');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
