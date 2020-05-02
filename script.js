var seats;
var ticketCount = 0;
var ticketAmount = 0;
var selectedSeats = [];
const SELECTED_SEAT_INDICES = "SELECTED_SEAT_INDICES";
const TICKET_PRICE = "TICKET_PRICE";
var selectedPrice;
function getTicketPrice() {
  ticketPrice = selectedPrice.value;
  localStorage.setItem(TICKET_PRICE, ticketPrice);
  return ticketPrice;
}
function updateSelected(event) {
  event.target.classList.toggle("selected");
  selectedSeats = document.querySelectorAll(".seat.selected:not(.sample)");
  storeSelectedSeats();
  updateTicketCountAndAmount();
}
function storeSelectedSeats() {
  seatIndices = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem(SELECTED_SEAT_INDICES, seatIndices);
}
function updateTicketCountAndAmount() {
  ticketCount = selectedSeats.length;
  ticketAmount = ticketCount * getTicketPrice();
  document.getElementById("ticketCount").innerHTML = ticketCount;
  document.getElementById("ticketAmount").innerHTML = ticketAmount;
}
window.onload = init;

function init() {
  initializeVariables();
  setupEventClickListeners();
  loadDataFromLocalStorage();
  updateTicketCountAndAmount();
}
function initializeVariables() {
  seats = document.querySelectorAll(".seat");
  selectedPrice = document.getElementById("pickMovie");
}

function setupEventClickListeners() {
  seats.forEach((element) => {
    element.addEventListener("click", updateSelected);
  });
  selectedPrice.addEventListener("click", updateTicketCountAndAmount);
}

function loadDataFromLocalStorage() {
  ticketPrice = localStorage.getItem(TICKET_PRICE);
  if (ticketPrice == null) {
    getTicketPrice();
  } else {
    selectedPrice.value = ticketPrice;
  }
  seatCache = localStorage.getItem(SELECTED_SEAT_INDICES);
  if (seatCache != null) {
    seatIndices = [...seatCache.split(",")];
    selectedSeats = seatIndices.map((index) => seats[index]);
    selectedSeats.forEach((item) => item.classList.add("selected"));
  }
}
