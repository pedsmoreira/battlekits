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
    this.file.afterLast('import ', "import __naMe__ from './modules/__naMe__'", name);
  }

  addExport(name: string) {
    this.file.after('combineReducers({', '  __naMe__,', name);
  }
}
