function sendData() {
  let firstName = document.getElementById("fName").value;
  let lastName = document.getElementById("lName").value;
  let countryName = document.getElementById("country").value;
  let positionName = document.getElementById("position").value;

  let userdata = {
    firstName,
    lastName,
    countryName,
    positionName,
  };
  fetch("http://localhost:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("root").innerHTML = data.message;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getData() {
  fetch("http://localhost:3000/show")
    .then((res) => res.json())
    .then((data) => {
      showUsers(data);
    });
}

function showUsers(data) {
  let root = document.getElementById("root");
  root.innerHTML = "";
  data.forEach((item) => {
    let p = document.createElement("p");

    p.innerHTML = item.first_name
      .concat("  ")
      .concat(item.last_name)
      .concat(" - Country: ")
      .concat(item.country)
      .concat(" - Position: ")
      .concat(item.position);
    p.style.color = "white";
    p.style.fontSize = "25px";
    p.style.fontFamily = "Charcoal,sans-serif";
    root.appendChild(p);
  });
}

function deleteData() {
  let firstName = document.getElementById("fName").value;
  let lastName = document.getElementById("lName").value;

  let userdata = {
    firstName,
    lastName,
  };
  fetch("http://localhost:3000/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  })
    .then((res) => res.json())
    .then((data) => {
      showUsers();
      document.getElementById("root").innerHTML = `${data.message}`;
    });
}

function findData() {
  let firstName = document.getElementById("fName").value;
  let lastName = document.getElementById("lName").value;

  let userdata = {
    firstName,
    lastName,
  };

  fetch("http://localhost:3000/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("root").innerHTML = `${data.message}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

function showPlayer() {
  console.log("hola");
  fetch(
    "https://v3.football.api-sports.io/players/topscorers?season=2018&league=61",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
  return data.catch((err) => {
    console.log(err);
  });
}

module.exports = {
  showPlayer,
};
