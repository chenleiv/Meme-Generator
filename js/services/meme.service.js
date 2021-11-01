'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
const KEY = 'memeDB';
var gMeme;
var gIdx = 1;
var gElCanvas;
var gCtx;
var gCurrMeme;
var gIsDrag = false;
var gStartPos;
var gMemeSave = [];
var gFilteredImgs = [];
var gFilterBy = '';

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'text here',
      size: 40,
      align: 'left',
      color: 'white',
      align: 'black',
      font: 'impact',
      pos: { x: 130, y: 50 },
      isDrag: false,
    },
  ],
};

function getEmptyLine() {
  return {
    txt: '',
    size: 40,
    align: 'left',
    color: 'white',
    align: 'black',
    font: 'impact',
    pos: { x: 130, y: 50 },
    isDrag: false,
  };
}

function getImgsForDisplay() {
  gFilteredImgs = gImgs.filter((img) => {
    if (img.keywords.some((w) => w === gFilterBy)) return img;
  });

  // return gFilteredImgs;
  if (gFilteredImgs.length) return gFilteredImgs;
  return gImgs;
}

// function getImgs() {
//   console.log('gFilteredImgs', gFilteredImgs);
//   return gFilteredImgs.length ? gFilteredImgs : gImgs;
// }

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function getCanvasPos() {
  var pos = { x: gElCanvas.width, y: gElCanvas.height };
  return pos;
}

//* line text //

function drawText(line) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = 'black';
  gCtx.fillStyle = line.color;
  gCtx.font = `${line.size}px impact`;
  gCtx.fillText(line.txt, line.pos.x, line.pos.y);
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
  // drawTextBox(x - 215, y - 40, idx);
}

// function drawTextBox(x, y, idx) {
//   var isSelected = gMeme.lines[idx].isSelected;
//   gCtx.beginPath();
//   gCtx.rect(x, y, gElCanvas.width - 30, 60);
//   gCtx.lineDashOffset = 0;
//   gCtx.strokeStyle = !isSelected ? 'white' : 'purple';
//   gCtx.stroke();
// }

function getText(input) {
  renderMeme();
  return (gMeme.lines[gMeme.selectedLineIdx].txt = input);
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function getTExtRemove() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function moveTxtLine() {
  gCurrMeme.selectedLineIdx++;
  if (gCurrMeme.selectedLineIdx > gCurrMeme.lines.length - 1) {
    gCurrMeme.selectedLineIdx = 0;
  }
}

function changeLine(ev) {
  ev.preventDefault();
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
    gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx++;
  document.querySelector('.meme-text').value =
    gMeme.lines[gMeme.selectedLineIdx].txt;
}

function addLine() {
  document.querySelector('.meme-text').value = '';
  gMeme.selectedLineIdx++;
  const newLine = getEmptyLine();
  if (gMeme.lines.length === 1) newLine.pos.y = 350;
  if (gMeme.lines.length === 2) newLine.pos.y = 150;
  gMeme.lines.push(newLine);
}

function editText(key, value) {
  if (gMeme.lines.length === 0) return;
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx][key] = value;
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

//*doenload / save

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
  elLink.download = 'my-drow';
}

function loadMemes() {
  gMemesUser = loadFromStorage(KEY);
  if (!gMemesUser) {
    gMemesUser = [];
  }
}

function saveMeme() {
  loadMemes();
  var isSave = gMemeSave.find(
    (img) => img.id === gImgs[gMeme.selectedImgId].id
  );
  if (!isSave) {
    gMemesUser.push(gImgs[gMeme.selectedImgId]);
    __saveMemeToStorage();
    alert('Saved successfully');
  } else {
    alert('You already have the picture');
  }
}

function _saveMemeToStorage() {
  saveToStorage(KEY, gMemesUser);
}

//* mvoe line
// DRAG EV //
function isLineClicked(clickedPos) {
  var line = getLine();
  if (line) {
    console.log(clickedPos.y - line.pos.y <= line.size);
    return clickedPos.y - line.pos.y <= line.size;
  }
}

function moveLine({ x, y }) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = x;
  gMeme.lines[gMeme.selectedLineIdx].pos.y = y;
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    renderMeme();
  });
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

//todo:
//clickedPos.x = 130
//clickedPos.y = 100
//line.pos.x = 120
//line.pos.y = 120
// gMeme.lines.findIndex((line)=> {
// if(clickedPos.x )
// })

// function setLineDrag(isDrag) {
//   console.log('gMeme.lines', gMeme.lines[selectedLineIdx].isDrag);
//   gMeme.lines[selectedLineIdx].isDrag = isDrag;
// }
