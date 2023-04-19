const setsBaseURL = `http://localhost:4444/api/sets`;

const form = document.getElementById("form");
const stringsContainer = document.getElementById("strings-container");
let isUpdating = false;

const setsCallback = ({ data: sets }) => displaySets(sets);
const errCallback = (err) => console.log(err);

const getAllSets = () =>
  axios.get(setsBaseURL).then(setsCallback).catch(errCallback);
const createSet = (body) =>
  axios.post(setsBaseURL, body).then(setsCallback).catch(errCallback);
const deleteSet = (id) =>
  axios.delete(`${setsBaseURL}/${id}`).then(setsCallback).catch(errCallback);

function submitHandler(e) {
  e.preventDefault();

  let brand = document.forms.form.brand.value;
  let price = document.forms.form.price.value;
  let date = document.forms.form.date.value;
  let gauge = document.forms.form.gauge.value;
  let strings = document.forms.form.strings.value;
  let rating = document.forms.form.rating.value;
  let userNotes = document.forms.form.notes.value;

  if (brand && price && date) {
    price = new Intl.NumberFormat().format(price);
    date = new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let formData = { brand, price, gauge, strings, rating, date, userNotes };
    createSet(formData);
    form.reset();
  } else {
    alert("Please fill out brand name, price, and date fields.");
  }
}

form.addEventListener("submit", submitHandler);

function createSetCard(set) {
  const setCard = document.createElement("div");
  setCard.classList.add("container");
  setCard.innerHTML = `<details><summary>${set.brand} — ${set.date}</summary>
  <p class="brand"><span class="label">BRAND: </span>${set.brand}</p>
  <p class="date"><span class="label">DATE PUT ON: </span>${set.date}</p>
  <p class="price"><span class="label">PRICE: </span>$${set.price}</p>
  <p class="gauge"><span class="label">STRING GAUGE: </span>${set.gauge}</p>
  <p class="strings"><span class="label">STRING(S): </span>${set.strings}</p>
  <p class="rating"><span class="label">RATING: </span>${set.rating}</p>
  <p class="notes"><span class="label">NOTES: </span>${set.userNotes}</p>
  <div class="card-buttons">
  <button id="update">UPDATE</button>
  <button id="delete" onclick="deleteSet(${set.id})">DELETE</button>
  </div></details>`;

  stringsContainer.appendChild(setCard);
}

function displaySets(arr) {
  stringsContainer.innerHTML = ``;

  for (let i = 0; i < arr.length; i++) {
    createSetCard(arr[i]);
  }
}

getAllSets();
