const mineflayer = require('mineflayer');
const { Vec3 } = require('vec3');
const movement = require("mineflayer-movement");

var settings = {
    host: 'pvp.land',
    port: '25565',
    version: '1.8.9',
    username: process.env.username,
    auth: 'microsoft',
    logErrors: false
};

const bot = mineflayer.createBot(settings);

//Sleep
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
//All maps
const genesis = 85
const ogmap = 100
const kingsmap = 90
const seasons = 100
const corals = 100

//Set the current map
mapHeight = kingsmap 


bot.once('spawn', function() {
    sleep(10). then(() => {
        bot.chat('/p leave')
    })
})

bot.on("message", message => {
    console.log(message.toString())
    if (message.toString().includes("has invited you to join their party")) {
        const match = message.toString().match(/TimmythepodAlt has invited you to join their party/) ?.groups
        sleep(1000). then(() => {
            bot.chat(`/p accept timmythepod`)
        })
        sleep(1200). then(() => {
            bot.chat(`/play pit`)
        })
    }
  })



bot.loadPlugin(movement.plugin);

// Global variables
let follow = true;
let rotations = 8; // How many directions should be checked relative to the bot
let evaluation = "cheapest"; // Can also be "average" for smoother movement

/*
**  #1: Configure the heuristics that will be used
*/

let proximity = new movement.heuristics.proximity({
    weighting: 0
});
let conformity = new movement.heuristics.conformity({
    weighting: 0
});
let distance = new movement.heuristics.distance({
    weighting: 0,
    radius: 0,
    count: 0,
    sectorLength: 0
});

/*
**  #2: Specify the heuristics that the plugin should use for its functions
*/

bot.once("login", () => {
    bot.movement.loadHeuristics(proximity, conformity, distance);
});


bot.on("physicTick", () => {
    if (follow) {
        let target = bot.nearestEntity(entity => entity.username); // entities with "username" property will return true (players only!)
        if (target) {

            let yaw = bot.movement.steerAngle(target.position, rotations, evaluation);
            bot.look(yaw, bot.entity.pitch); // pitch doesn't change;
        }
    }
});





// Autoclicker

bot.on('spawn', function() {
    
    bot.loadPlugin(require('mineflayer-autoclicker'))
    bot.autoclicker.options.blacklist = []
    bot.autoclicker.options.delay = Math.floor(Math.random() * 500) + 100;
    bot.autoclicker.options.max_distance = 3.1
    bot.autoclicker.options.always_swing = true
    bot.autoclicker.stop_on_window = true
    bot.on('physicTick', globalThis.lookForward = function() {
        if (bot.entity.position.y > 45) {
            bot.autoclicker.stop();
            } else {
            bot.autoclicker.start();
    }
    })
})

var v1 = new Vec3(0, mapHeight, 0);


bot.on('forcedMove', function() { 
    bot.setControlState('forward', true)
    bot.setControlState('jump', true)
})
    



bot.on('move', globalThis.lookForward = function(y) {
    if (bot.entity.position.y > mapHeight) {
        bot.lookAt(v1)
        bot.setControlState('sprint', true)
        bot.setControlState('jump', false)
        sleep(600). then(() => {
            bot.setControlState('jump', true)
        })

            return
    } else {
    follow = !follow;
    bot.setControlState('sprint', false)
    return
       
}
})



bot.on('physicTick', lookForward)