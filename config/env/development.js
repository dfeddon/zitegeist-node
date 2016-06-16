var port = 1337;
var secondsInAMinute = 60;
var totalMinutes = 120; // 120 = 2 hours

module.exports =
{
  port: port,
  db: 'mongodb://localhost/zitegeist-dev',
  secret: 'therecanbeonly1',
  tokenTime: totalMinutes * secondsInAMinute // in seconds 120 * 60 = 2 hrs / value = total seconds
};
