// Global referrences
const socket = io();
let players = {};

const movement = {
  up: false,
  down: false,
  left: false,
  right: false
}