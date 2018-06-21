Object.defineProperty(Room.prototype, 'workForHarvesterCount', {
	get: function () {
		var x = 0;
		this.find(FIND_SOURCES).forEach(function (source) {
			x += source.freeSpaceCount;
		});
		return x;
	}
});

Object.defineProperty(Room.prototype, 'workForBuilderCount', {
	get: function () {
		// TODO: Dynamisch machen
		var x = 1;
		return x;
	}
});

Object.defineProperty(Room.prototype, 'workForUpgraderCount', {
	get: function () {
		// TODO: Dynamisch machen
		var x = 1;
		return x;
	}
});
