
/**
 * 
 */
package net.circle.service.api;

import java.net.URI;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import net.circle.domain.entity.Pessoa;
import net.circle.business.interfaces.IPessoaBusiness;

import net.circle.business.exception.BusinessException;
import net.circle.business.exception.BusinessException.Excecao;

import net.circle.service.model.AuthModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.PessoaModel;
import net.circle.service.model.UsuarioModel;

/**
 * @author Vagner
 *
 */
@Path("/")
@Produces("application/json")
@Consumes("application/json")
public class UsuarioRest {

	@Inject
	private IPessoaBusiness servico;

	@POST
	@Path("/user")
	public Response register(@Context HttpServletRequest servletRequest, @Valid Pessoa pessoa) {
		try {
			if (servletRequest.getUserPrincipal() != null)
				return Response.status(Status.CONFLICT).entity(new ErroModel(Excecao.EMAIL_JA_AUTENTICADO.getCampo(),
						Excecao.EMAIL_JA_AUTENTICADO.getMensagem())).build();
			var senha = pessoa.getUsuario().getSenha();
			var registro = servico.salvar(pessoa);
			servletRequest.login(registro.getUsuario().getEmail(), senha);
			return Response.status(Status.CREATED).entity(parseModel(registro)).build();
		} catch (BusinessException e) {
			return Response.status(Status.CONFLICT).entity(new ErroModel(e.getCampo(), e.getMensagem())).build();
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@GET
	@Path("/auth")
	public Response isUsuarioLogado(@Context HttpServletRequest servletRequest) {
		try {
			if (servletRequest.getUserPrincipal() == null) {
				return Response.status(Status.NOT_FOUND).build();
			} else {
				var pessoa = servico.findByKey("usuario.email", servletRequest.getUserPrincipal().getName());
				return Response.status(Status.FOUND).entity(parseModel(pessoa)).build();
			}
		} catch (Exception e) {
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/auth")
	public Response autenticar(@Context HttpServletRequest servletRequest, @Valid AuthModel usuario) {
		try {
			if (servletRequest.getUserPrincipal() == null) {

				var pessoa = servico.findByKey("usuario.email", usuario.getEmail());

				if (pessoa != null) {

					servletRequest.login(usuario.getEmail(), usuario.getSenha());
					return Response.ok(parseModel(pessoa)).build();

				} else
					return Response.status(Status.NOT_FOUND)
							.entity(new ErroModel(Excecao.EMAIL_NAO_ENCONTRADO.getCampo(),
									Excecao.EMAIL_NAO_ENCONTRADO.getMensagem()))
							.build();
			} else
				return Response.status(Status.CONFLICT).entity(new ErroModel(Excecao.EMAIL_JA_AUTENTICADO.getCampo(),
						Excecao.EMAIL_JA_AUTENTICADO.getMensagem())).build();

		} catch (Exception e) {
			if (e.getMessage().contains("Login failed"))
				return Response.status(Status.BAD_REQUEST)
						.entity(new ErroModel(Excecao.SENHA_INVALIDA.getCampo(), Excecao.SENHA_INVALIDA.getMensagem()))
						.build();
			return Response.serverError().build();
		}
	}

	@GET
	@Path("/logout")
	@RolesAllowed({ "USER", "ADMIN" })
	public void logout(@Context HttpServletRequest servletRequest) {
		try {
			System.out.println(servletRequest.getUserPrincipal().getName());
			servletRequest.logout();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@GET
	@Path("/user")
	@RolesAllowed("USER")
	public String user() {
		return "USER";
	}

	@GET
	@Path("/admin")
	@RolesAllowed("ADMIN")
	public String admin() {
		return "ADMIN";
	}

	@GET
	@Path("/redirect")
	public Response redirect() {
		return Response.seeOther(URI.create("../index.html")).build();
	}

	private PessoaModel parseModel(Pessoa pessoa) {
		return new PessoaModel(pessoa.getNome(),
				new UsuarioModel(pessoa.getUsuario().getEmail(), pessoa.getUsuario().getPerfil().name()));
	}

}
