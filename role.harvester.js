/* global ERR_NOT_IN_RANGE, FIND_SOURCES, FIND_STRUCTURES, STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, RESOURCE_ENERGY */

var roleHarvester = {

	/** @param {Creep} creep **/
	run: function (creep) {
		// Wenn keine Source zugeiwesen ist, dann wird eine Source zuweisen
		if (!creep.memory.source) {
			// creep.memory.sourceId = helper.getHarvesterSource()
			console.log('asd');
			creep.memory.source = 'asd';
		}

		// Wenn Kapazität vorhanden, dann sammel Energie bis voll
		if (creep.carry.energy < creep.carryCapacity) {
			var source = Game.getObjectById(creep.memory.sourceId);
			if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {
					visualizePathStyle: {
						stroke: '#ffaa00'
					}
				});
			}
		} else {
			// Sonst werde die Energie los
			// #1 Strukturen in der nähe
			// #2 Bauplätze in der nähe
			// ist doof // #3 Creeps in der nähe
			// #4 Strukturen
			// #5 controller
			// ist doof // #6 drop

			/*
			   var targetStructureInRange = creep.room.findInRange(FIND_STRUCTURES, 1 {
			     filter: (structure) => {
			       return (structure.structureType === STRUCTURE_EXTENSION ||
			         structure.structureType === STRUCTURE_SPAWN ||
			         structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity
			     }
			   })
			   if (targetStructureInRange.length > 0) {
			     creep.transfer(targetStructureInRange[0], RESOURCE_ENERGY)
			   } else {
			     var targetConstructionInRange = creep.room.findInRange(FIND_CONSTRUCTION_SITES, 3)
			     if (targetConstructionInRange.length > 0) {
			       console.log("asd")
			     }
			   }

			   var targetCreepsInRange = []

			   var targetStructure = creep.room.find(FIND_STRUCTURES {
			     filter: (structure) => {
			       return (structure.structureType === STRUCTURE_EXTENSION ||
			         structure.structureType === STRUCTURE_SPAWN ||
			         structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity
			     }
			   })

			   //Default: Controler

			   var targets = targetStructureInRange.concat(targetConstructionInRange).concat(targetCreepsInRange).concat(targetStructure)

			   if (targets.length > 0) {
			     if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
			       creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
			     }
			   }
			 }
  }
}

*/

		}
	}
};

module.exports = roleHarvester;
