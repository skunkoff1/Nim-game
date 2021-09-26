// VARIABLES CONTENU

let gameContainer = document.getElementById("game-container")
let scene = document.createElement("div");
let plateau = document.createElement("div");
let player1 = document.createElement("p");
let player2 = document.createElement("p");
let computerTurn = document.createElement("div");
let computerMess = document.createElement("p");
let speed = 5;
let animTimer;

// VARIABLES BOUTONS

let p1retirer1 = document.createElement("button");
let p1retirer2 = document.createElement("button");
let p1retirer3 = document.createElement("button");
let p2retirer1 = document.createElement("button");
let p2retirer2 = document.createElement("button");
let p2retirer3 = document.createElement("button");
let switchComputerPlayer = document.createElement("button");
let restart = document.createElement("button");

//VARIABLES POUR LE JEU

let batonnets = [];
let slots = [];
let currentBat = 0;
let computer = false;
let computerChoice = 0;
let currentStep = 1;
let winner1 = false;

/*=====================================================================*/
/*====================  FONCTION CREATION JEU  ========================*/
/*=====================================================================*/

let initGame2P = function() {

    // CREATION DES SLOTS

    for (let i = 0; i < 20; i++) {

        slots[i] = document.createElement("div");
        slots[i].className = "slots";
        slots[i].style.width = "2%";
        slots[i].style.left = 1.5 + i * 5 + "%";
        plateau.appendChild(slots[i]);
    }

    for (let i = 0; i < 20; i++) {

        batonnets[i] = document.createElement("div");
        batonnets[i].className = "batonnets";
        batonnets[i].style.width = "2%";
        batonnets[i].style.left = 1.5 + i * 5 + "%";
        plateau.appendChild(batonnets[i]);
    }

    winner1 = false;

    // STYLE OF ELEMENTS

    scene.className = "scene";
    plateau.className = "plateau";
    computerTurn.className = "computerTurn";

    player1.innerHTML = "Joueur 1";
    player1.className = "player";
    player1.style.top = "0";
    player2.innerHTML = "Joueur 2";
    player2.className = "player";
    player2.style.bottom = "0";

    p1retirer1.innerHTML = "1";
    p1retirer2.innerHTML = "2";
    p1retirer3.innerHTML = "3";
    p2retirer1.innerHTML = "1";
    p2retirer2.innerHTML = "2";
    p2retirer3.innerHTML = "3";
    restart.innerHTML = "Rejouer";
    switchComputerPlayer.innerHTML = "Jouer contre l'ordinateur";

    p1retirer1.className = "rmvButton";
    p1retirer2.className = "rmvButton";
    p1retirer3.className = "rmvButton";
    p2retirer1.className = "rmvButton";
    p2retirer2.className = "rmvButton";
    p2retirer3.className = "rmvButton";
    switchComputerPlayer.className = "switch";
    restart.className = "restartButton";

    // AJOUTER ELEMENTS A HTML

    gameContainer.appendChild(scene);
    scene.appendChild(player1);
    player1.appendChild(p1retirer1);
    player1.appendChild(p1retirer2);
    player1.appendChild(p1retirer3);
    scene.appendChild(plateau);
    plateau.appendChild(restart);
    scene.appendChild(player2);
    player2.appendChild(p2retirer1);
    player2.appendChild(p2retirer2);
    player2.appendChild(p2retirer3);
    scene.appendChild(switchComputerPlayer);
    scene.appendChild(computerTurn);
    computerTurn.appendChild(computerMess);

    //MASQUER BOUTON RESTART
    restart.style.display = "none";

    //AFFICHER MODE
    computer = false;
    switchComputerPlayer.style.display = "block";
    switchComputerPlayer.style.left = "43.5%";

    //COMPTEUR JEU
    currentBat = 19;

    //MASQUER BOUTON JOUEUR 2
    rmvButtonP2();
};

let initGameComp = function() {

    // CREATION DES SLOTS

    for (let i = 0; i < 20; i++) {

        slots[i] = document.createElement("div");
        slots[i].className = "slots";
        slots[i].style.width = "2%";
        slots[i].style.left = 1.5 + i * 5 + "%";
        plateau.appendChild(slots[i]);
    }

    for (let i = 0; i < 20; i++) {

        batonnets[i] = document.createElement("div");
        batonnets[i].className = "batonnets";
        batonnets[i].style.width = "2%";
        batonnets[i].style.left = 1.5 + i * 5 + "%";
        plateau.appendChild(batonnets[i]);
    }

    winner1 = false;

    // STYLE OF ELEMENTS

    scene.className = "scene";
    plateau.className = "plateau";
    computerTurn.className = "computerTurn";

    player1.innerHTML = "Joueur 1";
    player1.className = "player";
    player1.style.top = "0";
    player2.innerHTML = "Ordinateur";
    player2.className = "player";
    player2.style.bottom = "0";

    p1retirer1.innerHTML = "1";
    p1retirer2.innerHTML = "2";
    p1retirer3.innerHTML = "3";
    p2retirer1.innerHTML = "1";
    p2retirer2.innerHTML = "2";
    p2retirer3.innerHTML = "3";
    restart.innerHTML = "Rejouer";
    switchComputerPlayer.innerHTML = "Mode 2 joueur";

    p1retirer1.className = "rmvButton";
    p1retirer2.className = "rmvButton";
    p1retirer3.className = "rmvButton";
    p2retirer1.className = "rmvButton";
    p2retirer2.className = "rmvButton";
    p2retirer3.className = "rmvButton";
    switchComputerPlayer.className = "switch";
    restart.className = "restartButton";

    // AJOUTER ELEMENTS A HTML

    gameContainer.appendChild(scene);
    scene.appendChild(player1);
    player1.appendChild(p1retirer1);
    player1.appendChild(p1retirer2);
    player1.appendChild(p1retirer3);
    scene.appendChild(plateau);
    plateau.appendChild(restart);
    scene.appendChild(player2);
    player2.appendChild(p2retirer1);
    player2.appendChild(p2retirer2);
    player2.appendChild(p2retirer3);
    scene.appendChild(switchComputerPlayer);
    scene.appendChild(computerTurn);

    //MASQUER BOUTON RESTART
    restart.style.display = "none";

    //AFFICHER MODE
    computer = true;
    switchComputerPlayer.style.display = "block";

    //COMPTEUR JEU
    currentBat = 19;

    //MASQUER BOUTON JOUEUR 2
    rmvButtonP2();
};

/*=====================================================================*/
/*====================  FONCTION MOUVEMENT JEU  =======================*/
/*=====================================================================*/

let goUp = function(number) {
    let batNum = batonnets[number];
    let top = 25;
    let initAnimUp = function() {
        let pas = -1;
        batNum.style.top = top + pas + "%";
        top += pas;

        if (top <= -30) {
            clearTimeout(animTimerU);
        }
    };
    let animTimerU = setInterval(initAnimUp, speed);
};

let goDn = function(number) {
    let batNum = batonnets[number];
    let top = 25;
    let initAnimUp = function() {
        let pas = 1;
        batNum.style.top = top + pas + "%";
        top += pas;

        if (top >= 80) {
            clearTimeout(animTimerD);
        }
    };
    let animTimerD = setInterval(initAnimUp, speed);
};

/*=====================================================================*/
/*================  FONCTION AFFICHER/CACHER BOUTON  ==================*/
/*=====================================================================*/

//FONCTION AFFICHER

let addButtonP1 = function() {

    if (currentBat > 2) {
        p1retirer3.style.display = "inline-block";
    }
    if (currentBat > 1) {
        p1retirer2.style.display = "inline-block";
    }
    if (currentBat > 0) {
        p1retirer1.style.display = "inline-block";
    }
};

let addButtonP2 = function() {

    if (currentBat > 0) {
        p2retirer1.style.display = "inline-block";
    }
    if (currentBat > 1) {
        p2retirer2.style.display = "inline-block";
    }
    if (currentBat > 2) {
        p2retirer3.style.display = "inline-block";
    }
};

//FONCTION CACHER

let rmvButtonP1 = function() {
    p1retirer1.style.display = "none";
    p1retirer2.style.display = "none";
    p1retirer3.style.display = "none";
    switchComputerPlayer.style.display = "none";
};

let rmvButtonP2 = function() {
    p2retirer1.style.display = "none";
    p2retirer2.style.display = "none";
    p2retirer3.style.display = "none";
};

/*=====================================================================*/
/*=====================  FONCTION ACTION JOUEUR  ======================*/
/*=====================================================================*/

let P1play = function(number) {
    rmvButtonP1();

    if (computer == false) {
        for (let i = 1; i <= number; i++) {
            goUp(currentBat);
            currentBat--;
        }
        if (currentBat === 0) {
            computerMess.innerHTML = "Le joueur 1 a gagné";
            winner1 = true;
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else {
            addButtonP2();
        }
    } else {
        for (let i = 1; i <= number; i++) {
            goUp(currentBat);
            currentBat--;
        }
        if (currentBat === 0) {
            computerMess.innerHTML = "Le joueur 1 a gagné";
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else {
            P2play();
        }
    }
    currentStep++;
};

let P2play = function(number) {
    rmvButtonP2();

    if (computer == false) {
        for (let i = 1; i <= number; i++) {
            goDn(currentBat);
            currentBat--;
        }
        if (currentBat === 0) {
            computerMess.innerHTML = "Le joueur 2 a gagné";
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else if (winner1 == true) {
            computerMess.innerHTML = "Le joueur 1 a gagné";
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else {
            addButtonP1();
        }
    } else {
        if ((currentBat + 1) % 4 == 3) {
            computerChoice = 2;
        } else if ((currentBat + 1) % 4 == 2 || (currentBat + 1) % 4 == 1) {
            computerChoice = 1;
        } else if ((currentBat + 1) % 4 == 0) {
            computerChoice = 3;
        }

        computerMess.innerHTML = "Tour " + currentStep + " : l'ordinateur a joué " + computerChoice + " bâtonnet(s)";

        for (let i = 1; i <= computerChoice; i++) {
            goDn(currentBat);
            currentBat--;
        }
        if (currentBat === 0) {
            computerMess.innerHTML = "l'ordinateur a gagné";
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else if (winner1 == true) {
            computerMess.innerHTML = "Le joueur 1 a gagné";
            computerTurn.style.color = "white";
            computerTurn.style.backgroundColor = "coral";
            restart.style.display = "block";
        } else {
            addButtonP1();
        }

    }

};

initGame2P();

// ACTION FOR LISTENERS

let p1r1 = function() { P1play(1); };
let p1r2 = function() { P1play(2); };
let p1r3 = function() { P1play(3); };
let p2r1 = function() { P2play(1); };
let p2r2 = function() { P2play(2); };
let p2r3 = function() { P2play(3); };

let switchC = function() {

    if (computer == false) {
        computer = true;
        switchComputerPlayer.innerHTML = "Mode 2 joueurs";
        switchComputerPlayer.style.left = "43.5%";
        initGameComp();
    } else {
        player2.innerHTML = "Joueur 2";
        computer = false;
        switchComputerPlayer.innerHTML = "Jouer contre l'ordinateur";
        switchComputerPlayer.style.left = "43.5%";
        initGame2P();
    }

}

let playagain = function() {

    for (let i = 0; i < 20; i++) {
        plateau.removeChild(batonnets[i]);
    }
    batonnets = [];
    initGame2P();
    addButtonP1();
    currentStep = 1;
    computerMess.innerHTML = "";
    computerTurn.style.backgroundColor = "rgb(46, 136, 58)";
}



// AJOUTER LISTENERS

p1retirer1.addEventListener("click", p1r1, false);
p1retirer2.addEventListener("click", p1r2, false);
p1retirer3.addEventListener("click", p1r3, false);
p2retirer1.addEventListener("click", p2r1, false);
p2retirer2.addEventListener("click", p2r2, false);
p2retirer3.addEventListener("click", p2r3, false);

restart.addEventListener("click", playagain, false);
switchComputerPlayer.addEventListener("click", switchC, false);