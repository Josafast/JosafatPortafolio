"use strict";

window.addEventListener('load',()=>{
	if (document.cookie){
		location.assign('/login');
	}

	try {
		if (history.state.mensaje != undefined && history.state.mensaje != null){
			mostrar(history.state.modo,history.state.mensaje);
			history.replaceState({}, '', '/');
		}
	} catch(err) {}

	document.querySelectorAll('.demoPassword').forEach(async (passw)=>{
		passw.textContent = await fetch('./users/password',{method: 'GET'})
		.then(res=> res.json())
		.then(res=> res.password);
	});

	let users;
	
	const body = document.querySelector(".body");
	const visible = document.querySelectorAll(".visible");
	const not_visible = document.querySelectorAll(".not-visible");
	const password = document.querySelectorAll(".password");
	
	const visibles = [];
	const not_visibles = [];
	const passwords = [];
	visible.forEach(visible=>visibles.push(visible));
	not_visible.forEach(not_visible=>not_visibles.push(not_visible));
	password.forEach(password=>passwords.push(password));
	
	const comprobarDatos = async (users, logSign, userData)=>{
		userData = logSign == 'loger' ? {"email": userData.loginEmail,"password": userData.loginPassword} : {"name": userData.signUser, "email": userData.signEmail, "password": userData.signPassword};
		if (logSign == 'loger'){
			let ok = [];
			ok[0] = users.findIndex(element => element.email == userData.email) != -1 ? true : false;
			ok[1] = users.findIndex(element => element.password == userData.password) != -1 ? true : false;
		
			if (!ok[0]) return mostrar('no','Este correo no pertenece a ningún usuario');
			if (!ok[1]) return mostrar('no','Está ingresando una contraseña incorrecta');
		
			history.pushState({}, '', '/login');
			document.cookie = `email=${users[users.findIndex(element => element.email == userData.email)].email}`;
			history.go(0);
		} else {
			if (userData.password.length < 6) return mostrar('no','La contraseña no puede contener menos de 6 caracteres'); else if (userData.password.length > 12) return mostrar('no','La contraseña no puede contener más de 12 caracteres');

			let ok = [];
			ok[0] = users.findIndex(element => element.name == userData.name) != -1 ? true : false;
			ok[1] = users.findIndex(element => element.email == userData.email) != -1 ? true : false;

			if (ok[0]) return mostrar('no','Este usuario ya existe');
			if (ok[1]) return mostrar('no','Este correo ya pertenece a un usuario');
		
			fetch('/users',{method: 'POST',headers:{"Content-Type":"application/json"},body:JSON.stringify(userData)})
				.then(res=> res.text())
				.then(res=> {
					history.replaceState({mensaje: res,modo: 'add'}, '', '/');
					history.go(0);
				});
		}
	}
	
	for(let i=0;i<3;i++){
		visibles[i].addEventListener("click",()=>{
			visibles[i].style.display = "none";
			not_visibles[i].style.display = "inline";
			passwords[i].type = "text";
		});
	
		not_visibles[i].addEventListener("click",()=>{
			not_visibles[i].style.display = "none";
			visibles[i].style.display = "inline";
			passwords[i].type = "password";
		});
	}
	
	document.querySelector(".sign").addEventListener("click",()=>{
		body.classList.add("active");
	});
	
	document.querySelector(".log").addEventListener("click",()=>{
		body.classList.remove("active");
	});
	
	document.querySelectorAll('.formulario').forEach(form=>{
		form.addEventListener('submit',async (e)=>{
			e.preventDefault();
			let forme = await (e.target.id == 'loger' ? {
				"loginEmail" : document.forms[e.target.id].children[1].children[0].value,
				"loginPassword" : document.forms[e.target.id].children[2].children[0].children[0].value
			} : {
				"signUser" : document.forms[e.target.id].children[1].children[0].value,
				"signEmail" : document.forms[e.target.id].children[2].children[0].value,
				"signPassword" : document.forms[e.target.id].children[3].children[0].children[0].value,
				"signPasswordConfirm" : document.forms[e.target.id].children[4].children[0].children[0].value 
			});
		
			let message = e.target.id == 'loger' ?
				(!forme.loginEmail ? 
					'El campo del correo está vacío' : 
				!forme.loginPassword ? 
					'El campo de la contraseña está vacío' : '') : 
				(!forme.signUser ?
					'El campo del usuario está vacío' :
				!forme.signEmail ?
					'El campo del correo está vacío' :
				!forme.signPassword ?
					'El campo de la contraseña está vacío' :
				!forme.signPasswordConfirm ? 
					'El campo de confirmación debe llenarse obligatoriamente' : 
				forme.signPassword != forme.signPasswordConfirm ? 
					'Las contraseñas no coinciden entre sí' : '');
				
			if (message) return mostrar('no',message);
			
			users = !users ? await fetch('/users',{method: 'GET'}).then(res=> res.json()) : users;
			comprobarDatos(users, e.target.id, forme);
		});
	});
});