// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  let w; // = width / 3;
  let h; // = height / 3;
  var x = window.matchMedia("(min-width: 1025px)")

  let vvv=300;
  let vvw=300;

  function myFunction(x) {
    if (x.matches) { // If media query matches
      // document.body.style.backgroundColor = "yellow";
  
    } else {
    //  document.body.style.backgroundColor = "pink";
    vvv=800;
    vvw=800;
    }
  }
  
  // var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  // x.addListener(myFunction) 
  
  let ai = 'X';
  let human = 'O';
  let currentPlayer = human;
  
  function setup() {
    createCanvas(vvv, vvw);
    w = width / 3;
    h = height / 3;
  
    let random1 = Math.floor(Math.random()*3);
    let random2 = Math.floor(Math.random()*3);
    board[random1][random2] = ai;
    // bestMove();
  }
  
  function equals3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  function checkWinner() {
    let winner = null;
  
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function mousePressed() {
    if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        bestMove();
      }
    }
  }
  function draw() {
    background(137, 245, 218);
    strokeWeight(5);
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spot = board[i][j];
        textSize(32);
        let r = w / 4;
        if (spot == human) {
          noFill();
          ellipse(x, y, r * 2);
        } else if (spot == ai) {
          line(x - r, y - r, x + r, y + r);
          line(x + r, y - r, x - r, y + r);
        }
      }
    }
  
    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html(`<h4 class='result'>Tie!
        <br/>
        <button id='refresh' class='btn btn-outline-primary' onClick="window.location.reload();">Refresh Page</button>
        </h4>`);
      } else {
        resultP.html(`<div class='result' >${result} says : I know I'm ultra smart, what about you?</div>
        <p id='ps'>Just kidding Lol. Stay Home and try again <3 
          <br/>
          <button id='refresh' class='btn btn-outline-primary' onClick="window.location.reload();">Refresh Page</button>
         </p>
        `);
      }
    }
  }

  // function myFunction(x) {
  //   if (x.matches) { // If media query matches
  //     vvv=600;
  //     vvw=600;
  //   }
  // }
  
