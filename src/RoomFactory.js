'use strict';

const Room = require('./Room');
const EntityFactory = require('./EntityFactory');

/**
 * Stores definitions of npcs to allow for easy creation/cloning
 * @extends EntityFactory
 */
class RoomFactory extends EntityFactory {
  /**
   * Create a new instance of a given room. Room will not be hydrated
   *
   * @param {Area}   area
   * @param {string} entityRef
   * @return {Room}
   */
  create(area, entityRef) {
    const npc = this.createByType(area, entityRef, Room);
    npc.area = area;
    return npc;
  }

  /**
   * Handle the merge of a base definition with a target 
   * definition.
   * 
   * @param {Object} def 
   * @param {Object} baseDef 
   */
  mergeDefinitions(def, baseDef) {
    const { metadata: baseMetadata } = baseDef;
    const metadata = { ...baseMetadata, ...def.metadata }
    return {...baseDef, ...def, metadata };
  }
  
}

module.exports = RoomFactory;
