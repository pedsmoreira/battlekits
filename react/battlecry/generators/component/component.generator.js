import { Generator } from 'battlecry';

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

  config = {
    generate: {
      args: 'name',
      options: {
        path: {
          description: `Where the files go`,
          default: DEFAULT_PATH
        },
        tree: {
          description: `flat | folder | nested`,
          default: DEFAULT_TREE
        }
      },
      description: 'Create a new component'
    }
  };

  get folder(): string {
    return `src/components/__Na/Me__/`;
  }

  get folder() {
    const { path, tree } = this.options;

    let modifier = '';
    if (tree === 'folder') modifier = '__NaMe__/';
    else if (tree === 'nested') modifier = '__Na/Me__';

    return `${path}/${modifier}`;
  }

  generate() {
    this.templates().forEach(file => {
      if (file.name === 'index' && this.tree === 'flat') return;
      file.saveAs(this.folder, this.args.name);
    });
  }
}
