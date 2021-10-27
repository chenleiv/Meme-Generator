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
  };
}

function openEditor(imgId) {
  console.log(imgId);
  gMeme.selectedImgId = imgId;
  renderImg();
  document.querySelector('.main-gallery').classList.add('hide');
  document.querySelector('.editor').classList.remove('hide');
}
