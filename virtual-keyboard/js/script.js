/* eslint-disable import/extensions */
import { get } from './storage.js';
import Keyboard from './Keyboard.js';

const rowsOrder = [
  ['en/ru', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
  ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

const lang = get('kbLang', '"ru"');

new Keyboard(rowsOrder).init(lang).generateLayout();

const showButton = document.querySelector('.btn-toggle');
const keyboardShow = document.querySelector('.keyboard');
const changeLangButton = document.querySelector('[data-code="en/ru"]');
const changeLangButtonSub = document.querySelector('body > main > div.keyboard > div:nth-child(1) > div:nth-child(1) > div.sub');
const keyboardKeys = document.querySelectorAll('.keyboard__key[data-fn="false"]');
const capsLock = document.querySelector('[data-code="CapsLock"]');
const shiftLeft = document.querySelector('[data-code="ShiftLeft"]');
const shiftRight = document.querySelector('[data-code="ShiftRight"]');
const backspace = document.querySelector('[data-code="Backspace"]');
const enter = document.querySelector('[data-code="Enter"]');
const del = document.querySelector('[data-code="Delete"]');
const tab = document.querySelector('[data-code="Tab"]');
const ctrlLeft = document.querySelector('[data-code="ControlLeft"]');
const ctrlRight = document.querySelector('[data-code="ControlRight"]');
const altLeft = document.querySelector('[data-code="AltLeft"]');
const altRight = document.querySelector('[data-code="AltRight"]');
const win = document.querySelector('[data-code="Win"]');
const arrLeft = document.querySelector('[data-code="ArrowLeft"]');
const arrRight = document.querySelector('[data-code="ArrowRight"]');
const arrUp = document.querySelector('[data-code="ArrowUp"]');
const arrDown = document.querySelector('[data-code="ArrowDown"]');

showButton.addEventListener('click', () => {
  keyboardShow.classList.toggle('keyboard--hidden');
});

if (lang === 'ru') changeLangButtonSub.innerText = 'ru';
if (lang === 'en') changeLangButtonSub.innerText = 'en';

if (changeLangButtonSub.innerText === 'ru') {
  keyboardKeys.forEach((item) => {
    item.addEventListener('click', () => {
      const audioRu = document.querySelector('.audioRu');
      if (!audioRu) return;
      audioRu.currentTime = 0;
      audioRu.play();
    });
  });
}

if (changeLangButtonSub.innerText === 'en') {
  keyboardKeys.forEach((item) => {
    item.addEventListener('click', () => {
      const audioEn = document.querySelector('.audioEn');
      if (!audioEn) return;
      audioEn.currentTime = 0;
      audioEn.play();
    });
  });
}

changeLangButton.addEventListener('click', () => {
  const audioEnRu = document.querySelector('.audioEnRu');
  if (!audioEnRu) return;
  audioEnRu.currentTime = 0;
  audioEnRu.play();

  if (changeLangButtonSub.innerText === 'ru') {
    keyboardKeys.forEach((item) => {
      item.addEventListener('click', () => {
        const audioRu = document.querySelector('.audioRu');
        if (!audioRu) return;
        audioRu.currentTime = 0;
        audioRu.play();
      });
    });
  }

  if (changeLangButtonSub.innerText === 'en') {
    keyboardKeys.forEach((item) => {
      item.addEventListener('click', () => {
        const audioEn = document.querySelector('.audioEn');
        if (!audioEn) return;
        audioEn.currentTime = 0;
        audioEn.play();
      });
    });
  }
});

capsLock.addEventListener('click', () => {
  const audioCaps = document.querySelector('.audioCaps');
  if (!audioCaps) return;
  audioCaps.currentTime = 0;
  audioCaps.play();
});

shiftLeft.addEventListener('click', () => {
  const audioShiftLeft = document.querySelector('.audioShiftLeft');
  if (!audioShiftLeft) return;
  audioShiftLeft.currentTime = 0;
  audioShiftLeft.play();
});

shiftRight.addEventListener('click', () => {
  const audioShiftRight = document.querySelector('.audioShiftRight');
  if (!audioShiftRight) return;
  audioShiftRight.currentTime = 0;
  audioShiftRight.play();
});

backspace.addEventListener('click', () => {
  const audioBack = document.querySelector('.audioBack');
  if (!audioBack) return;
  audioBack.currentTime = 0;
  audioBack.play();
});

enter.addEventListener('click', () => {
  const audioEnter = document.querySelector('.audioEnter');
  if (!audioEnter) return;
  audioEnter.currentTime = 0;
  audioEnter.play();
});

del.addEventListener('click', () => {
  const audioDel = document.querySelector('.audioDel');
  if (!audioDel) return;
  audioDel.currentTime = 0;
  audioDel.play();
});

tab.addEventListener('click', () => {
  const audioTab = document.querySelector('.audioTab');
  if (!audioTab) return;
  audioTab.currentTime = 0;
  audioTab.play();
});

ctrlLeft.addEventListener('click', () => {
  const audioCtrlLeft = document.querySelector('.audioCtrlLeft');
  if (!audioCtrlLeft) return;
  audioCtrlLeft.currentTime = 0;
  audioCtrlLeft.play();
});

ctrlRight.addEventListener('click', () => {
  const audioCtrlRight = document.querySelector('.audioCtrlRight');
  if (!audioCtrlRight) return;
  audioCtrlRight.currentTime = 0;
  audioCtrlRight.play();
});

altLeft.addEventListener('click', () => {
  const audioAltLeft = document.querySelector('.audioAltLeft');
  if (!audioAltLeft) return;
  audioAltLeft.currentTime = 0;
  audioAltLeft.play();
});

altRight.addEventListener('click', () => {
  const audioAltRight = document.querySelector('.audioAltRight');
  if (!audioAltRight) return;
  audioAltRight.currentTime = 0;
  audioAltRight.play();
});

win.addEventListener('click', () => {
  const audioWin = document.querySelector('.audioWin');
  if (!audioWin) return;
  audioWin.currentTime = 0;
  audioWin.play();
});

arrLeft.addEventListener('click', () => {
  const audioArrows = document.querySelector('.audioArrows');
  if (!audioArrows) return;
  audioArrows.currentTime = 0;
  audioArrows.play();
});

arrRight.addEventListener('click', () => {
  const audioArrows = document.querySelector('.audioArrows');
  if (!audioArrows) return;
  audioArrows.currentTime = 0;
  audioArrows.play();
});

arrUp.addEventListener('click', () => {
  const audioArrows = document.querySelector('.audioArrows');
  if (!audioArrows) return;
  audioArrows.currentTime = 0;
  audioArrows.play();
});

arrDown.addEventListener('click', () => {
  const audioArrows = document.querySelector('.audioArrows');
  if (!audioArrows) return;
  audioArrows.currentTime = 0;
  audioArrows.play();
});
