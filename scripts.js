const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const playableRegion = document.querySelector('.playableRegion');

startScreen.addEventListener('click', start);

let truck = {speed: 5, score:0};

let keys={Up:false, Down:false, Right:false, Left:false};
var horn = new Audio('horn.mp3');

var boost = new Audio('boost.mp3');
var accelerate = new Audio('accelerate.mp3');
    

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e){
    e.preventDefault();
    if(e.key=='w' || e.key=='ArrowUp'){
        keys['Up'] = true; 
        accelerate.play();
    }
    else if(e.key=='s'|| e.key=='ArrowDown')
        keys['Down'] = true;
    else if(e.key=='a'|| e.key=='ArrowLeft')
        keys['Left'] = true;
    else if(e.key=='d'|| e.key=='ArrowRight')
        keys['Right'] = true;

    else if(e.key=='Shift')
        boost.play();

    else if(e.key==' ')
        horn.play();
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
    // console.log("truck "+truckBound);

    trafficBound = b.getBoundingClientRect(); // traffic
    // console.log("trafficCar "+trafficBound);
    
    var collision = ((truckBound.right<trafficBound.left) || (truckBound.left>trafficBound.right) || (truckBound.bottom<trafficBound.top) || (truckBound.top>trafficBound.bottom));
    return !collision;

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

        item.y += truck.speed;
        item.style.top = item.y+"px";

        if(item.y > 699)
            item.y -= 750;   
    })

}

function GameOver(){
    startScreen.classList.remove('hide');
    startScreen.style.background = "rgba(0,0,0,0) no-repeat right top";
    
    truck.start=false;
    console.log("THE END");
    startScreen.innerHTML = "Game Over! <br> Total Vaccines delivered = "+Math.floor(truck.score)+"<br>Click here to restart the Game.";
   
}
function moveTrafficCar(car){
    let traffic = document.querySelectorAll('.traffic');
    
    traffic.forEach(function(item){

        item.y+=truck.speed;
        item.style.top = item.y+"px";

        if(item.y > 749)
        {
            item.y = -300;
            item.style.backgroundImage = randomCar();
            item.style.left = Math.floor(Math.random()*350)+"px";
        }

        else if(isCollide(car, item)){
            var audio = new Audio('crash.mp3');
            audio.play();
            GameOver();
        }

        
        
        
    })

}

function start(){
    var audio = new Audio('start.mp3');
    audio.play();
    startScreen.classList.add('hide');
    playableRegion.innerHTML="";

    truck.start = true;
    truck.score = 0;
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

    truck.x = car.offsetLeft;
    truck.y = car.offsetTop;

    var count=0;
    while(count<4){
        count++;
        let enemeyCar = document.createElement('div');
        enemeyCar.setAttribute('class', 'traffic');
        enemeyCar.style.top = enemeyCar.y +"px";
        enemeyCar.style.backgroundImage = randomCar();
        enemeyCar.y = (-1*count)*350;
        enemeyCar.style.left = Math.floor(Math.random()*350)+"px";

        playableRegion.appendChild(enemeyCar); 
    }
}

function gamePlay(){
    var scoreIncrement = 0.01;
    let car = document.querySelector('.car');
    let road = playableRegion.getBoundingClientRect();

    if(truck.start){
        moveLines();
        moveTrafficCar(car);
        
        
        if(truck.x<road.width-50 && keys.Right){truck.x+=truck.speed;}
        if(truck.x>0 && keys.Left){truck.x-=truck.speed;}
        if(truck.y<road.bottom-75 && keys.Down){truck.y+=truck.speed-2;}
        if(truck.y>road.top+75 && keys.Up){truck.y-=truck.speed;}
        car.style.left = truck.x+"px";
        car.style.top = truck.y+"px";
        
        window.requestAnimationFrame(gamePlay);
        truck.score+=scoreIncrement;
        score.innerText = "Vaccines Delivered: "+Math.floor(truck.score);
    }

    
}




