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

    this.file
      .find('// Actions')
      .after(`const __NA_ME__ = '${prefix}/__NA-ME__';`)
      .name(action);
  }

  addActionToSwitch(action: string) {
    this.file
      .find('switch (action.type) {')
      .after(['  case __NA_ME__:', '  // Perform action', '  return state;'])
      .name(action)
      .indent();
  }

  addActionFunction(action: string) {
    const fn = casex(`${action}_${this.file.name}`, 'naMe');

    this.file
      .find('// Action Creators')
      .after([`export function ${fn}() {`, '  return { type: __NA_ME__ };', '}', ''])
      .name(action);
  }
}
