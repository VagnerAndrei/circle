package net.circle.business;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.exception.BusinessException;
import net.circle.business.interfaces.IPessoaBusiness;
import net.circle.business.util.Encriptador;
import net.circle.domain.dao.PessoaDAO;
import net.circle.domain.dao.UsuarioDAO;
import net.circle.domain.entity.Perfil;
import net.circle.domain.entity.Pessoa;

@Named
public class PessoaBusiness implements IPessoaBusiness {

	@Inject
	private PessoaDAO dao;

	@Inject
	private UsuarioDAO usuarioDAO;

	@Override
	public Pessoa salvar(Pessoa pessoa) throws BusinessException, Exception {
		if (usuarioDAO.exist(pessoa.getUsuario().getEmail()))
			throw new BusinessException(BusinessException.Excecao.EMAIL_JA_CADASTRADO);
		pessoa.getUsuario().setPerfil(Perfil.USER);
		pessoa.getUsuario().setSenha(Encriptador.MD5(pessoa.getUsuario().getSenha()));
		return dao.merge(pessoa);
	}

	@Override
	public List<Pessoa> consultarLista() throws Exception {
		return dao.findAll();
	}

	@Override
	public Pessoa consultar(Long id) throws Exception {
		return dao.find(id);
	}

	@Override
	public void delete(Integer id) throws Exception {
		dao.remove(dao.find(id));
	}

	@Override
	public Pessoa findByKey(String key, String valor) throws Exception {
		return dao.findByKey(key, valor);
	}

}
