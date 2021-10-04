const DEFAULT_COLOR = '#9f2828';
const DEFAULT_MODE = 'color';

const container = document.getElementById('container');
const slider = document.getElementById('sizeSlider');
const sliderValue = document.getElementById('sliderValue');
const squareArray = document.getElementsByClassName('square');
const colorPicker = document.getElementById('colorPicker');
const colorButton = document.getElementById('colorButton');
const shadingButton = document.getElementById('shadingButton');
const rainbowButton = document.getElementById('rainbowButton');
const trailButton = document.getElementById('trailButton');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');

function createElements(size){

    container.style.gridTemplateColumns = `repeat(${size},1fr)`;
    container.style.gridTemplateRows = `repeat(${size},1fr)`;

    let gridArea = size ** 2;

    for(var i = 0; i < gridArea; i++){

        var square = document.createElement('div');
        square.className = 'square';
        container.appendChild(square);
        square.addEventListener('mouseenter', paintSquares);
    }
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

function setCurrentMode(newMode){
    
    updateColorMode(newMode);
    currentMode = newMode;
}

function updateColorMode(newMode){
    
    if (currentMode === 'color') {

        colorButton.classList.remove('active')
    } 
    else if (currentMode === 'shading') {

        shadingButton.classList.remove('active')
    } 
    else if (currentMode === 'rainbow') {

        rainbowButton.classList.remove('active')
    }
    else if (currentMode === 'trail') {

        trailButton.classList.remove('active')
    }
    else if (currentMode === 'eraser') {

        eraserButton.classList.remove('active')
    }
    
    if (newMode === 'color') {

        colorButton.classList.add('active')
    } 
    else if (newMode === 'shading') {

        shadingButton.classList.add('active')
    } 
    else if (newMode === 'rainbow') {

        rainbowButton.classList.add('active')
    }
    else if (currentMode === 'trail') {

        trailButton.classList.add('active')
    }
    else if (newMode === 'eraser') {

        eraserButton.classList.add('active')
    }
}

function hexToRgb(hex) {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) return normal.slice(1).map(e => parseInt(e, 16));
  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));
  return null;
}

function paintSquares(e){
    
    if(currentMode === 'color'){
        
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode === 'shading'){
    
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        rgbColor = hexToRgb(currentColor);
        e.target.style.backgroundColor = `rgba(${rgbColor}, ${currentOpacity + 0.1})`;
    }
    else if(currentMode === 'rainbow'){

        let randomRed = Math.floor(Math.random() * 256);
        let randomGreen = Math.floor(Math.random() * 256);
        let randomBlue = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
    }
    else if(currentMode === 'trail'){

        let i = 9;
        e.target.style.backgroundColor = currentColor;
        
            var interval = setInterval(() => {
                
                e.target.style.opacity = `0.${i}`
                i--;

            }, 100);
    }
    else if(currentMode === 'eraser'){
        e.target.style.backgroundColor = 'transparent';
    }
}

function updateSliderValue(value){
    
    sliderValue.textContent = `${value} x ${value}`;
}

function removeSquares(){
    
    container.innerHTML = '';
}

function resizeGrid(value){

    removeSquares();
    createElements(value);
}

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

createElements(16);

slider.onchange = (e) => resizeGrid(e.target.value);
slider.onmousemove = (e) => updateSliderValue(e.target.value);
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorButton.onclick = (e) => {
    setCurrentMode('color');
    resizeGrid(slider.value);
}
shadingButton.onclick = (e) => {
    setCurrentMode('shading');
    resizeGrid(slider.value);
}
rainbowButton.onclick = (e) => {
    setCurrentMode('rainbow');
    resizeGrid(slider.value);
}
trailButton.onclick = (e) => {
    setCurrentMode('trail'); 
    resizeGrid(slider.value);
}
eraserButton.onclick = (e) => setCurrentMode('eraser');
clearButton.onclick = (e) => resizeGrid(slider.value);