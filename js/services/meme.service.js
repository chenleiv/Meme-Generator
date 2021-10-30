'use strict';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gIsMouseDown;
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
      color: 'white',
      align: 'black',
      font: 'impact',
      pos: { x: 130, y: 50 },
      isDrag: true,
    },
    {
      txt: '',
      size: 40,
      color: 'white',
      align: 'black',
      font: 'impact',
      pos: { x: 140, y: 350 },
      isDrag: true,
    },
    {
      txt: '',
      size: 40,
      color: 'white',
      align: 'black',
      font: 'impact',
      pos: { x: 140, y: 150 },
      isDrag: true,
    },
  ],
};

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function getCanvasPos() {
  var pos = { x: gElCanvas.width, y: gElCanvas.height };
  return pos;
}
//  LINE TEXT //

function drawText() {
  var meme = getLine();
  gCtx.lineWidth = 2;
  meme.lines.forEach((curr) => {
    gCtx.strokeStyle = curr.strokeColor;
    gCtx.fillStyle = curr.color;
    gCtx.textAlign = curr.align;
    gCtx.font = `${curr.size}px ${curr.font}`;
    gCtx.fillText(curr.txt.toUpperCase(), curr.pos.x, curr.pos.y);
    gCtx.strokeText(curr.txt.toUpperCase(), curr.pos.x, curr.pos.y);
  });
}

function getText(input) {
  renderMeme();
  return (gMeme.lines[gMeme.selectedLineIdx].txt = input);
}

function getLine() {
  return gMeme;
}

function getTExtRemove() {}

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

function editText(key, value) {
  if (gMeme.lines.length === 0) return;
  const lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx][key] = value;
}

function setLineColor(color) {
  if (gMeme.selectedLineIdx === null) return;
  let line = getLine();
  line.color = color;
  renderMeme();
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
  const { pos } = gMeme;
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  console.log(gMeme);
  return distance <= gMeme.size;
}

function setLineDrag(isDrag) {
  gMeme.isDrag = isDrag;
}

function moveLine(dx, dy) {
  gMeme.pos.x += dx;
  gMeme.pos.y += dy;
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
  if (!isLineClicked(pos)) return;
  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  const line = getLine();
  if (line.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    gStartPos = pos;
    moveLine(dx, dy);
    renderMeme();
  }
}

function onUp() {
  setLineDrag(false);
  document.body.style.cursor = 'grab';
}

function onResizeCanvas() {
  var elContainer = document.querySelector('.canvas');
  // Note: changing the canvas dimension this way clears the canvas
  gElCanvas.width = elContainer.offsetWidth - 20;
  // Unless needed, better keep height fixed.
  //   gCanvas.height = elContainer.offsetHeight
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
