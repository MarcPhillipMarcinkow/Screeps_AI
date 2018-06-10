var memoryCreeps = {

//    Memory.creeps.harvester.harcesterXY
     /** @param {Memory} Memory **/
     resetCreepMemory: function(Memory) {
        for(var creepName in Memory.creeps) {
            if(!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
                console.log('Clearing non-existing creep memory:', name);
            }
        }   
    } 
};

module.exports = memoryCreeps;