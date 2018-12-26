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
    if (!this.file.exists) this.removeInitialMarkers();
  }

  addImport(name: string) {
    this.file
      .consecutive("from './modules/")
      .add(collection => collection.last.after("import __naMe__ from './modules/__naMe__';").name(name))
      .sort();
  }

  addToCombine(name: string) {
    this.file
      .find('combineReducers({')
      .untilEnclosing.dive()
      .add(collection =>
        collection.last
          .after('__naMe__')
          .name(name)
          .indent()
      )
      .sort()
      .rightPad(',')
      .last.rightUnpad(',');
  }

  removeInitialMarkers() {
    this.file.all('// Marker -').remove();
  }
}
