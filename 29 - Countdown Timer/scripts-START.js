let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countDown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if(secondsLeft < 0){
            clearInterval(countDown);
            return;
        }

        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
    timerDisplay.textContent = display; 
    document.title = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const canadianHour = (hour > 12) ? (hour - 12) : hour;
    const browserLanguage = (navigator.language || navigator.userLanguage);
    const displayHour = browserLanguage.includes('tr') ? hour : canadianHour;
    const minutes = end.getMinutes();
    endTime.textContent = `Ge bure ${displayHour}:${minutes < 10 ? '0': ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    this.reset();
    timer(mins * 60);

});