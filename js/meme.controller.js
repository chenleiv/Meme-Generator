'use strict';

function onInit() {
  console.log("i'm ready");
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  gCtx.fillStyle = 'white';
  gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
  doTrans();
  addListeners();
  renderGallery();
  renderMeme();
  renderKeyWords();
}

//

function onToggleMenu() {
  document.body.classList.toggle('menu-open');
}

function renderKeyWords() {
  var keywords = getKeyWords();
  var strHtml = ` <ul class="clean-list flex space-between">`;
  keywords.forEach((word) => {
    strHtml += `<li onclick="onSetFilter('${word}')">${word}</li>`;
  });
  strHtml += `</ul>`;
  document.querySelector('.keywords').innerHTML = strHtml;
}

function onSetFilter(filterBy) {
  console.log('filterBy', filterBy);
  setFilter(filterBy);
  renderGallery();
}

function renderGallery() {
  let strHtml = '';
  var imgs = getImgsForDisplay();
  console.log('imgs', imgs);
  strHtml += imgs
    .map(
      (img) =>
        `<img data-id=${img.id} src='${img.url}' onclick="openEditor(dataset.id)">`
    )
    .join('');
  document.querySelector('.galley-grid').innerHTML = strHtml;
  console.log('gImgs', gImgs);
}

function renderMeme() {
  var img = new Image();
  img.src = `./img/${gMeme.selectedImgId}.png`; // url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    renderTxt();
  };
}

function renderTxt() {
  gMeme.lines.forEach((line, idx) => {
    drawText(line);
  });
}

// function drawImg(id) {

function openEditor(imgId) {
  console.log(imgId);
  gMeme.selectedImgId = imgId;
  onPageToggle();
  renderMeme();
}

function onPageToggle(page) {
  const elCanvas = document.querySelector('.editor');
  const elGallery = document.querySelector('.gallery-container');
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
  editText('color', value);
  console.log(value);
  renderMeme();
}

// function onChangeFont() {}

function onRemoveText() {
  getTExtRemove();
  renderMeme();
  document.querySelector('.meme-text').value = '';
}
function onSetLang(lang) {
  setLang(lang);
  var elBody = document.querySelector('body');
  if (lang === 'he') {
    elBody.classList.add('rtl');
  } else {
    elBody.classList.remove('rtl');
  }
  doTrans();
  renderGallery();
}
