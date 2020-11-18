var dog,normalimg,happyimg;
var database,foods;

function preload(){
  normalimg=loadImage("dogImg.png");
  happyimg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database = firebase.database();

  dog=createSprite(400,450);
  dog.addImage(happyimg);
  dog.addImage(normalimg);
  dog.scale=0.25;

  var foodQuantity=database.ref('food');
  foodQuantity.on("value",readQuantity,showError);  
}


function draw() {  

  background("green");
  
   textSize(20);
   fill("white");
  text("FOOD LEFT : "+foods,320,300);
  text("Press Spacebar to feed the dog and made him happy",175,50);

  drawSprites();

  if(keyWentDown(32)){
    writeStock(foods);
    dog.addImage(happyimg);
  }

}

function readQuantity(data){
  foods = data.val();
}

function showError(){
  console.log("Error in writing to the database");
}

function writeStock(x){

  if(x<0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })

}