window.addEventListener('load',async ()=>{

  document.querySelectorAll('.demoPassword').forEach(async (passw)=>{
		passw.textContent = await fetch('./users/password',{method: 'GET'})
		.then(res=> res.json())
		.then(res=> res.password);
	});

if (document.cookie){
  let users = await fetch('/users',{method: 'GET'}).then(res=> res.json());
  let user = users[users.findIndex(element=> element.email == document.cookie.split("=")[1])];

  document.querySelector('.usuario').textContent = user.name;
  document.querySelector('.email').value = user.email;

  document.querySelectorAll('.visible').forEach(boton=>{
    boton.addEventListener('click',()=>{
      boton.style.display = 'none';
      boton.nextElementSibling.style.display = 'inline-block';
      boton.previousElementSibling.type = 'text';
    });
  });

  document.querySelectorAll('.not-visible').forEach(boton=>{
    boton.addEventListener('click',()=>{
      boton.removeAttribute('style');
      boton.previousElementSibling.removeAttribute('style');
      boton.previousElementSibling.previousElementSibling.type = 'password';
    });
  });

  document.querySelector('.exit').addEventListener('click',()=>{
    document.cookie = `${document.cookie};max-age=0`;
    location.assign("/");
  });

  document.querySelector('.delete').addEventListener('click',()=>{
    if (user.email == 'demouser@email.com') return mostrar('no','Esta cuenta no debe eliminarse');

    fetch('/users',{method: 'DELETE', headers:{"Content-Type": "application/json"},body: JSON.stringify(user)})
    .then(res=> {
      document.cookie = `${document.cookie};max-age=0`;
      history.replaceState({mensaje: 'Cuenta eliminada',modo: 'delete'}, '', "/");
      history.go(0);
    });
  });

  document.querySelector('.submit').addEventListener('click',(e)=>{
    e.preventDefault();
    if (document.forms[0].oldPassword.value == '') return mostrar('no','el campo de la contraseña vieja está vacío'); else if (document.forms[0].newPassword.value == '') return mostrar ('El campo de la contraseña nueva está vacío');
    if (document.forms[0].oldPassword.value != user.password) return mostrar('no','La contraseña "vieja" no la posee el usuario'); else if (document.forms[0].newPassword.value == user.password) return mostrar('la contraseña nueva es la misma que la anterior');
    if (document.forms[0].newPassword.value.length < 6) return mostrar('no','la contraseña no puede tener menos de 6 caracteres'); else if (document.forms[0].newPassword.value.length > 12) return mostrar('no','La contraseña no puede contener más de 12 caracteres');
    let User = user; User.password = document.forms[0].newPassword.value;
    fetch('./users/password',{method: 'PUT',headers: { "Content-Type": "application/json"},body: JSON.stringify(User)})
      .then(res=> res.json()).then(res=> {
        history.replaceState({mensaje: res.msg}, '', '/login');
        history.go(0);
      });
    });
  }
  
  try {
    if (history.state.mensaje != undefined && history.state.mensaje != null){
      mostrar('edit',history.state.mensaje);
      history.replaceState({}, '', '/login');
    }
  } catch(err) {}
});