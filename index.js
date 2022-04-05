const cards=document.querySelectorAll('.memory__card')
const score= document.querySelector('.header__score__span')
const btn = document.querySelector('.main__victory__btn')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function  flipCard(){
    if(lockBoard)return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        //первый клик
        hasFlippedCard=true;
        firstCard = this;
        return;
    }
    
    //второй клик
    secondCard = this;
    checkForMatch();
}

function checkForMatch(){
   
    //проверяем совподают ли карточки
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        
        //если карточки совподают то не переворачиваем
        disableCards()
    }else{
       // если не совподают то переворачиваем
       unflipCards()
    }
    score.innerText = parseInt(score.innerText) + 1;
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    let flip = document.querySelectorAll('.flip')

    if(cards.length == flip.length){
        setTimeout(()=>{
            document.querySelector('.main__victory').classList.add('visible');
            document.querySelector('.main__victory__span').innerText = parseInt(score.innerText);
        },500);
    }
    resetBoard()
}

function unflipCards(){
    lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
function resetBoard(){
    [hasFlippedCard, lockBoard]=[false, false];
    [firstCard, secondCard] = [null, null];
}
//меняем порядок карт
(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })
})();

btn.addEventListener('click', ()=>{
    document.querySelector('.main__victory').classList.remove('visible');
    cards.forEach((cards) => {cards.classList.remove('flip')})

    score.innerText = 0
    cards.forEach(cards => cards.addEventListener('click', flipCard))

})

cards.forEach(cards => cards.addEventListener('click', flipCard))



