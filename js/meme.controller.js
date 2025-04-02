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
  
  // Find the image in gImgs array
  const selectedImg = gImgs.find(img => img.id === gMeme.selectedImgId);
  
  if (selectedImg) {
    // Use the URL directly from the image object
    img.src = selectedImg.url;
  } else {
    // Fallback for gallery images
    img.src = `./img/${gMeme.selectedImgId}.png`;
  }
  
  img.onload = () => {
    // Clear the canvas
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    
    // Draw the image
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    
    // Render text with highlights
    renderTxt();
  };
}

function renderTxt() {
  if (!gMeme.lines) return;
  
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
  if (gIsDrag) {
    const pos = getEvPos(ev);
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

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Switch to editor view
            onPageToggle('editor');
            
            // Create a new meme with the uploaded image
            gMeme = {
                selectedImgId: null,
                selectedLineIdx: 0,
                lines: [
                    {
                        txt: 'Add text here',
                        size: 40,
                        align: 'center',
                        color: '#ffffff',
                        pos: { x: 225, y: 50 }
                    }
                ]
            };

            // Get the canvas and context
            const canvas = document.querySelector('.canvas-container canvas');
            const ctx = canvas.getContext('2d');

            // Calculate dimensions to maintain aspect ratio
            const maxWidth = 450;
            const maxHeight = 450;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Clear canvas and draw the image
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);

            // Store the image in gImgs array
            const newImg = {
                id: Date.now(),
                url: e.target.result,
                keywords: ['uploaded']
            };
            gImgs.push(newImg);
            gMeme.selectedImgId = newImg.id;

            // Render the meme with the uploaded image
            renderMeme();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function downloadImg() {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function shareImg() {
    const canvas = document.querySelector('canvas');
    const imageData = canvas.toDataURL('image/png');
    
    // Create a temporary link for sharing
    const link = document.createElement('a');
    link.href = imageData;
    
    // Check if Web Share API is available
    if (navigator.share) {
        // Convert base64 to blob
        fetch(imageData)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'my-meme.png', { type: 'image/png' });
                navigator.share({
                    title: 'My Meme',
                    text: 'Check out this meme I created!',
                    files: [file]
                }).catch(console.error);
            });
    } else {
        // Fallback for browsers that don't support Web Share API
        link.download = 'my-meme.png';
        link.click();
    }
}
