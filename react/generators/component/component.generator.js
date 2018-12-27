import { Generator, command } from 'battlecry';

const DEFAULT_PATH = 'src/components';

/*
 * Using as example `AwesomeButton`, with two files:
 * flat:
 *    src/components/AwesomeButton.js
 *    src/components/AwesomeButton.test.js
 * folder:
 *    src/components/AwesomeButton/index.js
 *    src/components/AwesomeButton/AwesomeButton.js
 *    src/components/AwesomeButton/AwesomeButton.test.js
 * nested:
 *    src/components/Awesome/Button/index.js
 *    src/components/Awesome/Button/AwesomeButton.js
 *    src/components/Awesome/Button/AwesomeButton.test.js
 */
const DEFAULT_TREE = 'folder';

export default class ComponentGenerator extends Generator {
  compatibility = '1.x';

  get folder() {
    return `src/components/__Na/Me__/`;
  }

  get modifier() {
    const { tree } = this.options;

    if (tree === 'folder') return '__NaMe__/';
    else if (tree === 'nested') return '__Na/Me__/';

    return '';
  }

  get folder() {
    return `${this.options.path}/${this.modifier}`;
  }

  @command({ args: 'name', description: 'Create a new component' })
  @command.option('path', { arg: 'required', defaultArg: DEFAULT_PATH, description: 'Where the file goes' })
  @command.option('tree', { arg: 'required', defaultArg: DEFAULT_TREE, description: `flat | folder | nested` })
  generate() {
    this.templates().forEach(file => {
      if (file.name === 'index' && this.tree === 'flat') return;
      file.saveAs(this.folder, this.args.name);
    });
  }
}
