require('./prototype.creep');
require('./prototype.room');
require('./prototype.source');
require('./prototype.spawn');
require('./prototype.tower');

module.exports.loop = function () {
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	// for each creeps
	for (let name in Game.creeps) {
		// run creep logic
		Game.creeps[name].runRole();
	}

	// find all towers
	var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
	// for each tower
	for (let tower of towers) {
		// run tower logic
		tower.defend();
	}

	// for each spawn
	for (let spawnName in Game.spawns) {
		// run spawn logic
		Game.spawns[spawnName].spawnCreeps();
	}
};
console.log('asd');
