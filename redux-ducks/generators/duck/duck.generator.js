// @flow

import { Generator, File, memoize } from 'battlecry';
import Duck from './classes/Duck';
import CombinedReducers from './classes/CombinedReducers';

const CONFIG_FILE = 'configureStore.js';
const REDUX_PATH = 'src/redux';

export default class DuckGenerator extends Generator {
  config = {
    generate: {
      args: 'name ...actions?',
      description: 'Create or modify duck to add actions'
    }
  };

  get nameArg(): any {
    return this.args.name; // Avoid flow issues
  }

  @memoize
  get duckFile() {
    return this.template('_*').existing(`${REDUX_PATH}/modules/`, this.nameArg);
  }

  @memoize
  get configFile() {
    return this.template(CONFIG_FILE).existing(`${REDUX_PATH}/`);
  }

  get actions() {
    const actions: any = this.args.actions || ['set'];
    return actions.reverse();
  }

  generate() {
    this.addDuckToConfig();
    this.addActionsToDuck();
  }

  addActionsToDuck() {
    new Duck(this.duckFile).addActions(this.actions);
    this.duckFile.save();
  }

  addDuckToConfig() {
    if (this.duckFile.exists) return;

    new CombinedReducers(this.configFile).addReducer(this.nameArg);
    this.configFile.save();
  }
}
