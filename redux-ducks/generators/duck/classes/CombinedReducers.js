// @flow

import { File } from 'battlecry';

export default class CombinedReducers {
  file: File;

  constructor(file: File) {
    this.file = file;
  }

  addReducer(name: string) {
    this.addImport(name);
    this.addToCombine(name);
  }

  addImport(name: string) {
    this.file
      .last('import ')
      .after("import __naMe__ from './modules/__naMe__';")
      .name(name);
  }

  addToCombine(name: string) {
    const previous = this.file.find('combineReducers({').enclosing.previous;

    previous
      .after('__naMe__')
      .indent()
      .name(name);

    if (previous.text.endsWith('//')) previous.remove();
    else previous.rightPad(',');
  }
}
