/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structureUtils');
 * mod.thing == 'a thing'; // true
 */

/** @param {String} structureName 
 *  @param {String} Roomname
 *  
 *  Get a all structures of a specific type from a specific room
 * **/
exports.getSpecificStructures = function(structureName, roomName) {
    return Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == structureName});
}

