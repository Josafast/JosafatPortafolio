document.querySelector('.year').textContent = new Date().getFullYear();

document.querySelector('.help').addEventListener('click',()=>{
  document.querySelector('.about').classList.add('showed');
});

document.querySelector('.close').addEventListener('click',()=>{
  document.querySelector('.about').classList.remove('showed');
});

const ongoingTouches = [];

let canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const dif = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

const rangeInput = document.querySelector(".pixels");
const colorInput = document.querySelector(".color");
const cleaner = document.querySelector(".clean");
const cleanerTrash = document.querySelector(".colorTrash");
document.querySelector(".colorInput").style.backgroundColor = colorInput.value;
cleaner.style.backgroundColor = colorInput.value;
cleanerTrash.style.color = colorInput.value;

document.querySelector(".menu").addEventListener("click",()=>{
	document.querySelector(".box").classList.toggle("expanded");
});

let difX, difY;

let painting = false;

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}

const dibujar = (x1,y1,x2,y2,color,pixeles) =>{
	ctx.strokeStyle = color;
	ctx.lineWidth = pixeles;
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke(); 
};

function handleStart(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  console.log(touches);

  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, rangeInput.value/2, 1, 2 * Math.PI);  // a circle at the start
    ctx.fillStyle = colorInput.value;
    ctx.fill();
  }
}

function handleMove(evt){
	evt.preventDefault();
  	const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.beginPath();
      dibujar(ongoingTouches[idx].pageX,ongoingTouches[idx].pageY,touches[i].pageX, touches[i].pageY,colorInput.value,rangeInput.value);

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
    }
  }
}

canvas.addEventListener("click",(e)=>{
	ctx.beginPath();
	ctx.fillStyle = colorInput.value;
	ctx.arc(e.clientX-dif.left, e.clientY-dif.top, rangeInput.value/2, 1, 7);
	ctx.fill();
	ctx.closePath();
});

canvas.addEventListener("mousedown",(e)=>{
	document.querySelector(".box").classList.remove("expanded");	
	ctx.beginPath();
	ctx.fillStyle = colorInput.value;
	ctx.arc(e.clientX-dif.left, e.clientY-dif.top, rangeInput.value/2, 1, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
	difX = e.clientX - dif.left;
	difY = e.clientY - dif.top;
	painting = true;
	ctx.beginPath();
});

function handleEnd(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = rangeInput.value;
      ctx.fillStyle = colorInput.value;
      ctx.beginPath();
    	ctx.arc(touches[i].pageX, touches[i].pageY, rangeInput.value/2, 1, 2 * Math.PI);  // a circle at the start
    	ctx.fillStyle = colorInput.value;
    	ctx.fill(); // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } 
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

canvas.addEventListener("touchstart",handleStart,true);

canvas.addEventListener("mousemove",(e)=>{
	if (painting){
		dibujar(difX,difY,e.clientX-dif.left,e.clientY-dif.top,colorInput.value,rangeInput.value);
		difX = e.clientX - difX.left;
		difY = e.clientY - difY.top;
	}
});

canvas.addEventListener("touchmove",handleMove);

canvas.addEventListener("mouseup",()=>{
	ctx.closePath();
	painting = false;
});

canvas.addEventListener("touchend",handleEnd);

colorInput.addEventListener("input",(e)=>{
	document.querySelector(".colorInput").style.backgroundColor = e.target.value;
	cleaner.style.backgroundColor = e.target.value;
	cleanerTrash.style.color = e.target.value;
});

canvas.addEventListener("touchcancel",handleCancel);

cleaner.addEventListener("click",()=>ctx.clearRect(0,0,canvas.width,canvas.height));

window.addEventListener("resize",(e)=>{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

/*ctx.lineWidth = "6";
ctx.strokeStyle = "#48e";
ctx.fillStyle = "#26a";
ctx.strokeRect(30,50,100,50);
ctx.fillRect(20,40,100,50);

ctx.lineTo(50, 100);
ctx.lineTo(50, 120);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = "#0e0";
ctx.lineTo(200, 20);
ctx.lineTo(200, 40);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = "e00";
ctx.arc(100, 30, 10, 5, 12);
ctx.stroke();*/