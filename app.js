document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let cep = document.getElementById('cep').value;
    let healthPlan = document.getElementById('healthPlan').value;
    let photoInput = document.getElementById('photo');
    let photo = '';

    // Tratamento da foto (se fornecida)
    if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photo = e.target.result;
            salvarCliente({ name, phone, email, address, cep, healthPlan, photo });
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        salvarCliente({ name, phone, email, address, cep, healthPlan, photo });
    }
});

function salvarCliente(cliente) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    cliente.prontuario = gerarProntuario();
    clients.push(cliente);
    localStorage.setItem('clients', JSON.stringify(clients));
    listarClientes();
}

function listarClientes() {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    let clientsList = document.getElementById('clients');
    clientsList.innerHTML = '';

    clients.forEach(cliente => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${cliente.name}</strong><br>
            <em>Prontuário: ${cliente.prontuario}</em><br>
            Telefone: ${cliente.phone}<br>
            Email: ${cliente.email}<br>
            Endereço: ${cliente.address}, CEP: ${cliente.cep}<br>
            Plano de Saúde: ${cliente.healthPlan}<br>
            ${cliente.photo ? `<img src="${cliente.photo}" width="100">` : ''}
        `;
        clientsList.appendChild(listItem);
    });
}

function gerarProntuario() {
    const now = new Date();
    const prontuario = `P${now.getFullYear()}${(Math.random() * 10000).toFixed(0)}`;
    return prontuario;
}

// Carregar lista ao carregar a página
listarClientes();
