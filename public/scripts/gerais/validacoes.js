// Função de validação para campos de email
function validateEmail(input) {
    var emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    return emailPattern.test(input.value.trim());
}

// Função de validação para campos não relacionados a email
function validateNonEmail(input) {
    return input.value.trim() !== '';
}

// Mostrar mensagem de erro de validação
function showValidate(input) {
    input.parentElement.classList.add('alert-validate');
}

// Esconder mensagem de erro de validação
function hideValidate(input) {
    input.parentElement.classList.remove('alert-validate');
}

// Ocultar mensagem de erro de validação ao focar no campo
document.querySelectorAll('.validar-formulario .entrada').forEach(function (input) {
    input.addEventListener('focus', function () {
        hideValidate(input);
    });
});