// Total possible score
const maxScore = 550;
// Starting score
let userScore = 0;

// Get elements from document
const form = document.getElementById("form");
const resultEl = document.querySelector(".result");
const circle = document.querySelector(".circle");
const percentage = document.querySelector(".percentage");
const resultText = document.createElement("p");
const clearBtn = document.querySelector("#btn-clear");

// Get user's input
function getData(form) {
  const formData = new FormData(form);

  // iterate through entries
  for (let item of formData.entries()) {
    // calculate score
    userScore += Number(item[1]);
  }
}

// Update the result circle
function updateCircle(percent) {
  const circumference = circle.getTotalLength();

  if (circle.getAttribute("stroke-dasharray")) {
    circle.setAttribute("stroke-dasharray", `${percent}, 100`);
  } else {
    circle.setAttribute(
      "style",
      `stroke-dasharray: ${circumference} ${circumference}`
    );
    circle.setAttribute("stroke-dasharray", `${percent}, 100`);
  }

  percentage.textContent = `${percent}%`;
}

// Calculate survival chances
function calculateSurvival(score) {
  // Convert score to percentage
  const percentScore = Math.round((100 * score) / maxScore);

  // Fill the element displaying result
  resultText.textContent = `You scored ${score} points! `;

  // Render additional text based on the score
  if (percentScore < 20) {
    resultText.textContent += `YWell, at least you'll go out in a blaze of glory... or maybe just a blaze. Sorry, friend. Remember, it's not the size of the gun, it's how you use it.`;
  } else if (percentScore < 40) {
    resultText.textContent += `You're not quite ready to be a hero in the zombie apocalypse yet. Don't worry, even the most skilled survivors had to start somewhere. In the words of Joel from The Last of Us, 'endure and survive.'`;
  } else if (percentScore < 60) {
    resultText.textContent += `Not bad! You're like a zombie's worst nightmare... as long as that zombie isn't too hungry. Remember, aim for the head, always have an exit strategy, and listen for the sound of clickers.`;
  } else if (percentScore < 80) {
    resultText.textContent += `You're a survivor! You have a good chance of making it through the early stages of the apocalypse, but stay alert and be prepared for anything. And don't forget to share your tips with the rest of us!`;
  } else if (percentScore < 100) {
    resultText.textContent += `You're a pro at surviving! You have a strong chance of making it through the apocalypse, but don't get too overconfident.`;
  } else if (percentScore === 100) {
    resultText.textContent += `Congratulations, you're a survivor! You're like Joel, but with less emotional baggage. You know what it takes to make it through any challenge the apocalypse throws your way.`;
  }

  // Append the result to the appropriate element
  resultEl.appendChild(resultText);

  // Render the circle
  updateCircle(percentScore);

  // Make it visible
  resultEl.style.display = "block";
}

// Reset everything
function reset() {
  if (userScore) {
    resultEl.style.display = "none";
    if (resultEl.contains(resultText)) {
      resultEl.removeChild(resultText);
    }
    userScore = 0;
    updateCircle(0);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  reset();
  getData(e.target);
  calculateSurvival(userScore);
}

function handleClearButtonClick() {
  reset();
}

form.addEventListener("submit", handleFormSubmit);
clearBtn.addEventListener("click", handleClearButtonClick);
