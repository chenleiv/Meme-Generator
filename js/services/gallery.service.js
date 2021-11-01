'use strict';

var gImgs;
var gKeyWords = [
  'all',
  'funny',
  'movies',
  'cartoons',
  'animals',
  'TV',
  'politics',
  'men',
  'women',
];

var gImgs = [
  { id: 1, url: 'img/1.png', keywords: ['all', 'animals'] },
  { id: 2, url: 'img/2.png', keywords: ['all', 'funny', 'cartoons'] },
  { id: 3, url: 'img/3.png', keywords: ['all', 'movies', 'men'] },
  { id: 4, url: 'img/4.png', keywords: ['all', 'TV', 'men'] },
  { id: 5, url: 'img/5.png', keywords: ['all', 'men'] },
  { id: 6, url: 'img/6.png', keywords: ['all', 'men'] },
  { id: 7, url: 'img/7.png', keywords: ['all', 'men'] },
  { id: 8, url: 'img/8.png', keywords: ['all', 'funny'] },
  { id: 9, url: 'img/9.png', keywords: ['all', 'TV'] },
  { id: 10, url: 'img/10.png', keywords: ['all', 'animals'] },
  { id: 11, url: 'img/11.png', keywords: ['all', 'men', 'TV'] },
  { id: 12, url: 'img/12.png', keywords: ['all', 'funny'] },
  { id: 13, url: 'img/13.png', keywords: ['all', 'funny'] },
  { id: 14, url: 'img/14.png', keywords: ['all', 'funny'] },
  { id: 15, url: 'img/15.png', keywords: ['all', 'politics'] },
  { id: 16, url: 'img/16.png', keywords: ['all', 'sad'] },
  { id: 17, url: 'img/17.png', keywords: ['all', 'cartoons', 'men'] },
  { id: 18, url: 'img/18.png', keywords: ['all', 'men'] },
  { id: 19, url: 'img/19.png', keywords: ['all', 'funny', 'women'] },
];

function getImg() {
  return gImgs;
}

function getKeyWords() {
  return gKeyWords;
}
