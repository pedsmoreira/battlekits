// @flow

import { File, spaces } from 'battlecry';
import casex from 'casex';

export default class Duck {
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  addActions(actions: string[]) {
    actions.forEach(action => this.addAction(action));
  }

  addAction(action: string) {
    this.addActionConst(action);
    this.addActionToSwitch(action);
    this.addActionFunction(action);
  }

  addActionConst(action: string) {
    const prefix = casex(this.file.name, 'na-me');
    this.file.after('// Actions', `const __NA_ME__ = '${prefix}/__NA-ME__';`, action);
  }

  addActionToSwitch(action: string) {
    this.file.after(
      'switch (action.type) {',
      spaces(4, ['case __NA_ME__:', '  // Perform action', '  return state;']),
      action
    );
  }

  addActionFunction(action: string) {
    const fn = casex(`${action}_${this.file.name}`, 'naMe');

    this.file.after(
      '// Action Creators',
      [`export function ${fn}() {`, '  return { type: __NA_ME__ };', '}', ''],
      action
    );
  }
}
