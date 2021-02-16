/* eslint-disable import/extensions */
import Game from './components/Game.js';

new Game(4).init().generateLayout();

const domFieldSize = document.querySelector('select');

domFieldSize.addEventListener('blur', () => {
  if (domFieldSize.value === '3x3') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(3, 0, 0).init().generateLayout();
  } else if (domFieldSize.value === '4x4') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(4, 0, 0).init().generateLayout();
  } else if (domFieldSize.value === '5x5') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(5, 0, 0).init().generateLayout();
  } else if (domFieldSize.value === '6x6') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(6, 0, 0).init().generateLayout();
  } else if (domFieldSize.value === '7x7') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(7, 0, 0).init().generateLayout();
  } else if (domFieldSize.value === '8x8') {
    const domMainBoard = document.querySelector('.main-board');

    domMainBoard.remove();
    new Game(8, 0, 0).init().generateLayout();
  }
});
