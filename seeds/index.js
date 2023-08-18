const sequelize = require('../config/connection');
const seedMovies = require('./moviesData');
const seedReviews = require('./reviewsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedMovies();

  await seedReviews();

  process.exit(0);
};

seedAll();