var data = {
    paises: [],
    cidades: []
}

function enviar() {
    if (verificarDados()) {
        limparCampos()
        alert("Destino enviado com sucesso!")
    }
}

function limparCampos() {
    document.getElementById("firstname").value = ("")
    document.getElementById("email").value = ("")
    document.getElementById("cpf").value = ("")
    document.getElementById("telefone").value = ("")
}

function buscarPaises() {
    const http = new XMLHttpRequest()
    var url = `https://amazon-api.sellead.com/country`

    http.open("GET", url, true)

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            data.paises = JSON.parse(http.response)
            preencherSelect('pais', data.paises)
        }
    }
    http.send()
}

function buscarCidades() {
    const http = new XMLHttpRequest()
    var url = `https://amazon-api.sellead.com/city`

    http.open("GET", url, true)

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            data.cidades = JSON.parse(http.response)
            preencherSelect('cidade', data.cidades)
        }
    }
    http.send()
}


function preencherSelect(tag, array) {
    var select = document.getElementById(tag);
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        var opt = document.createElement('option');
        opt.value = element.name;
        opt.innerHTML = element.name_ptbr;
        select.appendChild(opt)

    }
}

function verificarDados() {
    var firstname = document.getElementById("firstname").value
    var email = document.getElementById("email").value
    var cpf = document.getElementById("cpf").value
    var telefone = document.getElementById("telefone").value

    if (firstname === "" || firstname === null || firstname === undefined) {
        alert("Nome inválido")
        return false
    }
    else if (email === "" || email === null || email === undefined) {
        alert("Email inválido")
        return false
    }
    else if (cpf === "" || cpf === null || cpf === undefined) {
        alert("CPF inválido")
        return false
    }
    else if (telefone === "" || telefone === null || telefone === undefined) {
        alert("Telefone inválido")
        return false
    }
    return true
}

window.addEventListener("load", () => {
    buscarPaises()
    buscarCidades()
});