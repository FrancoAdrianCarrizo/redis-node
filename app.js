const express = require("express");
const app = express();
const redis = require("redis");
const cors = require("cors");

const port = 3000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
  

app.get("/user", async(req, res) => {

    const allCacheUsers = await redisClient.keys("*");
    
    
  res.json({
    users: allCacheUsers,
  });
});

app.get("/user/:userId", async(req, res) => {
    const userId = req.params.userId;
    const cacheUser = await redisClient.get(userId)
    if( cacheUser !== null){
        res.json({
            id: userId,
            ...JSON.parse(cacheUser)
        });
        return;
    }
    res.status(404).json({
        id: userId,
        message: "User not found"
    });
  });
  

app.post("/user", (req, res) => {
  const user = req.body;

  console.log(user)

  redisClient.set(user.id, JSON.stringify(user), redis.print);
  res.json({
    message: "User created",
  })
});

app.delete("/user/:userId", async(req, res) => {

    const userId = req.params.userId;
    const cacheUser = await redisClient.get(userId)
    if( cacheUser !== null){
        redisClient.del(userId)
        res.json({
            id: userId,
            message: "User deleted"
        });
        return;
    }
    res.status(404).json({
        id: userId,
        message: "User not found"
    })
});
