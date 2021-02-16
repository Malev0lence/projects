// eslint-disable-next-line import/extensions
import create from '../utils/create.js';

export default class EmptyGem {
  constructor() {
    this.isEmpty = true;
    this.div = create('div', 'empty', null, '', ['isEmpty', `${this.isEmpty}`]);
  }
}
