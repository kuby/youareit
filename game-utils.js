const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const HALF_PLAYER_SIZE = 20;

module.exports.calculateBorders = function(player) {
  if(player.x < 0) {
    player.x = CANVAS_WIDTH - HALF_PLAYER_SIZE;
  } else if (player.x > CANVAS_WIDTH) {
    player.x = HALF_PLAYER_SIZE;
  }

  if(player.y < 0) {
    player.y = CANVAS_HEIGHT - HALF_PLAYER_SIZE;
  } else if (player.y > CANVAS_HEIGHT) {
    player.y = HALF_PLAYER_SIZE;
  }
}