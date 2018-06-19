var config = require('./config');

var roles = {
	builder: require('role.builder'),
	harvester: require('role.harvester'),
	upgrader: require('role.upgrader')
};

Creep.prototype.runRole =
	function () {
		roles[this.memory.role].run(this);
};

// https://docs.screeps.com/contributed/modifying-prototypes.html#Creep-prototype-isFull-are-your-carry-parts-full
Object.defineProperty(Creep.prototype, 'isFull', {
	get: function () {
		if (!this._isFull) {
			this._isFull = _.sum(this.carry) === this.carryCapacity;
		}
		return this._isFull;
	},
	enumerable: false,
	configurable: true
});
