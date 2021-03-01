const urlAPI =
  "https://randomuser.me/api/?results=12&inc=name,gender,picture,email,location,phone,dob&noinfo&nat=US";
const container = document.querySelector(".grid-container");
const modal = document.querySelector(".modal");
const modalData = document.querySelector(".modal-data");
const modalClose = document.querySelector(".close-btn");
const form = document.querySelector(".searchForm");
const input = document.querySelector(".searchInput");
const clearBtn = document.querySelector(".clear");

let employees = [];

// get data from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// create HTML from the data
function displayEmployees(data) {
  employees = data;
  let employeeHTML = ``;

  data.forEach((person, index) => {
    let name = person.name;
    let email = person.email;
    let city = person.location.city;
    let picture = person.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <img src="${picture.large}" class="avatar" />
        <div class="text-container">
          <h2>${name.first} ${name.last}</h2>
          <p>${email}</p>
          <p>${city}</p>
        </div>
      </div>
    `;
    container.innerHTML = employeeHTML;
  });
}

// create HTML for the Modal window

function displayModal(index) {
  let {
    email,
    dob,
    location: { city, country, postcode, street },
    name,
    phone,
    picture,
  } = employees[index];
  console.log(employees);
  let month = new Date(dob.date).getMonth();
  let day = new Date(dob.date).getDate();
  let year = new Date(dob.date).getFullYear();

  const modalHTML = `
  <img src="${picture.large}" />
  <h2>${name.first}</h2>
  <p>${email}</p>
  <p>${city}</p>

  <hr />

  <p>${phone}</p>
  <p>${street.number} ${street.name} ${postcode} ${country}</p>
  <p>Birthday: ${month}/${day}/${year}</p>
  `;
  modalData.innerHTML = modalHTML;
  modal.style.display = "block";
}

// Filter handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const employeesCards = document.querySelectorAll(".card");
  const nameInput = input.value;

  employeesCards.forEach((employee) => {
    const cardName = employee.querySelector("h2");

    if (!cardName.textContent.toUpperCase().includes(nameInput.toUpperCase())) {
      employee.classList.add("hidden");
    }
  });
});

//Clear handler
clearBtn.addEventListener("click", () => {
  const hiddenCards = document.querySelectorAll(".hidden");
  hiddenCards.forEach((card) => {
    card.classList.remove("hidden");
  });
  input.value = "";
});

// Open modal handler
container.addEventListener("click", (e) => {
  if (e.target !== container) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
});

// Close modal handlers

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target.className === "modal") {
    modal.style.display = "none";
  }
});
