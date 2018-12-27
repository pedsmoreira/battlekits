import { Generator, command, description, File, memoize } from 'battlecry';
import Duck from './classes/Duck';
import CombinedReducers from './classes/CombinedReducers';

const CONFIG_FILE = 'configureStore.js';
const REDUX_PATH = 'src/redux';

export default class DuckGenerator extends Generator {
  @memoize
  get duckFile() {
    return this.template('_*').existing(`${REDUX_PATH}/modules/`, this.args.name);
  }

  @memoize
  get configFile() {
    return this.template(CONFIG_FILE).existing(`${REDUX_PATH}/`);
  }

  get actions() {
    const actions: any = this.args.actions || ['set'];
    return actions.reverse();
  }

  @command({ args: 'name ...actions?', description: 'Create or modify duck to add actions' })
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

    new CombinedReducers(this.configFile).addReducer(this.args.name);
    this.configFile.save();
  }
}
