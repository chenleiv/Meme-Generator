'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

var gMeme;
var gIdx = 1;
var gElCanvas;
var gCtx;
var gCurrMeme;
var gIsDrag = false;
var gStartPos;
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
      // isDrag: false,
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
    // isDrag: false,
  };
}

function getImgsForDisplay() {
  console.log('hiiii');
  console.log('gFilterBy', gFilterBy);
  gFilteredImgs = gImgs.filter((img) => {
    if (img.keywords.some((w) => w === gFilterBy)) return img;
  });
  console.log('gFilteredImgs', gFilteredImgs);
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
  // getImgsForDisplay();
}

function getCanvasPos() {
  var pos = { x: gElCanvas.width, y: gElCanvas.height };
  return pos;
}
//  LINE TEXT //

function drawText(line) {
  console.log(line);
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
  if (gMeme.lines.length > 2) return;
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
  console.log(gMeme.lines[lineIdx][key], 'before');
  gMeme.lines[lineIdx][key] = value;
  console.log(gMeme.lines[lineIdx][key], 'after');
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

// DOWNLOAD//

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  console.log('data', data);
  elLink.href = data;
  elLink.download = 'my-drow';
}

// DRAG EV //
function isLineClicked(clickedPos) {
  console.log('clickedPos', clickedPos);
  // const { pos } = gMeme;
  var line = getLine();
  console.log(line);
  if (line) {
    console.log('pos', pos);
    console.log(gMeme);
    console.log(clickedPos.y - line.pos.y <= line.size);
    return clickedPos.y - line.pos.y <= line.size;
  }
}

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

function moveLine({ x, y }) {
  console.log('pos');
  console.log('x', y);
  console.log('y', x);
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

function onDown(ev) {
  const pos = getEvPos(ev);
  // if (!isLineClicked(pos)) return;
  gIsDrag = true;
  console.log('gIsDrag', gIsDrag);
  // setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  // const line = getLine();
  console.log('down');
  if (gIsDrag) {
    const pos = getEvPos(ev);
    // console.log('ev', ev);
    // const dx = pos.x - gStartPos.x;
    // const dy = pos.y - gStartPos.y;
    // console.log('x', pos.x);
    gStartPos = pos;
    console.log('gStartPos', gStartPos);
    moveLine(pos);
    renderMeme();
  }
}

function onUp() {
  console.log('up');
  gIsDrag = false;

  // setLineDrag(false);
  document.body.style.cursor = 'grab';
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
