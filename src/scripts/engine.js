const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        btnPlay: document.querySelector(".play-again"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifes: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;


    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        message();
        playAgain();
    }
}

function message() {
    Swal.fire({
        title: 'Game Over!',
        text: 'A sua pontuação total foi de: '+state.values.result +' pontos.',
        imageUrl: './src/images/ralph.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Imagem do Ralph',
      })
}

function playAgain() {
    state.view.btnPlay.style.display = "block";
    state.view.btnPlay.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload();
    });
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition && state.values.currentTime > 0 && state.values.lifes > 0) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            } else {
                state.values.lifes--;
                state.view.life.textContent = state.values.lifes;
                playSound("mixkit-game-show-wrong-answer-buzz-950.wav");
                if (state.values.lifes <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    state.values.lifes = 0;
                    state.view.life.textContent = 0;
                    message();
                    playAgain();
                }
            }
        })
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();