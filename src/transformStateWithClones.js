'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *git
 * @return {Object[]}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function transformStateWithClones(state, actions, logger = console.warn) {
  let stateCopy = deepClone(state);
  const stateHistory = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case 'clear':
        stateCopy = {}; // Reset stateCopy to an empty object
        break;
      default:
        logger(`Unknown action type: ${obj.type}`);
        break;
    }

    stateHistory.push(deepClone(stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
