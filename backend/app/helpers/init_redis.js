// const redis = require('redis');

// let redisClient;

// (async () => {
//   redisClient = redis.createClient();

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();

// // module.exports = redisClient;

// redisClient.on('connect', () => { 
//     console.log('redisClient connected...');
// })

// redisClient.on('ready', () => { 
//     console.log('redisClient connected to redis and is ready to use...');
// })

// redisClient.on('error', (err) => {
//     console.log(err.message)
// })

// redisClient.on('end', () => {
//     console.log('redisClient disconnected from redis...')
// })

// //Terminate redis when pressing CTRL+C in terminal
// process.on('SIGINT', () => {
//     redisClient.quit()
// })

// module.exports = redisClient;


// // const redisClient = redis.createClient({
// //     port:6379, 
// //     host:"127.0.0.1"
// // })

// // (async () => {
// //   redisClient = redis.createClient();
// //   //runs on port 6379
// //   //alternate approach with options
// //   //redisClient = redis.createClient({port:6379, host:"127.0.0.1"})

// //   redisClient.on("error", (error) => console.error(`Error : ${error}`));

// //   await redisClient.connect();
// // })();

