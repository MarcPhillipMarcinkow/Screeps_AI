var config = require('./config');

StructureSpawn.prototype.spawnCreeps =
	function () {
		if (config.SPAWN_AKTIV) {
			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
			var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
			var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

			var newName = '';

			// console.log('Harvesters: ' + harvesters.length)

			// TODO: Prüfen auf genug Energie

			if (this.isActive) {
				if (harvesters.length < 1) {
					newName = 'Harvester' + Game.time;
					console.log('Spawning new harvester: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'harvester',
							source: undefined,
							room: this.room.name
						}
					});
				}

				if (upgraders.length < 0) {
					newName = 'Upgrader' + Game.time;
					console.log('Spawning new upgrader: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'upgrader'
						}
					});
				}

				if (builders.length < 0) {
					newName = 'Builder' + Game.time;
					console.log('Spawning new builder: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'builder'
						}
					});
				}

				if (this.spawning) {
					var spawningCreep = Game.creeps[this.spawning.name];
					this.room.visual.text(
						'🛠️' + spawningCreep.memory.role,
						this.pos.x + 1,
						this.pos.y, {
							align: 'left',
							opacity: 0.8
						});
				}
			}

		}
};
