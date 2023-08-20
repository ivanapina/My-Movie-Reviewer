const User = require('./User');
const Movies = require('./Movies');
const Comment = require('./Comment');

Movies.hasMany(Comment, {
  foreignKey: 'movies_id',
});

Comment.belongsTo(Movies, {
  foreignKey: 'movies_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
  });

Comment.belongsTo(Movies, {
  foreignKey: 'movies_id',
});

module.exports = { User, Movies, Comment };
