document.addEventListener('DOMContentLoaded', function(){
    const number1 = document.getElementById('numero1');
    const number2 = document.getElementById('numero2');
    const resultText = document.getElementById('resultText');

    window.calcular = function(operacion){
        const num1 = parseFloat(numero1.value.trim());
        const num2 = parseFloat(numero2.value.trim());
               
        if (isNaN(num1) || isNaN(num2)) {
            resultText.textContent = 'por favor, ingrese numeros validos.';
            return;
}
let result;

switch(operacion) {
    case'sumar':
    result = num1 + num2;
    break;
    case 'restar':
        result = num1 - num2;
        break;
        case 'multiplicar':
            result = num1 * num2;
            break
            case'dividir':
            if(num2===0){
                resultText.textContent = 'No se puede dividir por cero.';
                return;
            }
            result = num1 / num2;
            break;
            default:
            result = 'operacion no valida'
        }        
        resultText.textContent = result;
    };
});
