function operaciones(){

	const language = navigator.language.split("-")[0];

	document.querySelector(".about").firstElementChild.innerHTML = language == "es" ? `Todos los derechos reservados para "Ionic" y el uso de sus iconos "Ion-icons" &#169; <b class="year"></b>` : `Copyright "Ionic" and the use of its icons "Ion-icons" &#169; <b class="year"></b>`;
	document.querySelector(".year").innerHTML = new Date().getFullYear();

	
	document.querySelector(".darkMode").setAttribute("style",document.body.clientWidth <= 460 ? `width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;` : 'width: 320px;height: 40px');
	document.querySelector(".about-button").setAttribute("style",document.body.clientWidth <= 460 ? `width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;` : 'width: 320px;height: 40px');

	document.querySelector(".about-button").addEventListener("click",()=>{
		document.querySelector(".about").classList.toggle("showed");
	});

	document.querySelector(".darkMode").addEventListener("click",()=>{
		document.querySelector(".body").classList.toggle("dark-mode");
		localStorage.setItem("DarkMode",localStorage.getItem("DarkMode") == "false" ? "true" : "false");
	});

	let operation = {
		decimal:true,
    exponent:false,
    numberVia:true,
    lastText: '',
    parenthesis: true,
    reboot: false,
		simbol:false,
		sqcb:false
	};

	let text = document.getElementById("text");
	let buttons = document.querySelectorAll(".buttons");

function result(){
	operation.parenthesis = true;
	operation.exponent = false;
		let valor1 = "";
		let regex = /[⁰¹ᒾ³⁴⁵⁶⁷⁸⁹]/i;
		let regex2 = /[+-/*÷]/i;
		let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"]
		for (let i=0; i < text.value.length; i++){
			valor1 += text.value[i] == "÷" ? "/" : 
			(text.value[i+1] == "√" && text.value[i] == "³") ? "Math.cbrt" : 
			(text.value[i] == "√" && text.value[i-1] != "³") ? "Math.sqrt" :
			((text.value[i] == "√" && text.value[i-1] == "³") || (text.value[i] == "-" && text.value[i-1] == "(")) ? "" : 
			(text.value[i].search(regex) == 0 && text.value[i-1].search(regex) == -1) ? `**${array.indexOf(text.value[i])}` :
			(text.value[i].search(regex) == 0 && text.value[i-1].search(regex) == 0) ? `${array.indexOf(text.value[i])}` :
			(text.value[i] == "(" && text.value[i+1] == "-") ? "(-1*" :
			(text.value[i].search(regex2) == -1 && (text.value[i+1] == "(" || text.value[i+1] == "√")) ? `${text.value[i]}*` :
			text.value[i]; 
		}

		try {
			valor1 = eval(valor1);
		} catch (e) {
			let error = e.toString();
			if (error.includes("missing ) after argument list")){
				valor1+=")";
				valor1 = eval(valor1);
			}
		}
		operation.lastText = "";
		text.value = valor1.toString() == "Infinity" ? "Not calculable" : valor1;

		valor1 = text.value;

		try {
			if (text.value.split(".")[1]){
				let Ei = text.value.split(".")[1];
				Ei = Ei.includes("e") ? Ei.split("e")[0].slice(0,3) + "e" + Ei.split("e")[1] : Ei.slice(0,3);
				text.value = text.value.indexOf(".") ? text.value.split(".")[0] + "." + Ei : text.value;	
				valor1 = text.value;
			}
		} catch (e) {}
		
		operation.reboot = true;
}

function number(num){
	let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];
      
  if (operation.numberVia) {
    operation.parenthesis = operation.parenthesis === 'med' ? false : operation.parenthesis ;
    operation.simbol = true; operation.lastText = '';

  	if (operation.reboot) {
			if(!operation.exponent){
				text.value = '';
			} 
			operation.reboot = false;
		}
      
  	if(operation.exponent){
    	operation.decimal = false;
    	text.value += array[num];
    } else {
      text.value += num;
    }
  }
}

function simbol(sim){
	if(operation.simbol){
		text.value += sim;
		operation = {
			decimal: true,
			exponent: false,
			numberVia: true,
			lastText: '',
			parenthesis: 'med',
			reboot: false,
			simbol: false,
			sqcb: operation.sqcb
		};
	}
}

function guardar(){
	buttons.forEach(button=>{
		button.addEventListener("click",()=>{
			if (button.textContent === '√' || button.textContent === '³√'){
				operation.reboot = false;
				text.value += !operation.sqcb ? `${button.textContent}(` : ')';
				operation.simbol = !operation.sqcb ? false : true;
				operation.parenthesis = !operation.sqcb ? false : operation.parenthesis;
				operation.exponent = operation.sqcb ? false : operation.exponent;
				operation.numberVia = !operation.sqcb ? true : operation.exponent;
				operation.sqcb = !operation.sqcb ? true : false;
			} else if (button.textContent == "xⁿ"){
				if(operation.simbol){
					if(!operation.exponent){	
						operation.decimal = false;
						operation.exponent = true;
					}
				}
			} else if (button.textContent == "÷" || button.textContent == "*" || button.textContent == "-" || button.textContent == "+"){
				simbol(button.textContent);
			} else if (button.textContent == "±"){
				let array = ["⁰","¹","ᒾ","³","⁴","⁵","⁶","⁷","⁸","⁹"];
				if (text.value.length >=1){
					if (parseInt(text.value[text.value.length-1]) >= 0 && parseInt(text.value[text.value.length-1]) || array.includes(text.value[text.value.length-1]) <= 9){
						if (operation.lastText == ""){
							let regex = /[+-/*(]/i;
							lastText = text.value;
							text.value = text.value.replace(text.value.split(regex)[text.value.split(regex).length-1],`(-${text.value.split(regex)[text.value.split(regex).length-1]})`);
							operation.numberVia = false;
						} else {
							[lastText, text.value] = [text.value, lastText];
							operation.numberVia = operation.numberVia ? false : true;
						}
					}
				}
			} else if (parseInt(button.textContent) >= 0 && parseInt(button.textContent) <= 9){
				number(button.textContent);
			} else if (button.textContent == "."){
				if(operation.decimal){
					operation.decimal = false;
					text.value += ".";
				}
			} else if (button.textContent == "="){
				result();
			} else if (button.textContent == "C"){
				operation = {
					decimal:true,
					exponent:false,
					numberVia:true,
					lastText: '',
					parenthesis: true,
					reboot: false,
					simbol: false,
					sqcb: false
				};
				text.value = "";
			} else if (button.id == "BACK"){
				text.value = text.value.substring(0,text.value.length-1);
				if (text.value === ''){
					operation = {
						decimal:true,
						exponent:false,
						numberVia:true,
						lastText: '',
						parenthesis: true,
						reboot: false,
						simbol:false,
						sqcb:false
					};
				}
			} else if (button.textContent == "()") {
				text.value += operation.parenthesis === true ? "(" : operation.parenthesis === false ? ")" : '';
      	operation = {
        	decimal: operation.decimal,
        	exponent: operation.exponent,
        	numberVia: operation.parenthesis === true ? true : operation.parenthesis === false ? false : operation.numberVia,
        	lastText: '',
       		parenthesis: operation.parenthesis === true ? false : operation.parenthesis === false ? true : operation.parenthesis,
       		reboot: false,
        	simbol: operation.simbol,
        	sqcb: false
      	};
			} 

			if (text.value != "") {
				document.querySelector(".about-button").classList.add("d-none");
			} else document.querySelector(".about-button").classList.remove("d-none");
		})
	})
}

	guardar();

	window.addEventListener("keydown",(e)=>{
		let regex = /[()+*-/.0-9]/i;

		if (e.key == "Enter"){
			result();
		} else if (e.key == "Backspace"){
			text.value = text.value.substring(0,text.value.length-1);
		} else if (e.key.search(regex) == 0){
			text.value += e.key == "/" ? "÷" : e.key;
		}

		if (text.value != "") {
			document.querySelector(".about-button").classList.add("d-none");
		} else document.querySelector(".about-button").classList.remove("d-none");
	});
}

if (!localStorage.getItem("DarkMode")){
	localStorage.setItem("DarkMode","false");
} else {
	if (localStorage.getItem("DarkMode") == "true"){
		document.querySelector(".body").classList.add("dark-mode");	
	}
}

window.addEventListener("load",operaciones);

window.addEventListener("resize",()=>{
		document.querySelector(".darkMode").setAttribute("style",document.body.clientWidth <= 460 ? `width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;` : 'width: 320px;height: 40px');
		document.querySelector(".about-button").setAttribute("style",document.body.clientWidth <= 460 ? `width:${document.querySelectorAll(".buttons")[0].clientWidth}px !important;height:${document.querySelectorAll(".buttons")[0].clientHeight}px !important;` : 'width: 320px;height: 40px');
});