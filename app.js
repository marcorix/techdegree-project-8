const urlAPI =
  "https://randomuser.me/api/?results=12&inc=name,gender,picture,email,location,phone,dob&noinfo&nat=US";
const container = document.querySelector(".grid-container");
const modal = document.querySelector(".modal");
const modalData = document.querySelector(".modal-data");
const modalClose = document.querySelector(".close-btn");
const form = document.querySelector(".searchForm");
const search = document.querySelector("#search");
const clearBtn = document.querySelector(".clear");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");

let indexModalWindow = null;
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
    location: { city, postcode, street },
    name,
    phone,
    picture,
  } = employees[index];

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
  <p>${street.number} ${street.name} ${postcode}</p>
  <p>Birthday: ${month}/${day}/${year}</p>
  `;
  modalData.innerHTML = modalHTML;
  modal.style.display = "block";
}

// Filter function
function handleSearch() {
  const employeesCards = document.querySelectorAll(".card");
  const nameSearch = search.value;

  employeesCards.forEach((employee) => {
    const employeeName = employee.querySelector("h2");

    if (
      !employeeName.textContent.toUpperCase().includes(nameSearch.toUpperCase())
    ) {
      employee.classList.add("hidden");
    }
  });
}

// Filter handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch();
});

//Clear filter handler
clearBtn.addEventListener("click", () => {
  const hiddenCards = document.querySelectorAll(".hidden");
  hiddenCards.forEach((card) => {
    card.classList.remove("hidden");
  });
  search.value = "";
});

// Open modal handler
container.addEventListener("click", (e) => {
  if (e.target !== container) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    indexModalWindow = index;
    console.log(indexModalWindow);
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

//Forwad modal window
forwardBtn.addEventListener("click", () => {
  if (indexModalWindow === employees.length - 1) {
    indexModalWindow = 0;
    displayModal(indexModalWindow);
  } else {
    indexModalWindow++;
    displayModal(indexModalWindow);
  }
});

//Backward modal window
backwardBtn.addEventListener("click", () => {
  if (indexModalWindow === 0) {
    indexModalWindow = employees.length - 1;
    displayModal(indexModalWindow);
  } else {
    indexModalWindow--;
    displayModal(indexModalWindow);
  }
});
