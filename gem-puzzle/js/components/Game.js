/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import create from '../utils/create.js';
import Gem from './Gem.js';
import EmptyGem from './EmptyGem.js';

let a;

const main = create('main', '', [
  create('h1', 'title', 'Gem Puzzle'),
  create('h3', 'subtitle', '<p>Made for RSSchool</p>'),
  create('div', 'controls', [
    create('button', 'btn btn-restart', 'Restart'),
    create('p', 'moves-counter'),
    create('select', 'field-size', '<option>3x3</option><option selected>4x4</option><option>5x5</option><option>6x6</option><option>7x7</option><option>8x8</option>'),
  ]),
  create('h2', 'win-title', ''),
  create('div', 'overlay', null),
]);

const audio = create('audio', 'click-sound', null, main, ['src', './assets/sounds/click.mp3'], ['muted', 'muted']);
const time = create('div', 'time', '<span class="minutes">00</span>:<span class="seconds">00</span>');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
}

export default class Game {
  constructor(fieldSize, seconds = 0, minutes = 0) {
    this.fieldSize = fieldSize;
    this.gemNumbers = [];
    this.movementStorage = [];
    this.clickCounter = 0;
    this.seconds = seconds;
    this.minutes = minutes;

    this.isPaused = false;
  }

  init() {
    document.body.prepend(main);
    document.body.prepend(audio);
    document.querySelector('.controls').prepend(time);
    clearInterval(a);

    return this;
  }

  generateLayout() {
    this.mainBoard = create('div', 'main-board', null, main, ['style', `width: ${40 * this.fieldSize + ((this.fieldSize - 1) * 5)}px; height: ${40 * this.fieldSize + ((this.fieldSize - 1) * 5)}px; grid-template-columns: repeat(${this.fieldSize}, 1fr); grid-template-rows: repeat(${this.fieldSize}, 1fr)`]);

    this.restartButton = document.querySelector('.btn-restart');
    this.movesCounter = document.querySelector('.moves-counter');

    this.restartButton.onclick = () => {
      this._clear();
      document.querySelector('.win-title').classList.remove('win-show');
      document.querySelector('.overlay').classList.remove('overlay-active');
      this.movementStorage = [];
      this.movementStorageReadable = [];

      this.gemNumbers = [];
      this.clickCounter = 0;
      this.seconds = 0;
      this.minutes = 0;
      clearInterval(a);

      this.generateLayout();
    };

    for (let i = 0; i < (this.fieldSize * this.fieldSize) - 1; i += 1) {
      this.gemNumbers.push(new Gem().div);
    }
    this.gemNumbers.push(new EmptyGem().div);

    this.gemNumbers.forEach((item, index) => {
      item.innerText = `${index + 1}`;
      this.mainBoard.appendChild(item);
    });

    // this.gemNumbers = [
    //   [this.gemNumbers[0], this.gemNumbers[1], this.gemNumbers[2], this.gemNumbers[3]],
    //   [this.gemNumbers[4], this.gemNumbers[5], this.gemNumbers[6], this.gemNumbers[7]],
    //   [this.gemNumbers[8], this.gem`Numbers[9], this.gemNumbers[10], this.gemNumbers[11]],
    //   [this.gemNumbers[12], this.gemNumbers[13], this.gemNumbers[14], this.gemNumbers[15]],
    // ];
    this._moveGem();
    this._shuffleGems();
    this.displayDate();

    this.movesCounter.innerText = `Moves: ${this.clickCounter}`;
  }

  _moveGem() {
    // развешиваем эвент лисенеры на каждую кнопку
    if (this.fieldSize === 3) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }

    if (this.fieldSize === 4) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }

    if (this.fieldSize === 5) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }

    if (this.fieldSize === 6) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }

    if (this.fieldSize === 7) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }

    if (this.fieldSize === 8) {
      this.gemNumbers.forEach((item) => {
        item.addEventListener('click', (e) => {
          // Движение влево
          if (e.target.previousSibling !== null && e.target.previousSibling.classList.value === 'empty') { // движение влево
            let targetIndex = this.gemNumbers.indexOf(e.target);
            if ((targetIndex) % this.fieldSize === 0) return;

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент

            this.gemNumbers.splice(targetIndex - 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if (this.gemNumbers.indexOf(e.target.nextSibling) % this.fieldSize !== 0 && e.target.nextSibling !== null && e.target.nextSibling.classList.value === 'empty') { // движение вправо
            let targetIndex = this.gemNumbers.indexOf(e.target); // если стоящий рядом справа элемент пустой, то вырезаем тот, на который кликнули и вставляем его вместо пустого, затем обновляем рендер поля
            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            this.gemNumbers.splice(targetIndex + 1, 0, splicedElement[0]); // вставка элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.nextSibling !== null && e.target.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling !== null) && e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex - 1, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          } else if ((e.target.previousSibling !== null && e.target.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling !== null) && e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.classList.value === 'empty') { // движение вниз
            let targetIndex = this.gemNumbers.indexOf(e.target);
            let emptyTargetIndex = this.gemNumbers.indexOf(e.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);

            let splicedElement = this.gemNumbers.splice(targetIndex, 1); // вырезанный элемент
            let emptyElement = this.gemNumbers.splice(emptyTargetIndex, 1, splicedElement[0]); // вставка элемента
            this.gemNumbers.splice(targetIndex, 0, emptyElement[0]); // вставка пустого элемента

            this.clickCounter += 1;
            this.movesCounter.innerText = `Moves: ${this.clickCounter}`;

            audio.currentTime = 0;
            audio.play().catch(() => console.log());

            this._updateBoard();
            this._isWin();
          }
        });
      });
    }
  }

  displayDate() {
    a = setInterval(() => {
      this.domSeconds = document.querySelector('.seconds');
      this.domMinutes = document.querySelector('.minutes');
      this.seconds += 1;
      this.domSeconds.innerText = String(this.seconds).padStart(2, '0');
      this.domMinutes.innerText = String(this.minutes).padStart(2, '0');

      if (this.seconds % 59 === 0) {
        this.minutes += 1;
        this.seconds = 0;
      }
    }, 1000);
  }

  _shuffleGems() {
    for (let i = 0; i < 1000; i += 1) {
      this.movementStorage.push(getRandomInt(0, this.gemNumbers.length - 1));
    }

    for (let i = 0; i < this.movementStorage.length; i += 1) {
      this.gemNumbers[this.movementStorage[i]].click();
    }
    this.clickCounter = 0;
  }

  _updateBoard() {
    this.gemNumbers.flat().forEach((item) => {
      this.mainBoard.appendChild(item);
    });
  }

  _isWin() {
    this.currentState = this.mainBoard.childNodes;
    this.subArr = [];
    this.currentState.forEach((item) => {
      this.subArr.push(parseInt(item.innerText, 10));
    });

    let winCombination = [];
    for (let i = 1; i <= this.fieldSize ** 2; i += 1) {
      winCombination.push(i);
    }

    if (this.subArr.join('') === winCombination.join('')) {
      clearInterval(a);
      return this._displayWinBoard();
    }
    return false;
  }

  _displayWinBoard() {
    this.winText = document.querySelector('.win-title');
    this.overlay = document.querySelector('.overlay');

    this.winText.innerHTML = `CONGRATULATIONS!!!<br>You win in <span class="clicks">${this.clickCounter} clicks</span>, <span class="min">${this.minutes} min</span> and <span class="sec">${this.seconds} sec</span>.`;
    this.overlay.classList.add('overlay-active');

    this.winText.classList.add('win-show');
  }

  _clear() {
    this.mainBoard = document.querySelector('.main-board');
    this.mainBoard.remove();
  }
}
