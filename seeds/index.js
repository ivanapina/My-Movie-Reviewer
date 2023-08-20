const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedComment = require('./commentSeed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedComment();

  process.exit(0);
};

seedAll();