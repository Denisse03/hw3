function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let an = $("#Age").val();
    let pn = $("#phoneNumber").val();
    let em = $("#emailAdd").val();
    let cs = $("#classes").val();

    let newInformation = cs.split(",");
    let finalInformation = [];

    let information = {
      fName: fn,
      lName: ln,
      age: an,
      phone: pn,
      email: em,
      classes: [],
    };

    $.each(newInformation, (idx, newInfo) => {
      if (newInfo != "") {
        let cl = {
          className: newInfo.trim(),
        };
        finalInformation.push(cl);
      }
    });

    information.classes = finalInformation;

    console.log(information);

    $("#firstName").val("");
    $("#lastName").val("");
    $("#Age").val("");
    $("#phoneNumber").val("");
    $("#emailAdd").val("");
    $("#classes").val("");

    addInfo(information);
  });

  $("#getInfo").on("click", (e) => {
    getAllInfo();
  });
}

function addInfo(user) {
  let allUsers = JSON.parse(localStorage.getItem("Info"));
  allUsers.push(user);

  localStorage.setItem("Info", JSON.stringify(allUsers));
}

function getAllInfo() {
  $("#infoList").html("");
  let allUsers = JSON.parse(localStorage.getItem("Info"));
  let userString = "";

  $.each(allUsers, (idx, user) => {
    userString += `<p>`;

    userString += `Name: ${user.fName} ${user.lName}
    <br/>
    Age: ${user.age}
     <br/>
    Phone Number: ${user.phone}
     <br/>
    Email: ${user.email}
     <br/>
     Classes:`;
    $.each(user.classes, (idx, cls) => {
      userString += `<span>${cls.className}</span>`;
    });

    userString += `</p>`;
  });

  console.log(userString);
  $("#InfoList").html(userString);
}

function connectStorage() {
  if (localStorage) {
    let classes = localStorage.getItem("Info");
    if (classes) {
    } else {
      localStorage.setItem("Info", "[]");
    }
  } else {
    console.log("No storage was detected");
  }
}

$(document).ready(function () {
  initListeners();
  connectStorage();
});
