"use strict";

let wordle;

class Wordle {
	constructor(){
		fetch("./words",{method: 'GET'}).then(res=>res.text()).then(res=>{
			this.word = res.toUpperCase();
			console.log(this.word);
			this.attemps = [(this.word.length <=5 ? 5 : this.word.length+1),this.word.length];
			this.wordAttemps;
			this.aprobed = [1];
			this.createWord();
		});
	}

	Aprobed(){
		return this.aprobed[0]
	}

	Finally(yesorno){
		let div = document.createElement("DIV");
		div.classList.add("wordle__message");
		let close = document.createElement("SPAN");
		let img = document.createElement("IMG");
		img.setAttribute("src","img/svg/close.svg");
		close.appendChild(img);
		close.classList.add("icon");
		close.classList.add("close-message");

		let h1 = document.createElement("H1");
		h1.textContent = yesorno == "yes" ? "¡Has encontrado la palabra!" : "No encontraste la palabra...";
		let h2 = [document.createElement("H2"),document.createElement("H2")];
		h2[0].classList.add("wordparraf");
		h2[0].textContent = `La palabra era: ${this.word}`;
		h2[1].textContent = "¿Y si volvemos a jugar?";

		let button = document.createElement("BUTTON");
		button.textContent = "Volver a jugar";
		button.classList.add("play");

		div.appendChild(close);
		div.appendChild(h1);
		div.appendChild(h2[0]);
		div.appendChild(h2[1]);
		div.appendChild(button);

		document.querySelector(".wordle__main").appendChild(div);

		document.querySelector(".close-message").addEventListener("click",()=>{
			document.querySelector(".wordle__message").style.animation = "close 0.2s forwards";
		});

		document.querySelector(".wordle__message").children[4].addEventListener("click",()=>location.reload());
	}

	createWord(){
		document.querySelector(".wordle__word-box").innerHTML = "";

		let fragment = document.createDocumentFragment();
		for (let i=0;i<(this.word.length <=5 ? 5 : this.word.length+1);i++){
			let letters = document.createElement("DIV");
			letters.classList.add("wordle__word-letters");

			let fragmentLetter = document.createDocumentFragment();
			for (let i=0;i<this.word.length;i++){
				let lett = document.createElement("H3");
				lett.classList.add("wordle__word-letter");
				fragmentLetter.appendChild(lett);
			}

			letters.appendChild(fragmentLetter);
			fragment.appendChild(letters);
		}
		document.querySelector(".wordle__word-box").appendChild(fragment);
		this.wordAttemps = document.querySelectorAll(".wordle__word-letters");
	}

	Press(letter){
		letter = letter.toUpperCase();
		let allword = this.wordAttemps[this.wordAttemps.length-this.attemps[0]].children;

		if (letter == "BACKSPACE"){
			let j = this.word.length-this.attemps[1]-1;
			if (this.attemps[1] >= 0 && this.attemps[1] < this.word.length){
				allword[j].textContent = "";
				allword[j].classList.remove("writed");
				this.attemps[1]++;
				return
			}
			return
		} else if (letter == "ENTER"){
			let keY = document.querySelectorAll(".wordle__key");
			let Key = [];
			keY.forEach(key=>{
				Key.push(key.id);
			});
			let complete = 0;
			let word = this.word;
			if (this.attemps[1] == 0){
				for (let i=0; i<allword.length;i++){
					allword[i].classList.remove("writed");
					let key = keY[Key.indexOf(allword[i].textContent)]
					if (word.includes(allword[i].textContent)){
						if (key.classList.contains("not-here") || key.classList.contains("incorrect") || key.classList.contains("correct")){
							key.removeAttribute("class");
							key.setAttribute("class","wordle__key");
						}
						if (allword[i].textContent == this.word.split("")[i]){
							allword[i].classList.add("correct");
							key.classList.add("correct");
							complete++;
						} else {
							allword[i].classList.add("not-here");
							key.classList.add("not-here");
						}
					} else {
						allword[i].classList.add("incorrect");
						key.classList.add("incorrect");
					}
				}

				if (complete == this.word.length){
					this.Finally("yes");

					for (let key in keY){
						try {
							keY[key].classList.add("disabled");
						} catch (e) {}
					}
					this.aprobed[0]--;
					return
				}

				if (this.attemps[0] <= 1){
					this.Finally("no");

					for (let key in keY){
						try {
							keY[key].classList.add("disabled");
						} catch (e) {}
					}
					this.aprobed[0]--;
					return
				}

				this.attemps[0]--;
				this.attemps[1] = this.word.length;
				return;
			}
		} else {
			let j = this.word.length-this.attemps[1];
			if (this.attemps[1] > 0){
				allword[j].textContent = letter;
				allword[j].classList.add("writed");
				allword[j].setAttribute("style","animation:expand 0.2s forwards");
				setTimeout(()=>allword[j].removeAttribute("style"),200);
				this.attemps[1]--;
				return
			}
		}
	}

	Help(){
		if (!document.querySelector(".wordle__help")){
			let div = document.createElement("DIV");
			div.classList.add("wordle__help");

			let close = document.createElement("SPAN");
			close.classList.add("icon");
			close.classList.add("close-help");
			let img = document.createElement("IMG");
			img.setAttribute("src","img/svg/close.svg");
			close.appendChild(img);

			let title = document.createElement("H1");
			title.textContent = "CÓMO JUGAR";

			let h3 = [];
			for (let i=0; i<7; i++){
				h3.push(document.createElement("H3"));
			}

			let letters = [];
			for (let i=0; i<15; i++){
				let words = 'LETRAVOCALJUGAR'.split("");
				letters.push(document.createElement("H3"));
				letters[i].classList.add("wordle__word-letter-demo");
				letters[i].textContent = words[i];


				letters[i].classList.add(i == 0 ? "correct" : i == 7 ? "not-here" : i == 13 ? "incorrect" : "writed");
			}

			let demos = [];
			for (let i=0; i<3; i++){
				demos.push(document.createElement("DIV"));
			
				if (i == 0){
					for (let j=0; j<5; j++){
						demos[i].appendChild(letters[j]);
					}
				} else if (i == 1) {
					for (let j=5; j<10; j++){
						demos[i].appendChild(letters[j]);
					}
				} else if (i == 2){
					for (let j=10; j<15; j++){
						demos[i].appendChild(letters[j]);
					}
				}
			}

			h3[0].textContent = "Descubre la palabra escondida en por lo menos 6 intentos";
			h3[1].textContent = "Después de cada intento, el color de las casillas te dirá que tan cerca has estado de encontrar la palabra";
			h3[2].textContent = "Por ejemplo:";
			h3[3].innerHTML = `La letra <b>L</b> está en la palabra y en la posición correcta`;
			h3[4].innerHTML = `La <b>C</b> está en la palabra pero en una posición incorrecta`;
			h3[5].innerHTML = `La <b>A</b> no está en la palabra`;
			h3[6].innerHTML = `Puedes pulsar <b>X</b> en la esquina superior derecha o en el botón de abajo para comenzar a jugar`;

			let boton = document.createElement("BUTTON");
			boton.textContent = "Comenzar a jugar";
			boton.classList.add("play");

			div.appendChild(close);
			div.appendChild(title);

			for (let arr in h3){
				if (arr == 3){
					div.appendChild(demos[0]);
				}

				if (arr == 4){
					div.appendChild(demos[1]);
				}

				if (arr == 5){
					div.appendChild(demos[2]);
				}

				div.appendChild(h3[arr]);
			}

			div.appendChild(boton);
			document.querySelector(".wordle__main").appendChild(div);
		} 
	}

	Menu(){
		if (!document.querySelector(".wordle__menu")){
			let div = document.createElement("DIV");
			div.classList.add("wordle__menu");

			let close = document.createElement("SPAN");
			let img = document.createElement("IMG");
			img.setAttribute("src","img/svg/close.svg");
			close.classList.add("icon");
			close.classList.add("close-menu");
			close.appendChild(img);

			let title = document.createElement("H1");
			title.textContent = "OPCIONES";

			let buttons = [];
			for (let i=0; i<4; i++){
				let button = document.createElement("BUTTON");
				button.classList.add("wordle__menu-button");

				for (let j=0; j<2; j++){
					let span = document.createElement("SPAN");
					let img = document.createElement("IMG");
					span.classList.add("icon");

					if (i == 1){
						if (j == 0){
							span.classList.add("daltonic-mode");
							img.setAttribute("src","img/svg/checkmark-sharp.svg");
							span.appendChild(img);
							button.appendChild(span);
						}	
					} else if (i == 0){
						if (j == 0){
							span.classList.add("moon");
							img.setAttribute("src","img/svg/moon-outline.svg");
							span.appendChild(img);
							button.appendChild(span);
						} else if (j == 1){
							span.classList.add("sun");
							img.setAttribute("src","img/svg/sunny-outline.svg");
							span.appendChild(img);
							button.appendChild(span);
						}
					} else if (i == 2){
						if (j == 0){
							span.classList.add("fullscreen-off");
							img.setAttribute("src","img/svg/expand-outline.svg");
							span.appendChild(img);
							button.appendChild(span);
						} else if (j == 1){
							span.classList.add("fullscreen-on");
							span.classList.add("d-none");
							img.setAttribute("src","img/svg/contract-outline.svg");
							span.appendChild(img);
							button.appendChild(span);
						}
					} else if (i == 3){
						if (j == 0){
							span.classList.add("credits");
							img.setAttribute('src',"img/svg/information-outline.svg");
							span.appendChild(img);
							button.appendChild(span);
						}
					}
				}

				button.classList.add(i == 0 ? "dark-mode-button" : i == 1 ? "daltonic-mode-button" : i == 2 ? "fullscreen" : "credits-button");
				let text = i == 0 ? "Alternar modo oscuro" : i == 1 ? "Alternar modo para daltónicos" : i == 2 ? "Alternar modo pantalla completa" : "Créditos";
				button.innerHTML += text;
				buttons.push(button);
			}

			div.appendChild(close);
			div.appendChild(title);

			for (let arr in buttons){
				div.appendChild(buttons[arr]);
			}

			document.querySelector(".wordle__main").appendChild(div);
		}
	}

	Credits(){
		if (!document.querySelector('.wordle__credits')){
			let div = document.createElement("DIV");
			div.classList.add("wordle__credits");

			let close = document.createElement("SPAN");
			let img = document.createElement("IMG");
			img.setAttribute("src","img/svg/close.svg");
			close.classList.add("icon");
			close.classList.add("close-credits");
			close.appendChild(img);

			let Back = document.createElement("SPAN");
			img = document.createElement("IMG");
			img.setAttribute("src","img/svg/arrow-back.svg");
			Back.classList.add("icon");
			Back.classList.add("back-to-menu");
			Back.appendChild(img);

			let title = document.createElement("H1");
			title.textContent = "CRÉDITOS";

			let divs = document.createElement('div');

			let h3 = document.createElement('h3');
			h3.textContent = `Todos los derechos reservados para "Ionic" y el uso de sus iconos "Ion-Icons" © ${new Date().getFullYear()}`;
			let h32 = document.createElement('h3');
			h32.textContent = `Homenaje al juego hecho por "Josh Wardle" del mismo nombre, ahora propiedad de "The New York Times Company" desde 2022`;

			divs.appendChild(h3);
			divs.appendChild(h32);

			div.appendChild(close);
			div.appendChild(Back);
			div.appendChild(title);

			div.appendChild(divs);

			document.querySelector(".wordle__main").appendChild(div);
		} else {
			document.querySelector('.wordle__credits').style.animation = "show 0.2s forwards";
		}
	}
}

document.querySelectorAll(".wordle__key").forEach(key=>{
	key.addEventListener("click",()=>{
		let regex = /^[A-Z]/i;

		if (key.id.search(regex) == 0){
			wordle.Press(key.id);
		}

		key.setAttribute("style","animation: press 0.2s forwards;");
		setTimeout(()=>key.removeAttribute("style"),200);
	});
});

window.addEventListener("keydown",(e)=>{
	let regex = /^[A-Z]/i;

	console.log(wordle.Aprobed());
	if (wordle.Aprobed() == 1) {
		if ((e.key.search(regex) == 0 && e.key.length == 1) || e.key == "Backspace" || e.key == "Enter"){
			wordle.Press(e.key);
		}

		if (e.key == " "){
			return
		}

		try {
			document.getElementById(e.key.toUpperCase()).setAttribute("style","animation: press 0.2s forwards;");
			setTimeout(()=>document.getElementById(e.key.toUpperCase()).removeAttribute("style"),200);
		} catch(e){
			return
		}
	}
});

document.querySelector(".help").addEventListener("click",async ()=>{
	await wordle.Help();
	document.querySelector(".wordle__help").style.animation = "show 0.2s forwards";
	document.querySelector('.wordle__footer').style = "";
	document.querySelector(".close-help").addEventListener("click",(e)=>{
		document.querySelector(".wordle__help").style.animation = "close 0.2s forwards";
		document.querySelector('.wordle__footer').style = "display:none;";
	});
	document.querySelector(".play").addEventListener("click",()=>location.reload());
});

document.querySelector(".menu").addEventListener("click",async ()=>{
	document.querySelector('.wordle__footer').style = "";
	await wordle.Menu();
	document.querySelector(".wordle__menu").style.animation = "show 0.2s forwards";
	document.querySelector(".close-menu").addEventListener("click",(e)=>{
		document.querySelector(".wordle__menu").style.animation = "close 0.2s forwards";
		document.querySelector('.wordle__footer').style = "display:none;";
	});
	document.querySelector(".dark-mode-button").addEventListener("click",(e)=>{
		localStorage.setItem("darkMode",localStorage.getItem("darkMode") == "true" ? "false" : "true");
		document.querySelector("body").classList.toggle("dark-mode");
	});
	document.querySelector(".daltonic-mode-button").addEventListener("click",(e)=>{
		localStorage.setItem("daltonicMode",localStorage.getItem("daltonicMode") == "true" ? "false" : "true");
		document.querySelector("body").classList.toggle("daltonico");
	});
	document.querySelector(".fullscreen").addEventListener("click",()=>{
		if (!document.fullscreenElement) {
     		document.documentElement.requestFullscreen();
  		} else {
    		if (document.exitFullscreen) {
    			document.exitFullscreen();
   			}
		}
	});
	document.querySelector('.credits-button').addEventListener("click",async (e)=>{
		document.querySelector(".wordle__menu").style.animation = "close 0.2s forwards";
		await wordle.Credits();
		document.querySelector('.close-credits').addEventListener('click',(e)=>{
			document.querySelector('.wordle__credits').style.animation = "close 0.2s forwards";
			document.querySelector('.wordle__footer').style = "display:none;";
		});
		document.querySelector('.back-to-menu').addEventListener('click',(e)=>{
			document.querySelector('.wordle__credits').style.animation = "close 0.2s forwards";
			document.querySelector('.wordle__menu').style.animation = "show 0.2s forwards";
		});
	});
});

window.addEventListener("fullscreenchange",(e)=>{
	document.querySelector(".fullscreen-off").classList.toggle("d-none");
	document.querySelector(".fullscreen-on").classList.toggle("d-none");
});

wordle = new Wordle();

window.addEventListener("load",()=>{
	if (localStorage.length != 0){
		try {
			document.querySelector("body").classList.add(localStorage.getItem("darkMode") == "true" ? "dark-mode": "");
			document.querySelector("body").classList.add(localStorage.getItem("daltonicMode") == "true" ? "daltonico": "");
		} catch(e){}
	} else {
		localStorage.setItem("darkMode","false");
		localStorage.setItem("daltonicMode","false");
	}
});