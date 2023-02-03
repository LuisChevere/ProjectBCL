const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Agent } = require("../../models");

router.post("/register", async (req, res) => {
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

    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    const user = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ message: "You are now logged in!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const user = await userData.get({ plain: true });

    if (!user) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      req.session.invalid_creds = false;

      res.json({ message: "You are now logged in!" });
    });
  } catch {
    res.status(500).json();
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
