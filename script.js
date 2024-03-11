
document.getElementById("slist").addEventListener("click", showAndHide);
function showAndHide() {
    if (document.getElementById("slist").innerHTML == "Show List") {
        document.getElementById("slist").innerHTML = "Hide List";
        document.getElementById("tlist").innerHTML = `<div class="container d-flex flex-column rounded-3 my-md-5 bg-dark bg-gradient" style="width:auto;">

<table class="table">
  <thead>
    <h3 class="p-2" style="color: aquamarine;">Task List</h3>
  </thead>
  <thead>
    <tr>
      <th scope="col">
        <font color="blanchedalmond">SNo.</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Item Title</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Item Description</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Deadline</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Actions</font>
      </th>
    </tr>
  </thead>
  <tbody id="tableBody">

  </tbody>
</table>
<div class="d-flex justify-content-end">
  <div class="dropdown me-2">
    <label><font color="blanchedalmond">Sort by:</font></label>
<select id="sortby" onchange="myFunction()">
  <option value="none" selected>Entry Order</option>
  <option value="title">Title</option>
  <option value="ded">Deadline</option>
</select>
</div>
  <button class="bg-danger" onclick="clearstor()" style="width: 10%;">
    <font color="White" weight="bolder">Clear All</font>
  </button>
</div>

</div>`;
        update();
    }
    else if (document.getElementById("slist").innerHTML == "Hide List") {
        document.getElementById("slist").innerHTML = "Show List";
        document.getElementById("tlist").innerHTML = ``;
    }
}
let today = new Date().toISOString().split('T')[0];
document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);
let add = document.getElementById("add");
add.addEventListener("click", getAndupdate);
function getAndupdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    ded = document.getElementById('deadline').value;
    if (tit == "" || desc == "" || ded == "") {
        alert("Please fill complete details of task.");
        return;
    }
    document.getElementById("slist").innerHTML = "Hide List";
    document.getElementById("tlist").innerHTML = `<div class="container d-flex flex-column rounded-3 my-md-5 bg-dark bg-gradient" style="width:auto;">

<table class="table">
  <thead>
    <h3 class="p-2" style="color: aquamarine;">Task List</h3>
  </thead>
  <thead>
    <tr>
      <th scope="col">
        <font color="blanchedalmond">SNo.</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Item Title</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Item Description</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Deadline</font>
      </th>
      <th scope="col">
        <font color="blanchedalmond">Actions</font>
      </th>
    </tr>
  </thead>
  <tbody id="tableBody">

  </tbody>
</table>
<div class="d-flex justify-content-end">
  <div class="dropdown me-2">
    <label><font color="blanchedalmond">Sort by:</font></label>
<select id="sortby" onchange="myFunction()">
  <option value="none" selected>Entry Order</option>
  <option value="title">Title</option>
  <option value="ded">Deadline</option>
</select>
</div>
  <button class="bg-danger" onclick="clearstor()" style="width: 10%;">
    <font color="White" weight="bolder">Clear All</font>
  </button>
</div>

</div>`;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc, ded]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc, ded]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    const inputs = document.querySelectorAll('#title, #description, #deadline');
    inputs.forEach(e => {
        e.value = '';
    });
    update();
}
function myFunction() {
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    //populate table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    if (document.getElementById("sortby").value == "title") {
        itemJsonArray.sort();
    }
    else if (document.getElementById("sortby").value == "ded") {
        itemJsonArray.sort((a, b) => {
            if (new Date(a[2]) < new Date(b[2])) return -1; // ascending
        });
    }
    itemJsonArray.forEach((element, index) => {
        str += `
                  <tr class="bg-light">
                  <th scope="row">${index + 1}</th>
                  <td>${element[0]}</td>
                  <td>${element[1]}</td>
                  <td>${element[2].toString()}</td>
                  <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Completed</button></td>
                  </tr>`;
    });
    tableBody.innerHTML = str;
}
function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //delete item index element from array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    if (itemJsonArray == "") {
        document.getElementById("slist").innerHTML = "Show List";
        document.getElementById("tlist").innerHTML = ``;
    }
    update();
}
function clearstor() {
    if (confirm("Do you really want to clear?")) {
        document.getElementById("slist").innerHTML = "Show List";
        console.log("Clearing the storage");
        localStorage.clear();
        document.getElementById("tlist").innerHTML = ``;
        update();
    }
}