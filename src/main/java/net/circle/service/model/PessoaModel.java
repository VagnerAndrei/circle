package net.circle.service.model;

public class PessoaModel {

	private String nome;
	private UsuarioModel usuario;
	
	public PessoaModel(String nome, UsuarioModel usuario) {
		super();
		this.nome = nome;
		this.usuario = usuario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public UsuarioModel getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioModel usuario) {
		this.usuario = usuario;
	}

}
