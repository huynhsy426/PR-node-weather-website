console.log("Client side javascript file is loaded!");

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

//
// Goal: Fetch weather!
//
// 1. Setup a call to fetch to fetch weather for Boston
// 2. Get the parse JSON response
//  - If error property, print error
//  - If no error property, print location and forecast
// 3. Refresh the browser and test your work

// fetch("http://localhost:3000/weather?address=Boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";

//
// Goal: Use input value to get weather
//
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  if (location) {
    fetch("http://localhost:3000/weather?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
          }
        });
      }
    );
  } else {
    messageOne.textContent = "";
    messageTwo.textContent = "";
  }
});
