'use strict';

var gCurrLang = 'en';

var gTrans = {
  edit: {
    en: 'Editor',
    he: 'עורך',
  },
  galerry: {
    en: 'Gallery',
    he: 'גלריה',
  },

  'hello-title': {
    en: 'Select a meme you would like to edit',
    he: 'בחר/י את התמונה שתרצה לערוך',
  },
  lang: {
    en: 'עברית',
    he: 'English',
  },
  'text-title': {
    en: 'Write your text here',
    he: 'להכניס את הטקסט כאן',
  },
  'download-title': {
    en: 'Download',
    he: 'להורדה',
  },
  'font-title': {
    en: 'Select a font:',
    he: 'בחר פונט:',
  },
};

console.log('gTrans', gTrans);
function getLang() {
  console.log('gCurrLang', gCurrLang);
  return gCurrLang;
}

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) keyTrans.en;
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach((el) => {
    var elTrans = el.dataset.trans;
    if (el.nodeName === 'INPUT') {
      el.placeholder = getTrans(elTrans);
    } else {
      el.innerText = getTrans(elTrans);
    }
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function onSetLang(lang) {
  setLang(lang);
  doTrans();
  renderGallery();
}
