// Configs
var cfg = require('configuration');

// roles
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder= require('role.builder');

// memory objects
var memoryCreeps = require('memory.creeps');

// spawning
var spawning = require('spawning');

// utils
var structureUtils = require('structureUtils');

// util variables
var counter = 0;

module.exports.loop = function () {

    // Resetting memory
    memoryCreeps.resetCreepMemory(Memory);

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');


    // Logging Statistics:
    if (cfg.LOGGING_STATISTICS) {
    //  console.log('Number of Creeps:' +Game.creeps.size());
    //  console.log('Number of Spawns:' +Game.spawns.size());
    }

    // Priority switch for main logic
    for (var gameRoom in Game.rooms) {
        switch(counter) {

            // Spawning
            case 0: 
                if (cfg.LOGGING_MAINLOGIC) {
                    console.log('Case 0 : Spawning Creep');
                }
                var spawnStructures = structureUtils.getSpecificStructures(STRUCTURE_SPAWN,gameRoom);

                for (var i = 0; i < spawnStructures.length; i++) {
                    if (cfg.LOGGING_MAINLOGIC) {  
                        console.log('Spawning Creep in Spawn: '+spawnStructures[i]);
                    }
                   
                    spawning.spawnCreeps(spawnStructures[i]);
                }
                counter = 1;
                break;
        
            // Creep Movements
            case 1:
                if (cfg.LOGGING_MAINLOGIC == 'true') {
                    console.log('Case 1 : Trigger Creep Movements');
                }
                for(var name in Game.creeps) {
                    var creep = Game.creeps[name];
                    if(creep.memory.role == cfg.ROLE_HARVESTER) {
                        roleHarvester.run(creep);
                    }
                    if(creep.memory.role == cfg.ROLE_BUILDER) {
                        roleUpgrader.run(creep);
                    }
                    if(creep.memory.role == cfg.ROLE_UPGRADER) {
                        roleBuilder.run(creep);
                    }
                }
                counter++;
            case 2:
                if (cfg.LOGGING_MAINLOGIC == 'true') {
                    //console.log('Case 2 : Spawning Creep'); //TODO
                }
                // TODO:
                counter = 0;
                break;
            
        };
    };
}