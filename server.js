const express = require("express");
const app = express();
//() is used to initialise app
const server = require("http").Server(app);
// const io = require("socket.io")(server); //socket.io import for server
const next = require("next");
const dev = process.env.NODE_ENV !== "production"; //check the implementation docs on nextjs website to know more
const nextApp = next({ dev }); //nextApp will tell next if the app is in development or production mode
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./utilsServer/connectDb");
const PORT = process.env.PORT || 3000; //when the app will be deployed to Heroku, Heroku auto adds the port in env variables

connectDb();
app.use(express.json()); //bodyparser- used basically for getting req.body in a good format
//In next js, server an app both run on the same port, i.e. port 3000
// we don't need two separate ports for frontend and backend

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/posts", require("./api/posts"));
  app.use("/api/notifications", require("./api/notifications"));

  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});
//we're calling app.all because all pages in next.js are SSR(Server Side Rendered)
//if we don't type app.all, the files inside the pages folder won't work
