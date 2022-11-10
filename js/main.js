let proyects = [
  {
    proyectName: "calculator",
    name: "Calculadora",
    description: 'Además de poder realizar las operaciones básicas, fueron integradas raíces y potencias a su capacidad de resolución, variar un número entre positivo y negativo (más o menos), y el uso de paréntesis para enfocar una ecuación concreta. En su interfaz existe la opción de "Modo oscuro", para mayor comodidad.',
    links: ['https://josafast.github.io/Calculator','https://github.com/Josafast/Calculator'],
    video: 'video/calculadora.mp4',
    percent: [0, 20, 70, 50]
  },
  {
    proyectName: "tasktodo",
    name: "Lista de tareas",
    description: 'Escribe cualquier obligación y agrégala, márcala en caso de que esté completada, o bórrala de tu lista si no la necesitas; cambia su nombre y despliega el cuadro de escritura libre para dar más detalles. Fue creado con la nueva incorporación "Bases de Datos Indexadas" (indexedDB), donde los datos solo se guardan en tu navegador y solo tú puedes verlos.',
    links: ['https://josafast.github.io/TaskToDo','https://github.com/Josafast/TaskToDo'],
    video: 'video/tareas.mp4',
    percent: [0, 30, 50, 80]
  },
  {
    proyectName: "canvaspaint",
    name: "Paint",
    description: 'Creado apartir de la API "Canvas", dibuja libremente a través de toda la pantalla sin restricciones. Elige el color y tamaño que desees, o vuelve a empezar. ¡Diviertete!',
    links: ['https://josafast.github.io/CanvasPaint','https://github.com/Josafast/CanvasPaint'],
    video: 'video/paint.mp4',
    percent: [0, 10, 30, 70]
  },
  {
    proyectName: "login",
    name: "Inicio de sesión",
    description: 'Como cualquier otra página de este tipo, ingresa con un correo electrónico y contraseña o regístralos en el programa. Viene integrado por defecto una cuenta para su demostración. Solo tienes la capacidad de: Cambiar contraseña y borrar tu cuenta. Aquí solo se utiliza además de JavaScript, NodeJs y JSON. Por favor no guardes ningún tipo de información personal.',
    links: ['https://loginnodejswithjson.herokuapp.com','https://github.com/Josafast/LoginNodejs'],
    video: 'video/login.mp4',
    percent: [60, 30, 60, 100]
  },
  {
    proyectName: "wordle",
    name: "Wordle",
    description: 'Inspirado en el juego de "Josh Wardle". Parecido a un crucigrama, recibirás pistas que te ayuden a encontrar la palabra escondida y ganar. Hecho en JavaScript puro. También posee un "Modo Oscuro" y un "Modo para Daltónicos".',
    links: ['http://jwordlee.herokuapp.com','https://github.com/Josafast/JWordle'],
    video: 'video/wordle.mp4',
    percent: [10, 30, 50, 100]
  },
];

let proyecto = "";

if (window.innerWidth >= 991){
  document.querySelector('#foto1').style.display = 'none';
}

window.addEventListener('load',()=>{
  document.querySelector('#user').addEventListener('click',()=>window.scroll(0, 20));

  window.addEventListener('resize',()=>{
    if (window.innerWidth >= 991){
      document.querySelector('#foto1').style.display = 'none';
    } else {
      document.querySelector('#foto1').removeAttribute('style');
    }
  });

  const verifyVisibility = (entrys)=>{
    entrys.forEach(entry=>{
      if (entry.isIntersecting) {
        console.log("Se está viendo la caja: " + entry.target.className.split(' ')[1]);
        document.querySelectorAll('.nav-element').forEach(element=>{
          let navelement = [];
          document.querySelectorAll('.nav-element').forEach(arr=> navelement.push(arr.id.toLowerCase()))
        
          element.classList.remove('active');
          document.querySelectorAll('.nav-element')[navelement.findIndex(element=> element == entry.target.className.split(' ')[1])].classList.add('active');
        });
      };
    });
  };  

  const observer = new IntersectionObserver(verifyVisibility,{threshold: 0.5});
  let si = 1;

  let interval = setInterval(()=>{
    let array = "WORDLE";
    let wordle = document.querySelector('.wordle');

    wordle.textContent = wordle.textContent == "E" ? array[0] : array[array.indexOf(wordle.textContent) + 1];
  },2000);

  document.querySelectorAll('.portafolio__main-sections').forEach(element=>{
    observer.observe(element);
  });

  document.querySelectorAll('.portafolio__menu').forEach(button=>{
    button.addEventListener('click',(e)=>{
      if (e.target.parentElement.classList.contains('home')) {window.scroll(0,0);return;}  

      if (e.target.parentElement.classList.contains('menu')){
        document.querySelector('.portafolio__nav').classList.add('active');
        return;
      }

      if (document.querySelector('.proyect-demo').classList.contains('active')){
        let page = proyects.findIndex(element=>element.proyectName == proyecto);
        page = e.target.parentElement.classList.contains('backer') ? page-1 : page+1;
        let proyect = proyects[e.target.parentElement.classList.contains('backer') ? (page == -1 ? proyects.length-1 : page) : (page == proyects.length ? 0 : page)];
        proyecto = proyect.proyectName;

        document.querySelector('.proyect-demo').classList.add('active');
        document.querySelector('.proyect-demo-title').textContent = proyect.name;
        document.querySelector('.proyect-demo-description').textContent = proyect.description;
        document.querySelector('.proyect-link').setAttribute("href",proyect.links[0]);
        document.querySelector('.proyect-repo').setAttribute("href",proyect.links[1]);
        document.querySelector('.video').src = proyect.video;
        for(let i=0; i<4; i++){
          let tamaño = window.innerWidth <= 455 ? document.querySelector('.proyect-demo-lenguages__percent').children[i].clientHeight : 55;
          document.querySelector('.proyect-demo-lenguages__percent-grade').children[i].textContent = proyect.percent[i] + '%';
          document.querySelector('.proyect-demo-lenguages__percent').children[i].style.top = `${proyect.percent[i] != 0 ? tamaño-(proyect.percent[i]*tamaño/100) : 0}px`;
          document.querySelector('.proyect-demo-lenguages__percent').children[i].children[0].setAttribute('viewBox',`0 ${proyect.percent[i] != 0 ? (100-proyect.percent[i])*512/100 : 512} 512 512`);
        }
        return;
      }
    });
  });

  document.querySelector('.portafolio__nav-close').addEventListener('click',()=>{
    document.querySelector('.portafolio__nav').classList.remove('active');
  });

  document.querySelector('.proyect-demo-close').addEventListener('click',()=>{
    document.querySelector('.proyect-demo').classList.remove('active');
  });

  document.querySelectorAll('.nav-element').forEach(element=>{
    element.addEventListener('click',(e)=>{
      let scrolltop = window.scrollY;
      window.scroll(0,e.target.id == "Home" ? 0 : e.target.id == "AboutMe" ? 20 : e.target.id == "Proyects" ? (window.innerWidth >= 991 ? document.querySelector('.portafolio__main').scrollHeight : window.innerHeight) : window.innerHeight);

      if (e.target.id == 'ContactMe'){
        document.querySelector('.portafolio__footer').classList.add('active');
      }
      document.querySelector('.portafolio__nav').classList.remove('active');
      document.querySelector('.proyect-demo').classList.remove('active');
    });
  });

  document.querySelectorAll('.proyect-info').forEach(element=>{
    element.addEventListener('click',function (){
      let proyect = proyects[proyects.findIndex(element=>element.proyectName == this.id)];

      document.querySelector('.proyect-demo').classList.add('active');
      document.querySelector('.proyect-demo-title').textContent = proyect.name;
      document.querySelector('.proyect-demo-description').textContent = proyect.description;
      document.querySelector('.proyect-link').setAttribute("href",proyect.links[0]);
      document.querySelector('.proyect-repo').setAttribute("href",proyect.links[1]);
      document.querySelector('.video').src = proyect.video;
      for(let i=0; i<4; i++){
        let tamaño = window.innerWidth <= 455 ? document.querySelector('.proyect-demo-lenguages__percent').children[i].clientHeight : 55;
        document.querySelector('.proyect-demo-lenguages__percent-grade').children[i].textContent = proyect.percent[i] + '%';
        document.querySelector('.proyect-demo-lenguages__percent').children[i].style.top = `${proyect.percent[i] != 0 ? tamaño-(proyect.percent[i]*tamaño/100) : 0}px`;
        document.querySelector('.proyect-demo-lenguages__percent').children[i].children[0].setAttribute('viewBox',`0 ${proyect.percent[i] != 0 ? (100-proyect.percent[i])*512/100 : 512} 512 512`);
      }
    });
  });

  document.querySelectorAll('.proyect-icon').forEach(element=>{
    element.addEventListener('click',function (){
      if (window.innerWidth >= 991) window.scroll(0, document.body.scrollHeight - 1);

      document.querySelectorAll('.proyect-icon').forEach(element=>{
        element.classList.remove('visualizate');
        this.classList.add('visualizate');
      });

      let proyect = proyects[proyects.findIndex(element=>element.proyectName == this.classList[1])];
      proyecto = proyect.proyectName;

      document.querySelector('.proyect-demo').classList.add('active');
      document.querySelector('.proyect-demo-title').textContent = proyect.name;
      document.querySelector('.proyect-demo-description').textContent = proyect.description;
      document.querySelector('.proyect-link').setAttribute("href",proyect.links[0]);
      document.querySelector('.proyect-repo').setAttribute("href",proyect.links[1]);
      document.querySelector('.video').src = proyect.video;
      for(let i=0; i<4; i++){
        let tamaño = window.innerWidth <= 455 ? document.querySelector('.proyect-demo-lenguages__percent').children[i].clientHeight : 55;
        document.querySelector('.proyect-demo-lenguages__percent-grade').children[i].textContent = proyect.percent[i] + '%';
        document.querySelector('.proyect-demo-lenguages__percent').children[i].style.top = `${proyect.percent[i] != 0 ? tamaño-(proyect.percent[i]*tamaño/100) : 0}px`;
        document.querySelector('.proyect-demo-lenguages__percent').children[i].children[0].setAttribute('viewBox',`0 ${proyect.percent[i] != 0 ? (100-proyect.percent[i])*512/100 : 512} 512 512`);
      }
    });
  });

  document.querySelector('.first-up').addEventListener('click',()=>{
    document.querySelector('.portafolio__footer').classList.remove('active');
  });

  document.querySelector('.portafolio-finally').addEventListener('click',()=>{
    document.querySelector('.proyect-demo').classList.remove('active');
    document.querySelector('.portafolio__footer').classList.add('active');
  });

  window.addEventListener('scroll',()=>{
    document.querySelector('.proyect-demo').classList.remove('active');
    let maxiY = document.body.scrollHeight - window.innerHeight - 1;

    if (window.scrollY >= 1){
      if (si == 1){
        window.scroll(0,20);
        document.querySelector('.portafolio__header').classList.add('sticky-mode');
        document.querySelector('.portafolio__body').style.overflow = "hidden";
        setTimeout(()=>{
          document.querySelector('.portafolio__body').removeAttribute('style');
        },1000);
      }
      si = 0;
    } else {
      document.querySelector('.portafolio__header').classList.remove('sticky-mode');
      si = 1;
    }

    if (window.scrollY >= maxiY) {
      document.querySelector('.portafolio-finally').style = 'bottom: 0 !important;';
    } else document.querySelector('.portafolio-finally').removeAttribute('style'); 
  });

  window.scroll(0, 0);
});