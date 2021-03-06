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

//Double Money
function doubleMoney(){
    data = data.map(item=>{
        return {...item, money: item.money *  2}
    })
   updateDOM()
}

//Sortby Richest
function sortByRichest(){
    data.sort((a,b)=>{
       return b.money - a.money 
    })
    updateDOM();
}

//ShowMillionaires Result - filter
function showMillionaires(){    
    let result_data = data.filter(user => user.money > 1000000);
    updateDOM(result_data);
}

//calculateWealth of users
function calculateUsersWealth(){
    let wealth = data.reduce((acc, cur) =>{
        return acc + cur.money
    },0)
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//function to addUser
addUserBtn.addEventListener('click',function(){
    getRandomUser();
})

//function to doublebtn
doubleBtn.addEventListener('click',()=>{
    doubleMoney();
})

//function to sort
sortBtn.addEventListener('click',()=>{
    sortByRichest()
})

//function to show millionaires
showMillionairesBtn.addEventListener('click',()=>{
    showMillionaires();
})

//function to calculate worth
calculateWealthBtn.addEventListener('click',()=>{
    calculateUsersWealth()
})