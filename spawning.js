/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn');
 * mod.thing == 'a thing'; // true
 */
// Configs
var cfg = require('configuration');
var counter = 0;


/** @param {StructureSpawn} spawn 
 *  Spawns a tier 1 harvester
 * **/
function spawnHarvester(spawn) {

    // Creating Harvester
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == cfg.ROLE_HARVESTER);
    if((harvesters.length < cfg.NUMBER_OF_HARVESTER_PER_RESSOURCESPOT)) {
        var newName = cfg.ROLE_HARVESTER_T1 + Game.time;
        
        if (Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: cfg.ROLE_HARVESTER}}) == 0) {
                Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: cfg.ROLE_HARVESTER}})
                      //  sourceRoom = creep.room.name
                console.log('Spawning new harvester: ' + newName + ' in Spawn: '+ spawn.name);
        } else {
            if (cfg.LOGGING_SPAWNING) {
                console.log('Not enough Ressources for spawning harvester');
            }
        }
    }
}

/** @param {StructureSpawn} spawn
 * Spawns a Tier1 Builder
 **/
function spawnBuilder(spawn) {

    // Creating Builder
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == cfg.ROLE_BUILDER);
    if((builder.length < cfg.NUMBER_OF_BUILDER_PER_MAP)) {
        var newName = cfg.ROLE_BUILDER_T1 + Game.time;

        if (Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: cfg.ROLE_BUILDER}}) == 0) {
            console.log('Spawning new Builder: ' + newName + ' in Spawn: '+ spawn);
            Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: cfg.ROLE_BUILDER}});
        } else {
            if (cfg.LOGGING_SPAWNING) {
                console.log('Not enough Ressources for spawning Builder');
            }
        }
    }
}

/** @param {StructureSpawn} spawn 
 * Spawns a Tier1 Upgrader 
 **/
function spawnUpgrader(spawn) {

    // Creating Upgrader
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == cfg.ROLE_UPGRADER);
    if((upgrader.length < cfg.NUMBER_OF_UPGRADER_PER_MAP)) {
        var newName = cfg.ROLE_UPGRADER_T1 + Game.time;
        if (Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: cfg.ROLE_UPGRADER}}) == 0) {
            console.log('Spawning new Upgrader: ' + newName + ' in Spawn: '+ spawn);
            Game.spawns[spawn.name].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: cfg.ROLE_UPGRADER}});
            Memory.creeps.harvesters.add(newName);
        } else {
            if (cfg.LOGGING_SPAWNING) {
                console.log('Not enough Ressources for spawning Upgrader');
            }
        }
    }
}


var spawning = {

    /** @param {StructureSpawn} spawn 
     * Priority List of Spawning Creeps
     **/
    spawnCreeps: function(spawn) {
        if (spawn.spawning == null) {
            // Priorize Spawning
            switch (counter) {
                case 0:
                    spawnHarvester(spawn);
                    counter = 1;
                    break;
                case 1:
                    spawnBuilder(spawn);
                    counter = 2;
                    break;
                case 2:
                    spawnUpgrader(spawn);
                    break;
            }
        
            if(Game.spawns[spawn.name].spawning) { 
                var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                Game.spawns['Spawn1'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1, 
                    Game.spawns['Spawn1'].pos.y, 
                    {align: 'left', opacity: 0.8});
            }
        } else {
            if (cfg.LOGGING_SPAWNING) {
                console.log('spawn is currently active');
            }
        }
    }
};

module.exports = spawning;

