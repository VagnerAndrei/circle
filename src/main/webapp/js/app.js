import { acesso, registro } from './conta.js';

document.getElementById('botao-registrar').addEventListener('click', registrar);
document.getElementById('botao-acessar').addEventListener('click', acessar);
document.getElementById('botao-home').addEventListener('click', home);
document.getElementById('botao-sobre').addEventListener('click', sobre);
document.getElementById('botao-logout').addEventListener('click', logout);

verificaLogin();

function usuarioLogado(nome) {
	document.getElementById('label-usuario-logado').innerHTML = nome ? nome : '';
	if (nome) {
		document.getElementById('botao-acessar').classList.add('display-none');
		document.getElementById('botao-registrar').classList.add('display-none');
		document.getElementById('botao-logout').classList.remove('display-none');
	}
	else {
		document.getElementById('botao-logout').classList.add('display-none');
		document.getElementById('botao-acessar').classList.remove('display-none');
		document.getElementById('botao-registrar').classList.remove('display-none');
	}
	home();
}

function logout() {
	fetch('api/logout', {
		method: 'GET'
	}).then((response) => {
		if (response.status != 403)
			usuarioLogado();
		else
			console.log('Inacessível')
	}).catch(() => { })
}

function verificaLogin() {
	fetch('api/auth', {
		method: 'GET'
	}).then((response) => {
		if (response.status == 302) {
			response.text().then(value => {
				const resposta = JSON.parse(value)
				usuarioLogado(resposta.nome)
			})
		} else if (response.status == 404) {
			usuarioLogado();
		}
	})
}

function home() {
	mainNavigate('home.html');
}

function sobre() {
	mainNavigate('sobre.html');
}

function acessar() {
	mainNavigate('acesso.html', () => {
		acesso(document, usuarioLogado)
	});
}

function registrar() {
	mainNavigate('registro.html', () => {
		registro(document, usuarioLogado)
	});

}

function mainNavigate(url, queryFunction) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true)

	xhr.onreadystatechange = function () {
		if (this.readyState !== 4)
			return;
		if (this.status == 404) {
			document.getElementsByTagName('main')[0].innerHTML = `<h2>Página não encontrada</h2>`;
			return;
		}
		if (this.status !== 200)
			return;

		document.getElementsByTagName('main')[0].innerHTML = new DOMParser()
			.parseFromString(this.responseText, "text/html")
			.getElementsByTagName('main')[0].innerHTML;

		if (queryFunction) queryFunction();

	};
	xhr.send();
}