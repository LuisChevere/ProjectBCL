const sequelize = require("../config/connection");
const { Agent, User, Property, Review } = require("../models");

const agentSeedData = require("./agentSeedData.json");
const userSeedData = require("./userSeedData.json");
const propertySeedData = require("./propertySeedData.json");
const reviewSeedData = require("./reviewSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const agents = await Agent.bulkCreate(agentSeedData, {
    returning: true,
  });

  for (const user of userSeedData) {
    const newUser = await User.create({
      ...user,
      //attach a random agent to each user
      agent_id: agents[Math.floor(Math.random() * agents.length)].id,
    });
  }

  //this assigns the reviews user_id from seeds
  let index = 0;

  for (const review of reviewSeedData) {
    const userId = index == reviewSeedData.length ? null : index + 1;

    const newReview = await Review.create({
      ...review,
      //attach a random agent to each user
      user_id: userId,
    });

    index++;
  }

  for (const property of propertySeedData) {
    const newProperty = await Property.create({
      ...property,
      //attach a random agent to each property
      agent_id: agents[Math.floor(Math.random() * agents.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
