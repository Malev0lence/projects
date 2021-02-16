// eslint-disable-next-line import/extensions
import create from '../utils/create.js';

export default class Gem {
  constructor() {
    this.isEmpty = false;
    this.div = create('div', 'gem', null, '', ['isEmpty', `${this.isEmpty}`]);
  }
}
