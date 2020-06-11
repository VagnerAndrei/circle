import { post, get , verificaURL} from './NavegacaoController.js';

	export let usuarioLogado;

	export function registro() {
		const messages = [
			document.getElementById('erro-nome'),
			document.getElementById('erro-email'),
			document.getElementById('erro-senha'),
			document.getElementById('erro-confere-senha'),
		]

		const inputs = [
			document.getElementById('input-nome'),
			document.getElementById('input-email'),
			document.getElementById('input-senha'),
			document.getElementById('input-confere-senha')
		]
		const loading = document.getElementById('loading');
		const botao = document.getElementById('botao-form-registrar')

		const disableds = [
			botao, inputs[0], inputs[1], inputs[2], inputs[3]
		];

		function disabled(boolean) {
			disableds.map(item => item.disabled = boolean)
			if (boolean) {
				loading.classList.add('display-block')
			} else {
				loading.classList.remove('display-block')
			}
		}

		document.querySelector('form').addEventListener('submit', (event) => {
			event.preventDefault();
			messages.map(campo => campo.innerHTML = '');

			if (inputs[0].value.length > 100)
				messages[0].innerHTML = 'Máximo de 100 caracteres';
			if (inputs[1].value.length > 100)
				messages[1].innerHTML = 'Máximo de 100 caracteres';
			if (inputs[2].value.length > 20)
				messages[2].innerHTML = 'Máximo de 20 caracteres';
			if (inputs[2].value !== inputs[3].value)
				messages[3].innerHTML = 'Senha não confere';


			if (!messages.some(message => message.innerHTML !== '')) {
				disabled(true);

				post('api/user', {
						nome: inputs[0].value,
						usuario: {
							email: inputs[1].value,
							senha: inputs[2].value
						}
				}
					).then((response) => {
					response.text().then(value => {
						const resposta = JSON.parse(value)
						if (response.ok) {
							loginHandler(resposta.nome)
						} else
							messages.find(message => message.htmlFor == resposta.campo).innerHTML = resposta.mensagem
					})
					disabled(false);
				}).catch(() => {
					disabled(false);
				});
			}

		});

	}

	export function logout() {
		get('api/logout').then((response) => {
			if (response.status != 403) {
				loginHandler()
			}
			else
				console.log('Inacessível')
		}).catch(() => { })
	}

	export function verificaLogin() {
		get('api/auth').then((response) => {
			if (response.status == 302) {
				response.text().then(value => {
					const resposta = JSON.parse(value)
					loginHandler(resposta.nome)
				})
			} else if (response.status == 404) {
				loginHandler()
			}
		})
	}


export function acesso() {
	const messages = [
		document.getElementById('erro-email'),
		document.getElementById('erro-senha'),
	]

	const inputs = [
		document.getElementById('input-email'),
		document.getElementById('input-senha'),
		document.getElementById('check-manter-dados'),
	]

	const loading = document.getElementById('loading');
	const botao = document.getElementById('botao-form-acessar')

	const disableds = [
		botao, inputs[0], inputs[1], inputs[2]
	];

	if (localStorage.getItem('email') != null) {
		inputs[0].value = localStorage.getItem('email');
		inputs[1].value = localStorage.getItem('senha');
	}

	function disabled(boolean) {
		disableds.map(item => item.disabled = boolean)
		if (boolean) {
			loading.classList.add('display-block')
		} else {
			loading.classList.remove('display-block')
		}
	}

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();
		messages.map(campo => campo.innerHTML = '');

		if (inputs[0].value.length > 100)
			messages[0].innerHTML = 'Máximo de 100 caracteres';
		if (inputs[1].value.length > 20)
			messages[1].innerHTML = 'Máximo de 20 caracteres';


		if (!messages.some(message => message.innerHTML !== '')) {
			disabled(true);

			post('api/auth', {
				email: inputs[0].value,
				senha: inputs[1].value
			})
				.then((response) => {
					response.text().then(value => {
						const resposta = JSON.parse(value)
						if (response.ok) {
							loginHandler(resposta.nome)
						}
						else
							messages.find(message => message.htmlFor == resposta.campo).innerHTML = resposta.mensagem
					})
					disabled(false);
					if (inputs[2].checked) {
						localStorage.setItem('email', inputs[0].value)
						localStorage.setItem('senha', inputs[1].value)
					} else {
						localStorage.clear()
					}
				})
				.catch((erro) => {
					disabled(false);
				});
		}

	});

}

function loginHandler(nome) {
	usuarioLogado = nome;
	document.getElementById('label-usuario-logado').innerHTML = usuarioLogado ? usuarioLogado : 'Bem-vindo';
	if (usuarioLogado) {
		document.getElementById('botao-acessar').classList.add('display-none');
		document.getElementById('botao-registrar').classList.add('display-none');
		document.getElementById('botao-logout').classList.remove('display-none');
	}
	else {
		document.getElementById('botao-logout').classList.add('display-none');
		document.getElementById('botao-acessar').classList.remove('display-none');
		document.getElementById('botao-registrar').classList.remove('display-none');
	}
	verificaURL();
}