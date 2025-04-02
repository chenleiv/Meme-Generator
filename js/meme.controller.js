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

// render//
function renderKeyWords() {
  var keywords = getKeyWords();
  var strHtml = ` <div class="keywords">`;
  keywords.forEach((word) => {
    strHtml += `<span onclick="onSetFilter('${word}')">${word}</span>`;
  });
  strHtml += `</div>`;
  document.querySelector('.keywords').innerHTML = strHtml;
}

function renderGallery() {
  let strHtml = '';
  var imgs = getImgsForDisplay();

  strHtml += imgs
    .map(
      (img) =>
        `<img data-id=${img.id} src='${img.url}' onclick="openEditor(dataset.id)">`
    )
    .join('');
  document.querySelector('.galley-grid').innerHTML = strHtml;
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

function openEditor(imgId) {
  gMeme.selectedImgId = imgId;
  onPageToggle();
  renderMeme();
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open');
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

// filter//
function onSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.filter-input');
  const searchValue = searchInput.value.trim();
  onSetFilter(searchValue);
}

function onSetFilter(filterBy) {
  console.log('filterBy', filterBy);
  setFilter(filterBy);
  renderGallery();
  
  // Update selected state of keywords
  const keywords = document.querySelectorAll('.keywords span');
  keywords.forEach(keyword => {
    if (keyword.textContent === filterBy) {
      keyword.classList.add('selected');
    } else {
      keyword.classList.remove('selected');
    }
  });
}

function onChangeFont(font) {
  gMeme.lines[gMeme.gSelectedLineIdx].font = font;
}
function onChangeFillColor(value) {
  editText('color', value);

  renderMeme();
}

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

//drag line//
function onDown(ev) {
  const pos = getEvPos(ev);

  gIsDrag = true;

  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  // const line = getLine();
  if (gIsDrag) {
    const pos = getEvPos(ev);
    // console.log('ev', ev);
    // const dx = pos.x - gStartPos.x;
    // const dy = pos.y - gStartPos.y;
    // console.log('x', pos.x);
    gStartPos = pos;
    moveLine(pos);
    renderMeme();
  }
}

function onUp() {
  gIsDrag = false;
  // setLineDrag(false);
  document.body.style.cursor = 'grab';
}
