'use strict';

function onInit() {
  console.log("i'm ready");
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  gCtx.fillStyle = 'white';
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);

  renderImg();
}

function renderImg(url) {
  var img = new Image();
  img.src = `./img/${gMeme.selectedImgId}.jpg`; // url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(gMeme.lines[0].txt, gMeme.lines[0].pos.x, gMeme.lines[0].pos.y, 0);
    drawText(gMeme.lines[1].txt, gMeme.lines[1].pos.x, gMeme.lines[1].pos.y, 1);
    drawText(gMeme.lines[2].txt, gMeme.lines[2].pos.x, gMeme.lines[2].pos.y, 2);
  };
}

function openEditor(imgId) {
  console.log(imgId);
  gMeme.selectedImgId = imgId;
  // addListeners();
  onPageToggle();
  renderImg();
}

function onPageToggle(page) {
  const elCanvas = document.querySelector('.editor');
  const elGallery = document.querySelector('.main-gallery');
  if (page) {
    switch (page) {
      case 'gallery':
        elCanvas.classList.add('hide');
        elGallery.classList.remove('hide');
        break;
      case 'editor':
        elGallery.classList.add('hide');
        elCanvas.classList.remove('hide');
        break;
    }
  } else {
    elCanvas.classList.toggle('hide');
    elGallery.classList.toggle('hide');
  }
}

// function addListeners() {
//   addMouseListeners();
//   addTouchListeners();
//   window.addEventListener('resize', () => {});
// }

// function addMouseListeners() {
//   gElCanvas.addEventListener('mousemove', onMove);
//   gElCanvas.addEventListener('mousedown', onDown);
//   gElCanvas.addEventListener('mouseup', onUp);
// }

// function addTouchListeners() {
//   gElCanvas.addEventListener('touchmove', onMove);
//   gElCanvas.addEventListener('touchstart', onDown);
//   gElCanvas.addEventListener('touchend', onUp);
// }

// function onDown(ev) {
//   const pos = getEvPos(ev);
//   if (!isLineClicked(pos)) return;
//   setlineDrag(true);
//   gStartPos = pos;
//   document.body.style.cursor = 'grabbing';
// }

// function onMove(ev) {
//   const line = getCurrline();
//   if (line.isDrag) {
//     const pos = getEvPos(ev);
//     const dx = pos.x - gStartPos.x;
//     const dy = pos.y - gStartPos.y;
//     gStartPos = pos;
//     moveline(dx, dy);
//     renderCanvas();
//   }
// }

// function onUp() {
//   setlineDrag(false);
//   document.body.style.cursor = 'grab';
// }

// function resizeCanvas() {
//   const elContainer = document.querySelector('.canvas-container');
//   gElCanvas.width = elContainer.offsetWidth;
//   gElCanvas.height = elContainer.offsetHeight;
// }

// function getEvPos(ev) {
//   var pos = {
//     x: ev.offsetX,
//     y: ev.offsetY,
//   };
//   if (gTouchEvs.includes(ev.type)) {
//     ev.preventDefault();
//     ev = ev.changedTouches[0];
//     pos = {
//       x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//       y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//     };
//   }
//   return pos;
// }
