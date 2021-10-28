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
  img.src = `./img/${gMeme.selectedImgId}.png`; // url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(gMeme.lines[0].txt, gMeme.lines[0].pos.x, gMeme.lines[0].pos.y, 0);
    drawText(gMeme.lines[1].txt, gMeme.lines[1].pos.x, gMeme.lines[1].pos.y, 1);
    drawText(gMeme.lines[2].txt, gMeme.lines[2].pos.x, gMeme.lines[2].pos.y, 2);
  };
}

// function drawImg(id) {
//   var img = new Image();
//   img.src = onGetMemeUrl(id);
//   img.onload = () => {
//     gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
//     drawText();
//   };
// }

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

function onChangeFillColor(value) {
  editText('fill', value);
  renderImg();
}

function onChangeFillStroke(value) {
  editText('strokeColor', value);
  renderImg();
}
