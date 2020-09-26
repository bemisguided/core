

const GameEntity = require('./GameEntity');

class Dialog extends GameEntity {

  static DEFAULT_TREE = 'default';

  constructor (area, def) {
    super();
    const validate = [ 'id', 'trees' ];

    for (const prop of validate) {
      if (!(prop in def)) {
        throw new ReferenceError(`Dialog in area [${areaName}] missing required property [${prop}]`);
      }
    }

    this.areaName = area.name;
    this.id = def.id;
    this.entityReference = this.areaName + ':' + def.id;
    this.trees = new Map();
    def.trees.forEach(tree => {
      if (!tree.id) {
        throw new ReferenceError('Dialog Tree is missing a required [id] property');
      }
      if (!Array.isArray(tree.script)) {
        throw new ReferenceError('Dialog Tree is missing a required [script] array');
      }
      this.trees.set(tree.id, tree);
    });
    if (!this.trees.get(Dialog.DEFAULT_TREE)) {
      throw new ReferenceError(`Dialog requires "${Dialog.DEFAULT_TREE}" Dialog Tree`);
    }
  }

  getDialogTrees() {
    return [ ...this.trees.values() ];
  }

  getDialogTree(treeId = 'default') {
    const tree = this.trees.get(treeId);
    if (!tree) {
      throw new Error(`Dialog Tree "${treeId}" not found for Dialog [${this.id}]`);
    }
    return tree;
  }

  getDialogNode(treeId, nodeId) {
    const tree = this.getDialogTree(treeId);
    const node = tree.script.find(s => s.id === nodeId);
    if (!node) {
      throw new Error(`Dialog Node "${nodeId}" not found for Dialog Tree "${treeId}" Dialog [${this.id}]`);
    }
    if (!node.prompts) {
      node.prompts = [];
    }
    return node;
  }

}

module.exports = Dialog;
