/* global ERR_NOT_IN_RANGE, FIND_SOURCES, FIND_STRUCTURES, STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, RESOURCE_ENERGY */

var roleHarvester = {

	/** @param {Creep} creep **/
	run: function (creep) {

		// Wenn keine Source zugeiwesen ist, dann wird eine Source zuweisen
		if (!creep.memory.source) {
			Game.rooms[creep.memory.room].find(FIND_SOURCES).forEach(function (source) {
				var sourceCreeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.room === source.room.name && creep.memory.source === source.id);

				if ( sourceCreeps.length < source.freeSpaceCount) {
					creep.memory.source = source.id;
				}
			});
		}

		// Wenn Kapazität vorhanden, dann sammel Energie bis voll
		if (creep.carry.energy < creep.carryCapacity) {
			var source = Game.getObjectById(creep.memory.source);
			if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {
					visualizePathStyle: {
						stroke: '#ffaa00'
					}
				});
			}
		} else {
			// Sonst werde die Energie los

			// TODO

			/* Das ist schlecht ....

						var targetStructureInRange = creep.pos.findInRange(FIND_STRUCTURES, 1,
							{ filter: (structure) => {
									return (structure.structureType === STRUCTURE_EXTENSION ||
									structure.structureType === STRUCTURE_SPAWN ||
									structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
								}
							});

						var targetCreepsInRange = [];

						var targetStructure = creep.pos.findInRange(FIND_STRUCTURES , 3, {
							filter: (structure) => {
								return (structure.structureType === STRUCTURE_EXTENSION ||
								structure.structureType === STRUCTURE_SPAWN ||
								structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
							}
						});

						if (targetStructureInRange.length > 0) {
							creep.transfer(targetStructureInRange[0], RESOURCE_ENERGY);
						} else {
							var targetConstructionInRange = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 3);
							if (targetConstructionInRange.length > 0) {
								console.log('asd');
							}
						}

						// Default: Controler

						if (targets.length > 0) {
							if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
								creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
							}
						}

						*/

		}
	}
};

module.exports = roleHarvester;
