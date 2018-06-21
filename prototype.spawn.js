var config = require('./config');

StructureSpawn.prototype.spawnCreeps =
	function () {
		if (config.SPAWN_AKTIV) {
			var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester' && creep.memory.room === this.room.name);
			var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.memory.room === this.room.name);
			var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.room === this.room.name);

			var newName = '';

			// console.log('Harvesters: ' + harvesters.length)

			// TODO: Prüfen auf genug Energie

			if (this.isActive && !this.spawning) {

				// Harvester
				if (harvesters.length < this.room.workForHarvesterCount) {
					// Memory Zähler initialisieren
					if (!this.memory.harvesterCounter) {
						this.memory.harvesterCounter = 1;
					}
					newName = 'Harvester' + this.memory.harvesterCounter++;
					console.log('Spawning new harvester: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'harvester',
							source: null,
							target: null,
							room: this.room.name
						}
					});
				}

				// Upgrader
				if (upgraders.length < this.room.workForUpgraderCount) {
					// Memory Zähler initialisieren
					if (!this.memory.upgraderCounter) {
						this.memory.upgraderCounter = 1;
					}
					newName = 'Upgrader' + this.memory.upgraderCounter++;
					console.log('Spawning new upgrader: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'upgrader',
							source: null,
							target: null,
							room: this.room.name
						}
					});
				}

				// Builder
				if (builders.length < this.room.workForBuilderCount) {
					// Memory Zähler initialisieren
					if (!this.memory.builderCounter) {
						this.memory.builderCounter = 1;
					}
					newName = 'Builder' + this.memory.builderCounter++;
					console.log('Spawning new builder: ' + newName);
					this.spawnCreep([WORK, CARRY, MOVE], newName, {
						memory: {
							role: 'builder',
							source: null,
							target: null,
							room: this.room.name
						}
					});
				}
			}
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

};
