'use strict';

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('img/png');

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(
      '.user-msg'
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`;

    document.querySelector('.share-container').innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`;
  }
  doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl);

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

// SERVICE//

// function isLineClicked(clickedPos) {
//   const { pos } = gMeme;
//   const distance = Math.sqrt(
//     (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
//   );
//   return distance <= gMeme.size;
// }

// function setlineDrag(isDrag) {
//   gMeme.isDrag = isDrag;
// }
// function moveline(dx, dy) {
//   gMeme.pos.x += dx;
//   gMeme.pos.y += dy;
// }

// CONTROLLER //
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