const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieTicket = document.getElementById('movie')

populateUI()

//'+' sign to convert movieTicket value to number
let ticketPrice = +movieTicket.value

//Update total and count - in local storage
function updateSelectedCount(){
    const selectedCount = document.querySelectorAll('.row .seat.selected')
    
    //seats to be maintained for local storage
    const seatsIndex = [...selectedCount].map((seat)=>{
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedCount.length;
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

}

//Set movie index and value in local storage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//getData from localStorage and populate in ui

function populateUI(){
    const selectedSeats= JSON.parse(localStorage.getItem('selectedSeats'))

    if( selectedSeats !== null && selectedSeats.length != 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null){
        movieTicket.selectedIndex = selectedMovieIndex
    }

}

//Movie select event
movieTicket.addEventListener('change',(e)=>{
    ticketPrice = e.target.value
    updateSelectedCount();
    //set movie data    
    setMovieData(e.target.selectedIndex, e.target.value)
})

//EventListener on container for seat click
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
       e.target.classList.toggle('selected');
       updateSelectedCount();
    }
})



//Intital Count and total set
updateSelectedCount();