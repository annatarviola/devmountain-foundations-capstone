const setsBaseURL = `http://localhost:4444/api/sets`;

const form = document.getElementById("form");
const stringsContainer = document.getElementById("strings-container");
let updateBtn;
let isUpdating = false;

const setsCallback = ({ data: sets }) => displaySets(sets);
const errCallback = (err) => console.log(err);

const getAllSets = () =>
  axios.get(setsBaseURL).then(setsCallback).catch(errCallback);
const createSet = (body) =>
  axios.post(setsBaseURL, body).then(setsCallback).catch(errCallback);
const deleteSet = (id) =>
  axios.delete(`${setsBaseURL}/${id}`).then(setsCallback).catch(errCallback);
const updateSet = (id, body) =>
  axios.put(`${setsBaseURL}/${id}`, body).then(setsCallback).catch(errCallback);

function submitHandlerAdd(e) {
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
    date = new Date(date.split('-')).toLocaleDateString("en-us", {
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

form.addEventListener("submit", submitHandlerAdd);

function createSetCard(set) {
  const setInfoCard = document.createElement("div");
  setInfoCard.classList.add(`container`);
  setInfoCard.setAttribute(`id`, `${set.id}`);
  setInfoCard.innerHTML = `<details id="string-set"><summary>${set.brand} — ${set.date}</summary>
  <p class="brand"><span class="label">BRAND: </span>${set.brand}</p>
  <p class="date"><span class="label">DATE PUT ON: </span>${set.date}</p>
  <p class="price"><span class="label">PRICE: </span>$${set.price}</p>
  <p class="gauge"><span class="label">STRING GAUGE: </span>${set.gauge}</p>
  <p class="strings"><span class="label">STRING(S): </span>${set.strings}</p>
  <p class="rating"><span class="label">RATING: </span>${set.rating}</p>
  <p class="notes"><span class="label">NOTES: </span>${set.userNotes}</p>
  <div class="card-buttons">
  <button id="update-${set.id}">UPDATE</button>
  <button id="delete" onclick="deleteSet(${set.id})">DELETE</button>
  </div></details>`;

  const setEditCard = document.createElement("div");
  setEditCard.classList.add(`hidden`);
  setEditCard.setAttribute(`id`, `edit-${set.id}`);

  setEditCard.innerHTML = `<details id="edit-set" open><summary>${set.brand} — ${set.date}</summary>
  <form name="update">
  <p class="brand"><span class="label">BRAND: </span><input type='text' name='brand' id="brand-${set.id}" value="${set.brand}"/></p>

  <p class="date"><span class="label">DATE PUT ON: </span><input type='text' name='date' id='date-${set.id}' value='${set.date}'</p>
  
  <p class="price"><span class="label">PRICE: </span></p>
  <div class="currency-wrap">
  <span class="currency-code-edit">$</span>
  <input
    class="price-edit"
    id="price-${set.id}"
    type="number"
    step=".01"
    min="0"
    name="price"
    value="${set.price}"
    />
  </div>
  
  <p class="gauge"><span class="label">STRING GAUGE: </span><select name="gauge" id="gauge-${set.id}">
    <option>${set.gauge}</option>
    <option>Weich</option>
    <option>Medium</option>
    <option>Stark</option>
  </select></p>

  <p class="strings"><span class="label">STRING(S): </span><select name="strings" id="strings-${set.id}">
    <option>${set.strings}</options>
    <option>Set</option>
    <option>C</option>
    <option>G</option>
    <option>D</option>
    <option>A</option>
  </select></p>

  <p class="rating"><span class="label">RATING: </span><select name="rating" id="rating-${set.id}">
  <option>${set.rating}</option>
    <option>★</option>
    <option>★★</option>
    <option>★★★</option>
    <option>★★★★</option>
    <option>★★★★★</option>
  </select></p>

  <p class="notes"><span class="label">NOTES: </span><textarea name='notes' id="notes-${set.id}">${set.userNotes}</textarea></p>

  <div class="card-buttons">
    <button id="save-${set.id}">SAVE</button>
    <button type="button" id="cancel-${set.id}">CANCEL</button>
  </div></form></details>`;

  stringsContainer.appendChild(setInfoCard);
  stringsContainer.appendChild(setEditCard);

  updateBtn = document.getElementById(`update-${set.id}`);
  updateBtn.addEventListener("click", () => setEdit(set.id));

  cancelBtn = document.getElementById(`cancel-${set.id}`);
  cancelBtn.addEventListener("click", () => setInfo(set.id));

  
  saveBtn = document.getElementById(`save-${set.id}`);
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let brand = document.getElementById(`brand-${set.id}`).value;
    let price = document.getElementById(`price-${set.id}`).value;
    let date = document.getElementById(`date-${set.id}`).value;
    let gauge = document.getElementById(`gauge-${set.id}`).value;
    let strings = document.getElementById(`strings-${set.id}`).value;
    let rating = document.getElementById(`rating-${set.id}`).value;
    let userNotes = document.getElementById(`notes-${set.id}`).value;
  
    let formData = { brand, price, gauge, strings, rating, date, userNotes };
  
    updateSet(set.id, formData)
  })
}

function setEdit(id) {
  const viewCard = document.getElementById(`${id}`);
  const editCard = document.getElementById(`edit-${id}`);

  viewCard.classList.add("hidden");
  editCard.classList.add("container");
  editCard.classList.remove("hidden");
}

function setInfo(id) {
  const viewCard = document.getElementById(`${id}`);
  const editCard = document.getElementById(`edit-${id}`);

  viewCard.classList.remove("hidden");
  editCard.classList.remove("container");
  editCard.classList.add("hidden");
}

function displaySets(arr) {
  stringsContainer.innerHTML = ``;

  for (let i = 0; i < arr.length; i++) {
    createSetCard(arr[i]);
  }
}

getAllSets();
