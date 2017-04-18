const bcrypt = require('bcrypt');

// bcrypt.hash('vanpho93', 10, (err, encrypted) => {
//     if (err) return console.log(err);
//     console.log(encrypted);
// });

bcrypt.compare('vanpho93', 'MSqUxT2wwBY7pq11abbgp3rEodZDD6NxezFQiIDThNyhi4X4RRYi', (err, same) => {
    console.log(err);
    console.log(same);
    if (same) return console.log('DUNG');
    console.log('SAI');
});
//m25-898-722
