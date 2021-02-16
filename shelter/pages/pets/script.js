let pets = [
  {
    "name": "Jennifer",
    "img": "../../assets/images/pets-jennifer.jpg",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/pets-sophia.jpg",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/pets-woody.jpg",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/pets-scarlet.jpg",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/pets-katrine.jpg",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/pets-timmy.jpg",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/pets-freddie.jpg",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/pets-charly.jpg",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
]


let navSlide = () => {
  const html = document.querySelector('html');
  const header = document.querySelector('header');
  const burger = document.querySelector('.burger');
  const navigation = document.querySelector('.nav');
  const burgerImage = document.querySelector('.burger__image');
  const overlay = document.querySelector('#overlay');
  const headerLogo = document.querySelector('.header__logo');
  const navigationLogo = document.querySelector('.nav__logo');

  burger.addEventListener('click', () => {
    navigation.classList.toggle('nav--active');
    burgerImage.classList.toggle('burger__image--active');
    overlay.classList.toggle('overlay--active');
    headerLogo.classList.toggle('header__logo--active');
    navigationLogo.classList.toggle('nav__logo--active');
    html.classList.toggle('html--active');
    header.classList.toggle('header--active');

  })

  overlay.addEventListener('click', () => {
    navigation.classList.toggle('nav--active');
    burgerImage.classList.toggle('burger__image--active');
    overlay.classList.toggle('overlay--active');
    headerLogo.classList.toggle('header__logo--active');
    navigationLogo.classList.toggle('nav__logo--active');
    html.classList.toggle('html--active');
    header.classList.toggle('header--active');
})
}

function showPopup() {
  const html = document.querySelector('html');
  const openPopupButtons = document.querySelectorAll('[data-popup-target]');
  const closePopupButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.querySelector('#overlay2');
  const body = document.querySelector('body');

  overlay.addEventListener('click', () => {
    const activePopups = document.querySelectorAll('.popup--active');
    activePopups.forEach(popup => {
      closePopup(popup);
    });
  });

  overlay.addEventListener('mouseover', () => {
    closePopupButtons.forEach(button => {
      button.classList.add('button-close--active');
    });

  })

  overlay.addEventListener('mouseout', () => {
    closePopupButtons.forEach(button => {
      button.classList.remove('button-close--active');
    });
  })

  openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = document.querySelector(button.dataset.popupTarget);
      openPopup(popup);
    });
  });

  closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup')
      closePopup(popup);
    });
  });

  function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('popup--active');
    overlay.classList.add('overlay--active');
    body.classList.add('body--active');
    html.classList.add('html--active');
  }

  function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('popup--active');
    overlay.classList.remove('overlay--active');
    body.classList.remove('body--active');
    html.classList.remove('html--active');
  }
}
const header = document.querySelector('header');
let sticky = header.offsetTop;
window.onscroll = () => {
  if (window.pageYOffset >= sticky) {
    header.classList.add("header--sticky")
  } else {
    header.classList.remove("header--sticky");
  }
}


const petCards = document.querySelector('.pet-cards');

petCards.addEventListener('click', (event) => {

  let currentObj;

  let petName = event.target.closest('div').childNodes[3].innerText;
  console.log(petName)
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].name === petName) currentObj = pets[i];
  }


  let popup = document.querySelector('.popup');

  let image = document.querySelector('[data-popup-image]');
  let title = document.querySelector('[data-popup-title]');
  let subtitle = document.querySelector('[data-popup-subtitle]');
  let petDescription = document.querySelector('[data-popup-pet-description]');
  let age = document.querySelector('[data-popup-age]');
  let inoculations = document.querySelector('[data-popup-inoculations]');
  let diseases = document.querySelector('[data-popup-diseases]');
  let parasites = document.querySelector('[data-popup-parasites]');

  if (petName==='Katrine') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;

  }

  if (petName==='Jennifer') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
    
  }

  if (petName==='Woody') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

  if (petName==='Sophia') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

  if (petName==='Scarlett') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

  if (petName==='Timmy') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

  if (petName==='Freddie') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

  if (petName==='Charly') {
    image.src = `${currentObj.img}`;
    title.innerText = `${currentObj.name}`;
    subtitle.innerText = `${currentObj.type} - ${currentObj.breed}`;
    petDescription.innerText = `${currentObj.description}`;
    age.innerHTML = `<b>Age:</b> ${currentObj.age}`;
    inoculations.innerHTML = `<b>Inoculations:</b> ${currentObj.inoculations.join(', ')}`;
    diseases.innerHTML = `<b>Diseases:</b> ${currentObj.diseases.join(', ')}`;
    parasites.innerHTML = `<b>Parasites:</b> ${currentObj.parasites.join(', ')}`;
  }

})

navSlide();
showPopup();

