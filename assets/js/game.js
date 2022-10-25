'use strict'

$.getJSON("./assets/data/cardsJSON.json", function (cardsData) {
  const cardsArray = cardsData;

  let firstGuess = ''
  let secondGuess = ''
  let count = 0
  let matches = 0
  let previousTarget = null

  const game = document.getElementById('game')
  const grid = document.createElement('section')
  grid.setAttribute('class', 'grid')
  game.appendChild(grid)

  const match = function match() {
    const selected = document.querySelectorAll('.selected')
    selected.forEach(function (card) {
      card.classList.add('match')
      card.classList.remove('selected')
    })
    resetGuesses()
  }

  const removeSelected = function removeSelected() {
    const selected = document.querySelectorAll('.selected')
    selected.forEach(function (card) {
      card.classList.remove('selected')
    })
    resetGuesses()
  }

  const resetGuesses = function resetGuesses() {
    firstGuess = ''
    secondGuess = ''
    count = 0
    previousTarget = null
  }

  grid.addEventListener('click', function (event) {
    const clicked = event.target


    if (clicked.nodeName === 'SECTION' || clicked.parentNode.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return
    }

    if (count < 2) {
      count++

      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name

        clicked.parentNode.classList.add('selected')
      } else {
        secondGuess = clicked.parentNode.dataset.name

        clicked.parentNode.classList.add('selected')
        jogadas++
        changeJogadas()
      }

      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          match()
          matches++
        } else {
          setTimeout(removeSelected, delayByLevel[level])
        }

        let gameCardCount = document.querySelectorAll('.game-card').length;
        let gameCardMatched = document.querySelectorAll('.match').length;

        if (gameCardCount === gameCardMatched) {
          checkEndGame()
        }
      }
      previousTarget = clicked
    }
  })

  const startGame = function startGame() {
    const gameSection = document.querySelector('#js-game-section')
    gameSection.classList.add('hidden')
    gameSection.classList.add('active')
    const shuffledArray = cardsArray.sort(() => 0.5 - Math.random())
    const selectedArray = shuffledArray.slice(0, cardsByLevel[level])

    const gameGrid = selectedArray.concat(selectedArray).sort(function () {
      return 0.5 - Math.random()
    })

    grid.innerHTML = ''
    gameGrid.forEach(function (item) {
      const name = item.name
      const img = item.img

      const card = document.createElement('div')
      card.classList.add('game-card')
      card.dataset.name = name

      const front = document.createElement('div')
      front.classList.add('front')

      const back = document.createElement('div')
      back.classList.add('back')
      back.style.backgroundImage = 'url(' + img + ')'

      grid.appendChild(card)
      card.appendChild(front)
      card.appendChild(back)
    })
  }

  /*
  * End Game
  */
  // TODO: Adicionar lógico de fim de jogo (animação)
  const endGame = function endGam() {
    const finalJogadas = document.getElementById('finalJogadas')
    finalJogadas.innerHTML = jogadas
    const finalTempo = document.getElementById('finalTempo')
    finalTempo.innerHTML = minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) +
      ':' +
      second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

    clearTimeout(interval)

    //Timeout de 1segundo, após jogo terminado, para demonstrar div 'popup'
    setTimeout(() => { 
      showModal();
     }, "1000")
  }

  const checkEndGame = function checkEndGame() {
    const numberPlays = cardsByLevel[level]
    if (numberPlays === matches) {
      endGame()
    }
  }

  const getTwoRandomJobs = () => {
    const popupJobImg = document.querySelectorAll('.js-popup-job')

    popupJobImg.forEach(
      img => {
        const randomImg = cardsArray[Math.floor(Math.random() * cardsArray.length)].img
        img.src = `${randomImg.split('.png')[0]}_border.png`
      }
    )
  }

  /*
  * Reset
  */
  const resetButton = document.getElementById('reset')
  resetButton.addEventListener('click', function () {
    gameSetup()
  })

  /*
  * Difficulty
  */
  let level = 'easy'
  const cardsByLevel = {
    easy: 3,
    medium: 6,
    hard: 9
  }
  const delayByLevel = {
    easy: 1200,
    medium: 800,
    hard: 600
  }

  const difficulty = document.getElementById('difficulty')
  difficulty.addEventListener('click', function (event) {
    const clicked = event.target

    if (clicked.id === 'easy' || clicked.id === 'medium' || clicked.id === 'hard') {
      level = clicked.id

      const game = document.querySelector('#game')
      game.classList.add('game-running')
      game.classList.remove('game-hidden')

      const trackers = document.querySelector('#trackers')
      trackers.classList.remove('trackers-hidden')

      const difficulty = document.querySelector('#difficulty')
      difficulty.classList.add('difficulty-hidden')

      const gameGrid = document.querySelector('#jogo .grid')
      gameGrid.classList.remove('easy', 'medium', 'hard')
      gameGrid.classList.add(level)

      gameSetup()
    }
  })

  /*
  * Timer
  */
  const timer = document.getElementById('timer')
  let second = 0
  let minute = 0
  let interval

  const startTimer = function startTimer() {
    if (!interval) {
      interval = setInterval(function () {
        second++
        timer.innerHTML = minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) +
          ':' +
          second.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

        if (second === 60) {
          minute++
          second = 0
        }
        if (minute === 60) {
          minute = 0
        }
      }, 1000)
    }
  }

  const resetTimer = function resetTimer() {
    second = 0
    minute = 0
    timer.innerHTML = '00:00'
  }

  /*
  * Jogadas
  */
  let jogadas = 0
  const jogadasElement = document.getElementById('jogadas')

  const changeJogadas = function changeJogadas() {
    jogadasElement.innerHTML = jogadas
  }

  const resetJogadas = () => {
    jogadas = 0
    jogadasElement.innerHTML = jogadas
  }

  function resetMatches() {
    matches = 0
  }

  /*
  * Modal
  */
  function showModal() {
    // Pick two job images at random
    getTwoRandomJobs()

    const modal = document.getElementById('popup_jogo')
    modal.classList.add('show')
  }

  function playAgain() {
    const modal = document.getElementById('popup_jogo')
    modal.classList.remove('show')
    const difficulty = document.querySelector('#difficulty')
    difficulty.classList.remove('difficulty-hidden')
    const game = document.querySelector('#game')
    game.classList.remove('game-running')
    game.classList.add('game-hidden')
    const trackers = document.querySelector('#trackers')
    trackers.classList.add('trackers-hidden')
    const gameSection = document.querySelector('#js-game-section')
    gameSection.classList.remove('hidden')
    gameSection.classList.remove('active')
    interval = ''
    grid.innerHTML = ''
    resetMatches()
    resetJogadas()
  }

  function gameSetup() {
    startGame()
    resetMatches()
    resetJogadas()
    resetTimer()
    startTimer()
  }

  function playAgainLevels() {
    clearTimeout(interval)
    playAgain()
  }

});