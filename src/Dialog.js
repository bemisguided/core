

const GameEntity = require('./GameEntity');

class Dialog extends GameEntity {
  constructor (areaName, def) {
    super();
    const validate = [ 'id', 'default' ];

    for (const prop of validate) {
      if (!(prop in def)) {
        throw new ReferenceError(`Dialog in area [${areaName}] missing required property [${prop}]`);
      }
    }

    this.areaName = areaName;
    this.id = def.id;
    this.entityReference = this.areaName + ':' + def.id;
    this.dialogs = {};
    Object.entries(def).forEach(([ k, v ]) => {
      if (k === 'id') {
        return; 
      }
      this.dialogs[k] = v;
    });
  }

  getDialogTree(id = 'default') {
    const tree = this.dialogs[id];
    if (!tree) {
      throw new Error(`Dialog Tree "${id}" not found for Dialog [${this.id}]`);
    }
    // console.log(tree)
    return tree;
  }

  getDialogNode(tree, id) {
    const branch = this.getDialogTree(tree)[id];
    if (!branch) {
      throw new Error(`Dialog Node "${id}" not found for Dialog Tree "${tree}" Dialog [${this.id}]`);
    }
    if (!branch.prompts) {
      branch.prompts = [];
    }
    return branch;
  }

}

module.exports = Dialog;
