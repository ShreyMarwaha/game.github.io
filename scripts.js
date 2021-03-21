const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const playableRegion = document.querySelector('.playableRegion');

startScreen.addEventListener('click', start);

let player = {speed: 5, score:0};

let keys={Up:false, Down:false, Right:false, Left:false};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    e.preventDefault();
    if(e.key=='w' || e.key=='ArrowUp')
        keys['Up'] = true;
    else if(e.key=='s'|| e.key=='ArrowDown')
        keys['Down'] = true;
    else if(e.key=='a'|| e.key=='ArrowLeft')
        keys['Left'] = true;
    else if(e.key=='d'|| e.key=='ArrowRight')
        keys['Right'] = true;
    console.log(e.key);
}
function keyUp(e){
    e.preventDefault();
    if(e.key=='w' || e.key=='ArrowUp')
        keys['Up'] = false;
    else if(e.key=='s'|| e.key=='ArrowDown')
        keys['Down'] = false;
    else if(e.key=='a'|| e.key=='ArrowLeft')
        keys['Left'] = false;
    else if(e.key=='d'|| e.key=='ArrowRight')
        keys['Right'] = false;
    console.log(e.key);
}

function isCollide(a, b){
    truckBound = a.getBoundingClientRect(); //our truck
    trafficBound = b.getBoundingClientRect(); // traffic
    console.log("truck "+truckBound);
    console.log("trafficCar "+trafficBound);
    return !((truckBound.bottom<trafficBound.top) || (truckBound.top>trafficBound.bottom) || 
    (truckBound.right<trafficBound.left) || (truckBound.left>trafficBound.right))

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
            item.y -=750;
        
        item.y+=player.speed;
        item.style.top = item.y+"px";
    })

}

function endGame(){
    console.log("THE END");
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over! <br> Total Vaccines delivered = "+Math.floor(player.score)+"<br>Click here to restart the Game.";
    
}
function moveTrafficCar(car){
    let traffic = document.querySelectorAll('.traffic');
    
    traffic.forEach(function(item){
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

function start(){
    var audio = new Audio('start.mp3');
    audio.play();
    startScreen.classList.add('hide');
    playableRegion.innerHTML="";

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
        playableRegion.appendChild(roadLine);   
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    playableRegion.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<3; x++){
        let enemeyCar = document.createElement('div');
        enemeyCar.setAttribute('class', 'traffic');
        enemeyCar.y = (x+1)*350*-1;
        enemeyCar.style.top = enemeyCar.y +"px";
        enemeyCar.style.backgroundImage = randomCar();
        enemeyCar.style.left = Math.floor(Math.random()*350)+"px";

        playableRegion.appendChild(enemeyCar); 
    }
}

function gamePlay(){
    let car = document.querySelector('.car');
    let road = playableRegion.getBoundingClientRect();

    if(player.start){
        moveLines();
        moveTrafficCar(car);
        if(keys.Up && player.y>road.top+75){player.y-=player.speed;}
        if(keys.Down && player.y<road.bottom-75){player.y+=player.speed-2;}
        if(keys.Left && player.x>0){player.x-=player.speed;}
        if(keys.Right && player.x<road.width-50){player.x+=player.speed;}

        car.style.top = player.y+"px";
        car.style.left = player.x+"px";
        window.requestAnimationFrame(gamePlay);
        player.score+=0.01;
        score.innerText = "Vaccines Delivered: "+Math.floor(player.score);
    }

    
}




