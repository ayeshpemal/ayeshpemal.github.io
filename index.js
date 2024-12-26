const display = document.getElementById('expression');

function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = math.evaluate(display.value);
    } catch (error) {
        display.value = 'Error';
        console.error("Calculation Error:", error);
    }
}