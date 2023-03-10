const redis = require("redis");
const Redis = require("ioredis");
const {redis_endpoint} = require("./config/redisconfig");
const mysql = require("mysql");
const db = require("./config/database");

Initializer = function (){
    console.log("Initializing Application...")
    this.redisClient = redis.createClient(redis_endpoint);
    this.redisClient.on('connect', function() {
        console.log('Connected Redis!');
    });
    this.redisClient.on("error", function (err) {
        console.log("Error while connecting to Redis" + err);
    });
    this.con = mysql.createConnection({
        //console.log("Connection to DB");
        host: db.host,
        user: db.username,
        password: db.password,
        port: "3306",
        database: db.database
    });
    this.con.connect(function(err) {
        console.log("Connected to RDS!");
        conn = initializer.getSQLConn()
        conn.query('SELECT * FROM conversation_table', function(err, result) {
            if(err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
            
        });
    });
    console.log("Application Initialized Successfully...")
}
Initializer.prototype.getPubSubClient = function (){
    return new Redis(redis_endpoint);
}
Initializer.prototype.getRedisClient= function (){
    return this.redisClient
}
Initializer.prototype.getSQLConn = function (){
    return this.con;
}
initializer = new Initializer()
exports.initializer = initializer