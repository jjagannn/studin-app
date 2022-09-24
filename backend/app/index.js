const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const mongoClient = require('./helpers/init_mongodb');
// console.log(mongoClient)
const redisClient = require('./helpers/init_redis');
console.log(redisClient)


// import * as Sentry from "@sentry/node";
// import * as Tracing from "@sentry/tracing";
// //const bodyParser = require('body-parser');

//importing routes
const v1AuthRouter = require('./v1/Routes/Auth.route');
const v1ProfileRouter = require('./v1/Routes/Profile.route');
const v1PostsRouter = require('./v1/Routes/Posts.route');
const v1ConnectionsRouter = require('./v1/Routes/Connections.route');
const v1SearchRouter = require('./v1/Routes/Search.route');
const v1RecommendationsRouter = require('./v1/Routes/Recommendation.route');
const v1LiveStreamRouter = require('./v1/Routes/Livestream.route');

//importing auth middleware to protect API routes
const { requireAuth } = require('./helpers/jwt_auth');

//express app instance
const app = express();

//Sentry portion
Sentry.init({
    dsn: "https://51acdaf504154a7d8e5d9f692eebfd4d@o1422930.ingest.sentry.io/6770144",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5,
  });
  
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  
  // All controllers should live here
//   app.get("/", function rootHandler(req, res) {
//     res.end("Hello world!");
//   });
  
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  }));
  
  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });
//end of sentry

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// //app.use(bodyParser.json())

//view engine
app.set('view engine', 'ejs');

//database connection
// //const dbURI = ''; //get from config
// //mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
// //    .then((result)=> app.listen(3000))
// //    .catch((err)=> console.log(err));

//main routes - protected with jwt middleware
app.get("/", (req, res) => { res.send("<h2>It's Working!</h2>"); }); //home test
app.use('/api/v1/auth', requireAuth, v1AuthRouter)
app.use('/api/v1/profile', requireAuth, v1ProfileRouter)
app.use('/api/v1/posts', requireAuth, v1PostsRouter)
app.use('/api/v1/connections', requireAuth, v1ConnectionsRouter)
app.use('/api/v1/search', requireAuth, v1SearchRouter)
app.use('/api/v1/recommendations', requireAuth, v1RecommendationsRouter)
app.use('/api/v1/liveStream', requireAuth, v1LiveStreamRouter)
app.get("/debug-sentry", function mainHandler(req, res) { throw new Error("My first Sentry error!"); }); //test sentry

module.exports = app;