'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gMemes = [];
var gCurrMeme;
var gMeme;
var gIdx = 1;
var gElCanvas;
var gCtx;

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: '',
      size: 40,
      align: 'left',
      color: 'black',
      pos: { x: 130, y: 50 },
    },
    {
      txt: '',
      size: 40,
      align: 'left',
      color: 'black',
      pos: { x: 140, y: 350 },
    },
    {
      txt: '',
      size: 40,
      align: 'left',
      color: 'black',
      pos: { x: 140, y: 150 },
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
  renderMeme();
}

function getMemeImg() {
  var img = gImgs.find((img) => img.id === gMeme.selectedImgId);
  return img;
}

function changeFontSize(ev, val) {
  ev.preventDefault();
  if (gMeme.lines[gMeme.selectedLineIdx].size >= 60 && val > 0) return;
  else if (gMeme.lines[gMeme.selectedLineIdx].size <= 20 && val < 0) return;
  gMeme.lines[gMeme.selectedLineIdx].size += val;
  renderMeme();
}

function changePosUpDown(ev, val) {
  ev.preventDefault();
  gMeme.lines[gMeme.selectedLineIdx].pos.y += val;
  renderMeme();
}
function changePosSides(ev, val) {
  ev.preventDefault();
  gMeme.lines[gMeme.selectedLineIdx].pos.x += val;
  renderMeme();
}

function changeLine(ev) {
  ev.preventDefault();
  if (gMeme.selectedLineIdx === 0) {
    gMeme.selectedLineIdx = 1;
    document.querySelector('.meme-text').value = '';
  } else if (gMeme.selectedLineIdx === 1) {
    gMeme.selectedLineIdx = 2;
    // איך אני אומרת ״אם אין 2 אז״
    document.querySelector('.meme-text').value = '';
  } else gMeme.selectedLineIdx = 0;
  document.querySelector('.meme-text').value = '';
}

function addLine() {
  if (gMeme.selectedLineIdx > 2) return;
  if (gMeme.selectedLineIdx === 0) {
    document.querySelector('.meme-text').value = '';
    gMeme.selectedLineIdx = 1;
  } else if (gMeme.selectedLineIdx === 1) {
    document.querySelector('.meme-text').value = '';
    gMeme.selectedLineIdx = 2;
  } else gMeme.selectedLineIdx = 0;
  document.querySelector('.meme-text').value = '';
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
  elLink.download = 'my-drow';
}

// function getCurrline() {
//   return gMeme;
// }

function editText(key, value) {
  if (gMeme.lines.length === 0) return;
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx][key] = value;
}

function clearLine() {
  if (gMeme.lines.length === 0) return;
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.selectedLineIdx = 0;
  gMeme.lines.splice(lineIdx, 1);
}
