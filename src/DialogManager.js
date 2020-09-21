'use strict';

const Dialog = require('./Dialog');

/**
 * Keeps track of all the individual dialogs in the game
 */
class DialogManager {
  constructor() {
    this.dialogs = new Map();
  }

  /**
   * @param {string} entityRef
   * @return {Dialog}
   */
  getDialog(entityRef) {
    return this.dialogs.get(entityRef);
  }

  /**
   * @param {Dialog} dialog
   */
  addDialog(dialog) {
    this.dialogs.set(dialog.entityReference, dialog);
  }

  /**
   * @param {Dialog} dialog
   */
  removeDialog(dialog) {
    this.dialogs.delete(dialog.entityReference);
  }
}

module.exports = DialogManager;
