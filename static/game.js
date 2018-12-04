// On new player enters
function newPlayer() {
  socket.emit('new-player');
}

// Register all listeners to control the movement
function registerMovement() {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = true;
        break;
      case 87: // W
        movement.up = true;
        break;
      case 68: // D
        movement.right = true;
        break;
      case 83: // S
        movement.down = true;
        break;
    }
  });
  
  document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = false;
        break;
      case 87: // W
        movement.up = false;
        break;
      case 68: // D
        movement.right = false;
        break;
      case 83: // S
        movement.down = false;
        break;
    }
  });
}

function registerUpdatePlayersListener() {
  socket.on('state', function(playersObj) {
    players = playersObj;
  });
}

function renderPlayers() {
  clear();
  stroke(0);
  fill(150);
  for (var id in players) {
    ellipse(players[id].x, players[id].y, PLAYER_SIZE);
  }
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(100);

  // Register the players state update listeners, which updates the players position when changed.
  registerUpdatePlayersListener();

  // Render a new player
  newPlayer();

  // Register the movement event listeners
  registerMovement();
}

function draw() {
  // On every frame send the movement data to the socket.io
  socket.emit('movement', movement);

  // Re-draws the players
  renderPlayers();
}