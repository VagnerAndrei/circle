import { usuarioLogado , acesso, registro} from './ContaController.js';

export function get(url) {
	return fetch(url, {
		method: 'GET',
	});
}

export function post(url, json){
	return fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(json)
	})
}


export const urls = {
		home: {
			path: "pages/public/home.html",
			url: "home"
		},
		sobre: {
			path: "pages/public/sobre.html",
			url: "sobre"
		},
		registro: {
			path: "pages/public/registro.html",
			url: "registro"
		},
		acesso: {
			path: "pages/public/acesso.html",
			url: "acesso"
		},
		ja_autenticado: {
			path: "pages/user/ja-autenticado.html",
			url: ""
		},
		pagina_nao_encontrada: {
			path: "nao-encontrada.html",
			url: ""
		}
	}

export function mainNavigate(url, queryFunction) {
	get(url.path).then(response => {
		if (response.status == 404) {
			document.getElementsByTagName('main')[0].innerHTML = `<h2>Página não encontrada</h2>`;
		} else {
			response.text().then(value => {
				document.getElementsByTagName('main')[0].innerHTML = new DOMParser()
					.parseFromString(value, "text/html")
					.getElementsByTagName('main')[0].innerHTML;

				if (queryFunction) queryFunction();

			})

		}
	})
}

export function navegar(url) {
	let params = new URLSearchParams(new URL(window.location.href).search);

	if (url == urls.home.url)
		window.history.replaceState('', '', `${location.pathname}`)
	else
		if (params.get("p") != url)
			window.history.pushState(url, url, "?p=" + url)

}

export function verificaURL() {

	const param = new URLSearchParams(new URL(window.location.href).search).get("p");

	if (param == null && location != location.origin + location.pathname)
		redirect('pagina-nao-encontrada')
	else
		if (usuarioLogado && (param == null || param == urls.acesso.url || param == urls.registro.url))
			home()
		else
			redirect(param)
}

export function redirect(e) {
	switch (e) {
		case null:
			home();
			break;
		case urls.sobre.url:
			sobre();
			break;
		case urls.registro.url:
			registrar()
			break;
		case urls.acesso.url:
			acessar()
			break;

		default:
			pagina_nao_encontrada();
			break;
	}
}



function ja_autenticado() {
	mainNavigate(urls.ja_autenticado)
}

export function pagina_nao_encontrada() {
	mainNavigate("pagina-nao-encontrada.html");
}

export function home() {
	mainNavigate(urls.home, () => {
		navegar(urls.home.url)
	});
}


export function sobre() {
	mainNavigate(urls.sobre, () => {
		navegar(urls.sobre.url)
	});
}

export function acessar() {
	mainNavigate(urls.acesso, () => {
		acesso();
		navegar(urls.acesso.url)
	});

}

export function registrar() {
	mainNavigate(urls.registro, () => {
		registro();
			navegar(urls.registro.url)
	});

}