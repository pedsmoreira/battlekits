// @flow

import { File } from 'battlecry';

export default class CombinedReducers {
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  addReducer(name: string) {
    this.addImport(name);
    this.addExport(name);
  }

  addImport(name: string) {
    this.file
      .last('import ')
      .after("import __naMe__ from './modules/__naMe__';")
      .name(name);
  }

  addExport(name: string) {
    this.file
      .find('combineReducers({')
      .after('  __naMe__,')
      .name(name);
  }
}
