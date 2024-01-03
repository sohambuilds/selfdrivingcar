const carCanvas = document.getElementById("carCanvas");
//carCanvas.height=window.innerHeight;
carCanvas.width=200;

const networkCanvas = document.getElementById("networkCanvas");
//networkCanvas.height=window.innerHeight;
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")
const road = new Road(carCanvas.width/2,carCanvas.width*0.9)
const car = new Car(road.getLaneCenter(1),100,30,50, "AI")

//for(i=0;i<100;i++){
 ///   y=Math.random()*1000
   // RandCar
//}
const traffic = [ new Car(road.getLaneCenter(1),-400,30,50,"DUMMY",0.5),
new Car(road.getLaneCenter(2),-600,30,50,"DUMMY",0.5),
new Car(road.getLaneCenter(0),-800,30,50,"DUMMY",0.5),
new Car(road.getLaneCenter(4),-800,30,50,"DUMMY",0.5),
new Car(road.getLaneCenter(3),-1000,30,50,"DUMMY",0.5),
new Car(road.getLaneCenter(2),-1050,30,50,"DUMMY",0.5),

    
    new Car(road.getLaneCenter(0),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(3),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(3),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(5),-700,30,50,"DUMMY",2),

]
const N=1000
const cars = generateCars(N)
let bestCar=cars[0]



if(localStorage.getItem("bestBrain")){

    for(let i =0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
        localStorage.getItem("bestBrain")
    
    )
    if(i!=0){
        NeuralNetwork.mutate(cars[i].brain,0.2)
    }
}
    
}
animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}




function generateCars(N){
    const cars = [];
    for(let i = 0;i<=N;i++){
       cars.push(new Car(road.getLaneCenter(1),-100,30,50,"AI"))
    }

   return cars
}

function animate(time){
    for(i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
    }

    for(let i=0;i<cars.length;i++){
    cars[i].update(road.borders,traffic);
    }

    bestCar=cars.find(
        c=>c.y==Math.min(...cars.map(c=>c.y))
    )
    carCanvas.height=window.innerHeight
    networkCanvas.height=window.innerHeight

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.5);
  

    road.draw(carCtx)
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,'green');
    }
    carCtx.globalAlpha=0.1;
    for(let i=0;i<cars.length;i++){
    cars[i].draw(carCtx,'yellow')
}
    carCtx.globalAlpha=1
    bestCar.draw(carCtx,"cyan",true)
    
    carCtx.restore();
    networkCtx.lineDashOffset=-time/50
    Visualizer.drawNetwork(networkCtx,bestCar.brain)
    requestAnimationFrame(animate)
}