'use strict';

var gImgs;
var gMemes = [];
var gCurrId;
var gCurrMeme;
var gMeme;
var gIdx = 1;
var gElCanvas;
var gCtx;

var gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['null'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['null'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['null'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['null'],
  },
];

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'text here',
      size: 40,
      align: 'left',
      color: 'black',
      pos: { x: 130, y: 50 },
    },
    {
      txt: 'text here',
      size: 40,
      align: 'left',
      color: 'black',
      pos: { x: 140, y: 350 },
    },
  ],
};

function drawText(text, x, y, idx) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = 'white';
  gCtx.font = `${gMeme.lines[idx].size}px impact`;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function getText(input) {
  gMeme.lines[gMeme.selectedLineIdx].txt = input.value;
  renderImg();
}

function changeFontSize(ev, val) {
  ev.preventDefault();
  if (gMeme.lines[gMeme.selectedLineIdx].size >= 60 && val > 0) return;
  else if (gMeme.lines[gMeme.selectedLineIdx].size <= 20 && val < 0) return;
  gMeme.lines[gMeme.selectedLineIdx].size += val;
  renderImg();
}

function changePos(ev, val) {
  ev.preventDefault();
  gMeme.lines[gMeme.selectedLineIdx].pos.y += val;
  renderImg();
}

function changeLine(ev) {
  ev.preventDefault();
  if (gMeme.selectedLineIdx === 0) {
    document.querySelector('.meme-text').value = '';
    gMeme.selectedLineIdx = 1;
  } else gMeme.selectedLineIdx = 0;
  document.querySelector('.meme-text').value = '';
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
  elLink.download = 'my-drow';
}
