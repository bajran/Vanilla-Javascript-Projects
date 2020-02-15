const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
// To get 3 random user we need to invoke it 3 times
getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const users = data.results[0];
  const newUser = {
    name: `${users.name.first} ${users.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update Dom
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}


//format number as money
function formatMoney(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}




//function to addUser
addUserBtn.addEventListener('click',function(){
    getRandomUser();
})

function doubleMoney(){
    data = data.map(item=>{
        return {...item, money: item.money *  2}
    })
   updateDOM()
}


//function to doublebtn
doubleBtn.addEventListener('click',()=>{
    doubleMoney();
})