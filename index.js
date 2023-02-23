function getData(form) {
  const formData = new FormData(form);

  // iterate through entries...
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});
