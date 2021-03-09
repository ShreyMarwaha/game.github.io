const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = {speed: 5, score:0};

let keys={ArrowUp:false, ArrowDown:false, ArrowRight:false, ArrowLeft:false};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b){
    aRect = a.getBoundingClientRect(); //our truck
    bRect = b.getBoundingClientRect(); // traffic
    
    return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || 
    (aRect.right<bRect.left) || (aRect.left>bRect.right))

}

function randomCar(){
    let a = Math.floor(Math.random(8)*10);
    console.log(a);
    switch(a) {
        case 0:
            return "url('taxi.png')"
          break;
        case 1:
            return "url('red.png')"
          break;
          case 2:
            return "url('blue.png')"
          break;
          case 3:
            return "url('green.png')"
          break;
          case 4:
            return "url('purple.png')"
          break;
          case 5:
            return "url('yellow.png')"
          break;
          case 6:
            return "url('orange.png')"
          break;
        default:
            return "url('red.png')"
      }

    
}
function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y>= 700)
        {
            item.y -=750;
        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })

}

function endGame(){
    console.log("here");
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is "+Math.floor(player.score)+"<br>Press here to restart the Game.";
    
}
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    
    enemy.forEach(function(item){
        if(isCollide(car, item)){
            var audio = new Audio('crash.mp3');
            audio.play();
            endGame();
        }

        if(item.y>= 750)
        {
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350)+"px";
            item.style.backgroundImage = randomCar();

        }
        item.y+=player.speed;
        item.style.top = item.y+"px";
        
    })

}
function gamePlay(){
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start){
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y>road.top+75){player.y-=player.speed;}
        if(keys.ArrowDown && player.y<road.bottom-75){player.y+=player.speed-2;}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
        if(keys.ArrowRight && player.x<road.width-50){player.x+=player.speed;}

        car.style.top = player.y+"px";
        car.style.left = player.x+"px";
        window.requestAnimationFrame(gamePlay);
        player.score+=0.01;
        score.innerText = "Vaccines Delivered: "+Math.floor(player.score);
    }

    
}

function start(){
    var audio = new Audio('start.mp3');
    audio.play();
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    const h = screen.height;
    console.log(h);
    for(x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = x*150;
        roadLine.style.top = roadLine.y +"px";
        gameArea.appendChild(roadLine);
        
    }

    

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for(x=0; x<3; x++){
        let enemeyCar = document.createElement('div');
        enemeyCar.setAttribute('class', 'enemy');
        enemeyCar.y = (x+1)*350*-1;
        enemeyCar.style.top = enemeyCar.y +"px";
        enemeyCar.style.backgroundImage = randomCar();
        enemeyCar.style.left = Math.floor(Math.random()*350)+"px";

        gameArea.appendChild(enemeyCar); 
    }
}


