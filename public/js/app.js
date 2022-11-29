const rootEl = document.querySelector(':root');
const main_page = document.querySelector('.main-page');
const thm_moon = document.querySelector('.moon');
const thm_sun = document.querySelector('.sun');
const main_nav = document.querySelector('.main-nav');
const nav_menu_btn = main_nav.querySelector('.menu-switch');
const nav_list = main_nav.querySelector('.nav-list');
const car_nav = document.querySelectorAll('.carasoul .control li');
const menu = main_nav.querySelectorAll('.nav-list a');
const theme = localStorage.getItem('theme');
const themeColor = localStorage.getItem('accentColor');
const theme_btn = main_nav.querySelector('.theme-btn');
const contextMenu = document.querySelector('.menu-wrapper')
const styler = document.querySelector('.styler-wrapper');
const stylerHeader = document.querySelector('.styler-wrapper header');
const colorVal = document.querySelector('.styler-wrapper .range span');
const colorInput = document.querySelector('.styler-wrapper .range input');
const themeBolBtn = styler.querySelector('#themeBolBtn')

if(theme==="dark"){
    theme_btn.classList.add('dark');
    document.querySelector('body').classList.add('dark');
    themeBolBtn.textContent = "Dark"
}

function changeThemeMode(){
    if(theme_btn.classList.contains('dark')){
        theme_btn.classList.remove('dark');
        document.querySelector('body').classList.remove('dark');
        localStorage.setItem('theme','light');
        themeBolBtn.textContent = "Light"
    }
    else{
        theme_btn.classList.add('dark');
        document.querySelector('body').classList.add('dark');
        localStorage.setItem('theme','dark');
        themeBolBtn.textContent = "Dark"
    }
}
theme_btn.addEventListener('click', changeThemeMode);
themeBolBtn.addEventListener('click', changeThemeMode);

function toggle_menu(){
    if(main_nav.classList.contains('active')){
        main_nav.classList.remove('active');
    }
    else{
        main_nav.classList.add('active');
    }
}

nav_menu_btn.addEventListener('click', toggle_menu)
menu.forEach(btn =>{
    btn.addEventListener('click', toggle_menu)
})

const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})
const sections = document.querySelectorAll('section[id]')

if(window.pageYOffset >= 50){
        main_nav.classList.add('show');
}
function scrollActive(){
    const scrollY = window.pageYOffset
    if(scrollY <= 50){
        main_nav.classList.remove('show');
        main_nav.classList.remove('active');
    }
    else{
        main_nav.classList.add('show');
    }

    sections.forEach(current =>{
        const sectionheight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionheight){
            document.querySelector(`.main-nav .nav-list a[href*=${sectionId}]`).classList.add('active')
        }
        else{
            document.querySelector(`.main-nav .nav-list a[href*=${sectionId}]`).classList.remove('active')
        }
    })
    if(contextMenu.classList.contains('active')){
        contextMenu.classList.remove('active');
    }
}

window.addEventListener('scroll', scrollActive)

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('obs-show');
        }
        else{
            entry.target.classList.remove('obs-show');
        }
    })
})

const hiddenElements = document.querySelectorAll('section');
hiddenElements.forEach((el) => observer.observe(el));

window.addEventListener('contextmenu', e =>{
    e.preventDefault(); // preventing default for the right click menu

    let x = e.offsetX, y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth;
    cmHeight = contextMenu.offsetHeight;
    
    x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight : y;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.classList.add('active');
})
document.addEventListener('click', ()=> {
    if(contextMenu.classList.contains('active')){
        contextMenu.classList.remove('active');
    }
})
function setColorVal(){
    const rootStyles = getComputedStyle(rootEl);
    // var rs = parseInt(rootStyles.getPropertyValue('--hue-color'));
    colorInput.value = themeColor;
}
setColorVal();
function setColorSlider(){
    let value = colorInput.value;
    colorVal.textContent = value;
    colorVal.style.left = (value/3.85) + "%";
    rootEl.style.setProperty('--hue-color', colorInput.value);
    localStorage.setItem('accentColor', value);
}
setColorSlider();
colorInput.addEventListener('input', setColorSlider);

function onDrag({movementX, movementY}){
    let getStyle = window.getComputedStyle(styler);
    let left = parseInt(getStyle.left);
    let top = parseInt(getStyle.top);
    styler.style.left = `${left + movementX}px`;
    styler.style.top = `${top + movementY}px`;
}
function toggleStyler(){
    styler.classList.toggle('active');
}
stylerHeader.addEventListener('mousedown', ()=>{
    stylerHeader.addEventListener('mousemove', onDrag);
});
document.addEventListener('mouseup', ()=>{
    stylerHeader.removeEventListener('mousemove', onDrag);
});
