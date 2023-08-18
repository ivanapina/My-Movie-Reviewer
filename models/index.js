const User = require('./User');
const Movies = require('./Movies');
const Reviews = require('./Reviews');

Movies.hasMany(Reviews, {
  foreignKey: 'movies_id',
});

Reviews.belongsTo(Movies, {
  foreignKey: 'movies_id',
});

User.hasMany(Reviews, {
    foreignKey: 'user_id',
  });

Reviews.belongsTo(Movies, {
  foreignKey: 'movies_id',
});

module.exports = { User, Movies, Reviews };
