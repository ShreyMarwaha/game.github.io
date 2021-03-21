const score = document.querySelector('.score');
const openingScene = document.querySelector('.openingScene');
const playableRegion = document.querySelector('.playableRegion');

var horn = new Audio('horn.mp3');
var boost = new Audio('boost.mp3');
var accelerate = new Audio('accelerate.mp3');

openingScene.addEventListener('click', start);

let boostSpeed = 1;
let truck = {speed: 5, score:0};
let keys={Up:false, Down:false, Right:false, Left:false};
  
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(e)
{

    e.preventDefault();
    if(e.key=='w' || e.key=='ArrowUp')
    {
        keys['Up'] = true; 
        accelerate.play();
        console.log(e.key);
    }
    else if(e.key=='s'|| e.key=='ArrowDown')
    {
        keys['Down'] = true;
        console.log(e.key);
    }
    else if(e.key=='a'|| e.key=='ArrowLeft')
    {
        keys['Left'] = true;
        console.log(e.key);
    }
    else if(e.key=='d'|| e.key=='ArrowRight')
    {
        keys['Right'] = true;
        console.log(e.key);
    }
    else if(e.key=='Shift')
    {
        boost.play();
        console.log(e.key);
    }
    else if(e.key==' ')
    {
        horn.play();
        console.log(e.key);
    }
    
}


function keyUp(e)
{
    e.preventDefault();
    if(e.key=='w' || e.key=='ArrowUp')
    {
        keys['Up'] = false;
        console.log(e.key);
    }
    else if(e.key=='s'|| e.key=='ArrowDown')
    {
        keys['Down'] = false;
        console.log(e.key);
    }
    else if(e.key=='a'|| e.key=='ArrowLeft')
    {
        keys['Left'] = false;
        console.log(e.key);
    }
    else if(e.key=='d'|| e.key=='ArrowRight')
    {
        keys['Right'] = false;
        console.log(e.key);
    }

}


function isCollide(boundObject1, boundObject2)
{

    trafficBound = boundObject2.getBoundingClientRect(); // traffic
    // console.log("trafficCar "+trafficBound);

    truckBound = boundObject1.getBoundingClientRect(); //our truck
    // console.log("truck "+truckBound);

    var isColliding = checkCollision(truckBound, trafficBound);
    
    return !isColliding;

}

function checkCollision(truckBound, trafficBound){
    
    var collision = ((truckBound.right<trafficBound.left) || (truckBound.left>trafficBound.right) || (truckBound.bottom<trafficBound.top) || (truckBound.top>trafficBound.bottom));
    
    return collision;

}


function randomCar(){

    let aa = Math.random(8)*10;
    let a = Math.floor(aa);
    console.log(a);
    
    switch(a) 
    {
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


function moveLines()
{
    let lines = document.querySelectorAll('.lines');
    // lines.style.background = "rgba(0,0,0,1)"; //gives error
    lines.forEach(function(pawn)
    {
        
        pawn.y += truck.speed;
        pawn.style.top = pawn.y+"px";

        if(pawn.y > 699)
            pawn.y -= 750;   
    })

}


function GameOver()
{
    openingScene.classList.remove('hide');
    openingScene.style.background = "linear-gradient(to bottom right, #6252ee, #1900f8) no-repeat right top";
    
    truck.start=false;
    console.log("THE END");
    openingScene.innerHTML = "Game Over! <br> Total Vaccines delivered = "+Math.floor(truck.score)+"<br>Click here to restart the Game.";
   
}


function moveTrafficCar(car)
{
    let traffic = document.querySelectorAll('.traffic');
    
    traffic.forEach(function(pawn){

        pawn.y+=truck.speed;
        pawn.style.top = pawn.y+"px";

        if(pawn.y > 749)
        {
            pawn.y = -300;
            pawn.style.backgroundImage = randomCar();
            pawn.style.left = Math.floor(Math.random()*350)+"px";
        }

        else if(isCollide(car, pawn))
        {
            var audio = new Audio('crash.mp3');
            audio.play();
            GameOver();
        }   
    })

}


function start()
{
    var audio = new Audio('start.mp3');
    reset();
    audio.play();

    var LineCount=0;
    while(LineCount<6)
    {
        LineCount++;

        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');

        roadLine.style.top = roadLine.y +"px";
        roadLine.y = LineCount*150;
        
        playableRegion.appendChild(roadLine);   
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    playableRegion.appendChild(car);

    truck.x = car.offsetLeft;
    truck.y = car.offsetTop;

    var count=0;
    while(count<5)
    {
        count++;
        let trafficCar = document.createElement('div');
        trafficCar.setAttribute('class', 'traffic');
        trafficCar.style.top = trafficCar.y +"px";
        trafficCar.style.backgroundImage = randomCar();
        trafficCar.y = (-1*count)*350;
        trafficCar.style.left = Math.floor(Math.random()*350)+"px";

        playableRegion.appendChild(trafficCar); 
    }

}


function reset()
{
    openingScene.classList.add('hide');
    playableRegion.innerHTML="";

    truck.start = true;
    truck.score = 0;
    window.requestAnimationFrame(gamePlay);

    const h = screen.height;
    console.log(h);
}


function gamePlay()
{
    var scoreIncrement = 0.01;
    let car = document.querySelector('.car');
    let road = playableRegion.getBoundingClientRect();

    if(truck.start){
        moveTrafficCar(car);
        moveLines();
        
         
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




