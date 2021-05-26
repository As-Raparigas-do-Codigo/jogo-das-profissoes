'use strict';


var cardsArray = [{
  'name': 'astronauta',
  'img': 'assets/img/jobs/astronauta.png'
}, {
  'name': 'babysitter',
  'img': 'assets/img/jobs/babysitter.png'
}, {
  'name': 'bailarino',
  'img': 'assets/img/jobs/bailarino.png'
}, {
  'name': 'ceo',
  'img': 'assets/img/jobs/ceo.png'
}, {
  'name': 'enfermeiro',
  'img': 'assets/img/jobs/enfermeiro.png'
}, {
  'name': 'engenheira',
  'img': 'assets/img/jobs/engenheira.png'
}, {
  'name': 'footballer',
  'img': 'assets/img/jobs/futebolista.png'
}, {
  'name': 'piloto',
  'img': 'assets/img/jobs/piloto.png'
}, {
  'name': 'professor',
  'img': 'assets/img/jobs/professor.png'
}, {
  'name': 'veterinario',
  'img': 'assets/img/jobs/veterinario.png'
}
];

var firstGuess = '';
var secondGuess = '';
var count = 0;
var matches = 0;
var previousTarget = null;
var delay = 1200;


var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
    card.classList.remove('selected');
  });
  resetGuesses();
};

var removeSelected = function removeSelected() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
  resetGuesses();
}

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
};


grid.addEventListener('click', function (event) {
  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked.parentNode.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }


  if (count < 2) {
    count++;

    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;

      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;

      clicked.parentNode.classList.add('selected');
      jogadas++;
      changeJogadas();
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        match();
        matches++;
      } else {
        setTimeout(removeSelected, delayByLevel[level]);
      }
      checkEndGame();
    }
    previousTarget = clicked;
  }
});


var startGame = function startGame() {

  let gameSection = document.querySelector("#js-game-section");
  gameSection.classList.add("hidden");
  gameSection.classList.add("active");
  var shuffledArray = cardsArray.sort(() => 0.5 - Math.random());
  var selectedArray = shuffledArray.slice(0, cardsByLevel[level]);


  var gameGrid = selectedArray.concat(selectedArray).sort(function () {
    return 0.5 - Math.random();
  });

  grid.innerHTML = "";
  gameGrid.forEach(function (item) {
    var name = item.name;
    var img = item.img;

    var card = document.createElement('div');
    card.classList.add('game-card');
    card.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

}

/*
* End Game
*/
// TODO: Adicionar lógico de fim de jogo (animação)
var endGame = function endGame() {
  var finalJogadas = document.getElementById('finalJogadas');
  finalJogadas.innerHTML = jogadas;
  var finalTempo = document.getElementById('finalTempo');
  finalTempo.innerHTML = minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) +
    ":" +
    second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  clearTimeout(interval);
  showModal();
}

var checkEndGame = function checkEndGame() {
  var number_plays = cardsByLevel[level];
  if (number_plays === matches) {
    endGame();
  } else {
    console.log(matches + ' matches');
  }
}

/*
* Reset
*/
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
  gameSetup();
});


/*
* Difficulty
*/
var level = 'easy';
var cardsByLevel = {
  'easy': 3,
  'medium': 6,
  'hard': 9
}
var delayByLevel = {
  'easy': 1200,
  'medium': 800,
  'hard': 600
}

var difficulty = document.getElementById('difficulty');
difficulty.addEventListener('click', function (event) {
  var clicked = event.target;

  if (clicked.id === 'easy' || clicked.id === 'medium' || clicked.id === 'hard') {
    level = clicked.id

    let game = document.querySelector('#game')
    game.classList.add('game-running')
    game.classList.remove('game-hidden')

    let trackers = document.querySelector('#trackers')
    trackers.classList.remove('trackers-hidden');

    let difficulty = document.querySelector('#difficulty');
    difficulty.classList.add('difficulty-hidden');

    let gameGrid = document.querySelector('#jogo .grid')
    gameGrid.classList.remove('easy', 'medium', 'hard')
    gameGrid.classList.add(level)

    gameSetup();
  }

});


/*
* Timer
*/
var timer = document.getElementById("timer");
var second = 0, minute = 0, hour = 0;
var interval;

var startTimer = function startTimer() {
  if (!interval) {
    interval = setInterval(function () {
      second++;
      timer.innerHTML = minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) +
        ":" +
        second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);
  }

}

var resetTimer = function resetTimer() {
  second = 0;
  minute = 0;
  hour = 0;
  timer.innerHTML = "00:00";
}


/*
* Jogadas
*/
var jogadas = 0;
var jogadasElement = document.getElementById('jogadas');

var changeJogadas = function changeJogadas() {
  jogadasElement.innerHTML = jogadas;
}

var resetJogadas = () => {
  jogadas = 0;
  jogadasElement.innerHTML = jogadas;
}

function resetMatches() {
  matches = 0;
}

/*
* Modal
*/
function showModal() {
  let modal = document.getElementById("popup_jogo");
  modal.classList.add("show");
}

function playAgain() {
  let modal = document.getElementById("popup_jogo");
  modal.classList.remove("show");
  let difficulty = document.querySelector('#difficulty');
  difficulty.classList.remove('difficulty-hidden');
  let game = document.querySelector('#game');
  game.classList.remove('game-running')
  game.classList.add('game-hidden')
  let trackers = document.querySelector('#trackers')
  trackers.classList.add('trackers-hidden');
  let gameSection = document.querySelector("#js-game-section");
  gameSection.classList.remove("hidden");
  gameSection.classList.remove("active");
  interval = "";
  grid.innerHTML = "";
  resetMatches();
  resetJogadas();
  // resetTimer();
  // startTimer();

  //gameSetup();
}

function gameSetup() {
  startGame();
  resetMatches();
  resetJogadas();
  resetTimer();
  startTimer();
}

