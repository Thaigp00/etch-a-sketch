let currentColor = "#000";
let currentSquareAmount = 16;
let currentMode = "default";

function createSketch() {
    const sketch = document.querySelector("#sketch");
    sketch.addEventListener("contextmenu", e => e.preventDefault()); 

    const sketchSize = sketch.offsetWidth;
    const squareSize = sketchSize / currentSquareAmount;
    for (let i = 0; i < currentSquareAmount; i++) {
        for (let j = 1; j <= currentSquareAmount; j++) {
            const square = document.createElement("div");
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;

            square.classList.add("square");
            if ((i + j) % 2 === 0) square.classList.add("gray");
            square.id = `square-${i * currentSquareAmount + j}`;

            square.addEventListener("mousedown", e => updateSquare(e, square));
            square.addEventListener("mouseenter", e => updateSquare(e, square));
            sketch.appendChild(square);
        }
    }
}

function recreateSketch() {
    let sketch = document.querySelector("#sketch");
    while(sketch.lastChild) sketch.removeChild(sketch.lastChild);
    createSketch();
}

function updateSquare(e, square) { 
    if (e.buttons === 1) {
        e.preventDefault();
        let selectedColor;
        switch (currentMode) {
            case "default":
                selectedColor = currentColor;
                break;

            case "rainbow":
                const randomRed = Math.floor(Math.random() * 256);
                const randomGreen = Math.floor(Math.random() * 256);
                const randomBlue = Math.floor(Math.random() * 256);
                selectedColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
                break;

            case "darken":
                console.log(square.style.backgroundColor);
                square.style.filter.brightness = "50%";
                console.log(square.style.filter);
                break;

            case "eraser":
                square.style.backgroundColor = "";
                break;
        }
        square.style.backgroundColor = selectedColor;
    }
    else if (e.buttons === 2) {
        square.style.backgroundColor = "";
    }
}

function colorizeButtons() {
    const colorButtons = document.querySelectorAll(".color");
    colorButtons.forEach(button => {
        button.style.backgroundColor = `${button.value}`;

        button.addEventListener("click", () => {
            colorButtons.forEach(button => {
                if (button.classList.contains("selected")) button.classList.remove("selected");
            });
            
            button.classList.add("selected");
            currentColor = button.value;
        });
    });
}

function toggleButtons() {
    const toggleableButtons = document.querySelectorAll("button.inactive, button.active");
    toggleableButtons.forEach(button => {
        button.addEventListener("click", () => {
            toggleableButtons.forEach(buttonToInactivate => {
                if (buttonToInactivate !== button) {
                    buttonToInactivate.classList.remove("active");
                    buttonToInactivate.classList.add("inactive");
                }
            });

            if (button.classList.contains("inactive")) {
                button.classList.remove("inactive");
                button.classList.add("active");
                currentMode = button.value;
            }
            else if (button.classList.contains("active")) {
                button.classList.remove("active");
                button.classList.add("inactive");
                currentMode = "default";
            }
        });
    });
}

function clearSketch() {
    const clearButton = document.querySelector("#clear-btn");
    clearButton.addEventListener("click", () => {
        recreateSketch();
    })
}

function resizeSketch() {
    const resizeButton = document.querySelector("#resize-btn");
    resizeButton.addEventListener("click", () => {
        tmpSquareAmount = prompt("[Max: 100] Size:");
        
        while(tmpSquareAmount !== null && +tmpSquareAmount <= 0) tmpSquareAmount = prompt("Value must be positive! [Max 100] Size:");
        while(tmpSquareAmount !== null && +tmpSquareAmount > 100) tmpSquareAmount = prompt("Value too large! [Max 100] Size:");
        while(tmpSquareAmount !== null && !(+tmpSquareAmount)) tmpSquareAmount = prompt("Value must be a valid number! [Max 100] Size:");

        if (tmpSquareAmount) {
            currentSquareAmount = tmpSquareAmount
            recreateSketch();
        }
    });
}


function run() {
    createSketch();
    colorizeButtons();
    toggleButtons();
    clearSketch();
    resizeSketch();
}

run();
