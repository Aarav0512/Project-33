const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var world, engine, ground
var divisions = []
var divisionHeight = 300
var plinkos = []
var particle
var score = 0
var gameState = "start"    
var count = 0

function setup() {
  createCanvas(480,800);
  engine =Engine.create();
  world = engine.world;
  ground = new Ground(240,790,480,20)
  for (var k = 0; k <= width; k = k + 80){
    divisions.push(new Ground(k,height-divisionHeight/2,10,divisionHeight))
  }
  for (var j = 40; j <= width; j = j+50){
    plinkos.push(new Plinko(j,75))
  }
  for (var j = 15; j <= width-10; j = j+50){
    plinkos.push(new Plinko(j,175))
  }
  for (var j = 40; j <= width; j = j+50){
    plinkos.push(new Plinko(j,275))
  }
  for (var j = 15; j <= width; j = j+50){
    plinkos.push(new Plinko(j,375))
  }
}

function draw() {
  background(0);  
  text("Score : " + score,240,400)
  Engine.update(engine)
  ground.display()
  for (var k = 0; k < divisions.length; k++){
    divisions[k].display()
  }
  for (var k = 0; k < plinkos.length; k++){
    plinkos[k].display()
}
  if (particle != null){
    particle.display()

    if (particle.body.position.y > 760){
      if (particle.body.position.x < 300){
        score = score + 500
        particle = null
      }
    else if (particle.body.position.x > 300 && particle.body.position.x < 600){
      score = score + 100
      particle = null
    }
    else if (particle.body.position.x > 600 && particle.body.position.x < 900){
      score = score + 200
      particle = null
    }
    if (count >= 5){
      gameState = "end"
    }
    }
  }
  if (gameState === "end"){
    text("Game Over",240,700)
  }
}

function mousePressed(){
  if (gameState !== "end"){
    particle = new Particle(mouseX,10)
    count = count + 1
    
  }
}