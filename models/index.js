const Agent = require("./Agent");
const User = require("./User");
const Property = require("./Property");
const Review = require("./Review");


Agent.hasMany(User, {
    foreignKey: 'agent_id',
    onDelete: 'CASCADE',
});

Agent.hasMany(Property, {
    foreignKey: 'agent_id',
    onDelete: 'CASCADE',
});

User.belongsTo(Agent, {
    foreignKey: 'agent_id',
    onDelete: 'CASCADE',
});

Property.belongsTo(Agent, {
    foreignKey: 'agent_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});



module.exports = {Agent, User, Property, Review}