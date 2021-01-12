const goBtn = document.getElementById('goBtn');
const pages = document.querySelectorAll('.pages');
const chooseDoggieBtn = document.querySelectorAll('.chooseDoggieBtn');
const scoreElement = document.getElementById('score');
const gameContainer = document.querySelector('.gameContainer');
const time = document.getElementById('time');
const annoyingMsg = document.getElementById('annoyingMsg');
let selectedDoggie = {};
let seconds = 0;
let score = 0;

goBtn.addEventListener('click', () => {
  pages[0].classList.add('up');
});

chooseDoggieBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    selectedDoggie = {
      src,
      alt,
    };

    pages[1].classList.add('up');

    setTimeout(createDoggie, 1000);
    startGame();
  });
});

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  time.innerHTML = `Time: ${m}:${s}`;

  seconds++;
}

function addDoggies() {
  setTimeout(createDoggie, 1000);
  setTimeout(createDoggie, 1500);
}

const createDoggie = () => {
  const doggie = document.createElement('div');
  const { x, y } = getRandomLocation();

  doggie.classList.add('doggie');
  doggie.style.left = `${x}px`;
  doggie.style.top = `${y}px`;

  doggie.innerHTML = `<img src="${selectedDoggie.src}" alt="${
    selectedDoggie.alt
  }" style="transform: rotate(${Math.random() * 360}deg); width:100px"/>`;

  doggie.addEventListener('click', catchDoggie);

  gameContainer.appendChild(doggie);
};

function catchDoggie() {
  increaseScore();
  this.classList.add('catched');

  setTimeout(() => {
    this.remove();
  }, 2000);

  addDoggies();
}

function increaseScore() {
  score++;

  if (score > 19) {
    annoyingMsg.classList.add('visible');
  }

  scoreElement.innerHTML = `Score: ${score}`;
}

const startGame = () => {
  setInterval(increaseTime, 1000);
};

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
}
