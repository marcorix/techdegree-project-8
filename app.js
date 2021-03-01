const urlAPI =
  "https://randomuser.me/api/?results=12&inc=name,gender,picture,email,location,phone,dob&noinfo&nat=US";
const container = document.querySelector(".grid-container");
const emplyees = [];

// get data from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

// create HTML from the data
function displayEmployees(data) {
  employees = data;
  employeeHTML = ``;

  employees.forEach((person, index) => {
    let name = person.name;
    let email = person.email;
    let city = person.location.city;
    let picture = person.picture;
    console.log(person);
    employeeHTML += `
      <div class="card" data-index="${index}">
      <img src="${picture.medium}" class="avatar" />
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
