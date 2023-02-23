const maxScore = 550;
const form = document.getElementById("form");
const resultEl = document.querySelector(".result");

function getData(form) {
  const formData = new FormData(form);
  let score = 0;

  // iterate through entries
  for (let item of formData.entries()) {
    // calculate score
    score += Number(item[1]);
  }
  console.log(score);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
  resultEl.style.display = "block";
});

function updateProgress(progress) {
  const circle = document.querySelector(".circle");
  const circumference = circle.getTotalLength();
  const offset = circumference - (progress / 100) * circumference;

  if (circle.getAttribute("stroke-dasharray")) {
    circle.setAttribute("stroke-dasharray", `${progress}, 100`);
  } else {
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.setAttribute("stroke-dasharray", `${progress}, 100`);
  }

  const percentage = document.querySelector(".percentage");
  percentage.textContent = `${progress}%`;
}

updateProgress(15);
