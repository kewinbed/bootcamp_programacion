document.addEventListener('DOMContentLoaded', function() {
    //obtener la referencia de los documentos de la pagina.
    const inputBox = document.getElementById('inputBox');
    const showBtn = document.getElementById('showBtn');
    const outputBox = document.getElementById('outputBox');

    //añadir un observador al boton
    showBtn.addEventListener('click', function() {
        const message = inputBox.value;
        console.log('dato ingresado:', message); 
        outputBox.textContent = message;
})
}) 