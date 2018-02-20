var canvasElem = document.getElementById('canvas'),
    ctx = canvasElem.getContext('2d');
    canvasElem.width = window.innerWidth;
    canvasElem.height = window.innerHeight;
var innerHeight = canvasElem.height,
    innerWidth = canvasElem.width,
    maxRadius = 50, minRadius = 4;

    var colorArray = [
      '#060830',
      '#270E38',
      '#420037',
      '#173C52',
      '#BA763A'
    ];

var mouse = {
  x: undefined,
  y: undefined
}
canvasElem.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize', function() {
  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
})
function Circle(x,y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#80007D';
    ctx.stroke();
  }

  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx= - this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy= - this.dy
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < maxRadius) {
          this.radius +=1;
      }
    }
    else if(this.radius > this.minRadius) {
      this.radius -=1;
    }
    this.draw();
  }
}


var circleArray = [];
for(var i=0; i<= 300; i++){
  var  radius = Math.random() * 7 +1;
  x = Math.random() * ( innerWidth - radius * 2 ) + radius,
  y = Math.random() * ( innerHeight - radius * 2 ) + radius,
  dx = ( Math.random() - 0.5 ),
  dy = ( Math.random() - 0.5 );

  circleArray.push(new Circle(x, y, dx, dy, radius));
}




function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);

  for(i=0; i< circleArray.length; i++){
    circleArray[i].update();
  }
}

animate()
