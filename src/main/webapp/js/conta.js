/**
 * 
 */
export function acesso(document, resultFunction) {

	const messages = [
		document.getElementById('erro-email'),
		document.getElementById('erro-senha'),
	]

	const inputs = [
		document.getElementById('input-email'),
		document.getElementById('input-senha'),
	]

	const loading = document.getElementById('loading');
	const botao = document.getElementById('botao-form-acessar')

	const disableds = [
		botao, inputs[0], inputs[1]
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
		if (inputs[1].value.length > 20)
			messages[1].innerHTML = 'Máximo de 20 caracteres';


		if (!messages.some(message => message.innerHTML !== '')) {
			disabled(true);

			fetch('api/auth', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({
					email: inputs[0].value,
					senha: inputs[1].value
				})
			}).then((response) => {
				response.text().then(value => {
					const resposta = JSON.parse(value)
					if (response.ok){
						resultFunction(resposta.nome)
					}
					else
						messages.find(message => message.htmlFor == resposta.campo).innerHTML = resposta.mensagem
				})
				disabled(false);
			}).catch((erro) => {
				console.log(erro)
				disabled(false);
			});
		}

	});

}

export function registro(document, resultFunction) {
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

			fetch('api/user', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({
					nome: inputs[0].value,
					usuario: {
						email: inputs[1].value,
						senha: inputs[2].value
					}
				})
			}).then((response) => {
				response.text().then(value => {
					const resposta = JSON.parse(value)
					if (response.ok) {
						resultFunction(resposta.nome)
					} else
						messages.find(message => message.htmlFor == resposta.campo).innerHTML = resposta.mensagem
				})
				disabled(false);
			}).catch((erro) => {
				console.log(erro)
				disabled(false);
			});
		}

	});

}