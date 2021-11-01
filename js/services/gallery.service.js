'use strict';

var gImgs;
var gKeyWords = [
  'funny',
  'cartoons',
  'animals',
  'politics',
  'men',
  'women',
  'movies',
];

var gImgs = [
  { id: 1, url: 'img/1.png', keywords: ['animals'] },
  { id: 2, url: 'img/2.png', keywords: ['funny', 'cartoons'] },
  { id: 3, url: 'img/3.png', keywords: ['movies', 'men'] },
  { id: 4, url: 'img/4.png', keywords: ['movies', 'men'] },
  { id: 5, url: 'img/5.png', keywords: ['men'] },
  { id: 6, url: 'img/6.png', keywords: ['animals'] },
  { id: 7, url: 'img/7.png', keywords: ['animals'] },
  { id: 8, url: 'img/8.png', keywords: ['politics'] },
  { id: 9, url: 'img/9.png', keywords: ['movies'] },
  { id: 10, url: 'img/10.png', keywords: ['animals'] },
  { id: 11, url: 'img/11.png', keywords: ['animals'] },
  { id: 12, url: 'img/12.png', keywords: ['funny'] },
  { id: 13, url: 'img/13.png', keywords: ['funny'] },
  { id: 14, url: 'img/14.png', keywords: ['funny'] },
  { id: 15, url: 'img/15.png', keywords: ['politics'] },
  { id: 16, url: 'img/16.png', keywords: ['sad'] },
  { id: 17, url: 'img/17.png', keywords: ['cartoons', 'men'] },
  { id: 18, url: 'img/18.png', keywords: ['men'] },
  { id: 19, url: 'img/19.png', keywords: ['funny', 'women'] },
];

function getImg() {
  return gImgs;
}

function getKeyWords() {
  return gKeyWords;
}
