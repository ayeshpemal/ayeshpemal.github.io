function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function getSineValue(degrees) {
    const radians = degreesToRadians(degrees);
    const sineValue = Math.sin(radians);
    return Math.abs(sineValue) < 1e-10 ? 0 : sineValue;
}

function getCosineValue(degrees) {
    const radians = degreesToRadians(degrees);
    const cosineValue = Math.cos(radians);
    return Math.abs(cosineValue) < 1e-10 ? 0 : cosineValue;
}

function getTangentValue(degrees) {
    const radians = degreesToRadians(degrees);
    const tangentValue = Math.tan(radians);
    return Math.abs(tangentValue) < 1e-10 ? 0 : tangentValue;
}

function Evaluate() {
    let value = document.getElementById("expression").value;

    const functions = {
        'sin': getSineValue,
        'cos': getCosineValue,
        'tan': getTangentValue
    };

    while (value.match(/(sin|cos|tan)\(/)) {
        const match = value.match(/(sin|cos|tan)\(([^()]+)\)/);

        if (match) {
            const func = match[1];
            const innerExpression = match[2];
            const innerResult = eval(innerExpression);
            const funcValue = functions[func](innerResult);
            value = value.replace(new RegExp(`${func}\\([^()]+\\)`), funcValue);
        } else {
            break;
        }
    }

    const result = eval(value);
    document.getElementById("expression").value = result;
}