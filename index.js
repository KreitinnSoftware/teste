function login(event) { 
    event.preventDefault();
    const form = event.target
    if(form.email.value.toLowerCase() == 'cliente@rayos.com' && form.senha.value.toLowerCase() == '123456'){
        location.href = 'pedidos pendentes.html';
    }else if(form.email.value.trim().toLowerCase() == 'admin@rayos.com' && form.senha.value.trim().toLowerCase() == 'admin123'){
        location.href = 'painel adm.html';
    }else if(form.email.value.trim().toLowerCase() == 'func@rayos.com' && form.senha.value.trim().toLowerCase() == 'func123'){
        location.href = 'pedidos pendentes.html';
    }else{
        alert('Usuário ou senha incorreto.');
        return;
    }

    const db = loadDb(); 
    if ( db === null ){
        alert('ERROR: 500');
        return;
    } 

    email = form.email.value.trim().toLowerCase(),
    user = db.users.find(item => item.email === email && item.senha === form.senha.value); 
    if (!user) {
        $('#loginError').textContent = 'E-mail ou senha inválidos'; 
        return; 
    } 
    if (user.perfil === 'admin') location.href = 'painel adm.html'; 
    else if (user.perfil === 'func') location.href = 'pedidos pendentes.html';
     else location.href = 'meus aparelhos.html' }
function fill(email, password) { $('#le').value = email; $('#ls').value = password }
