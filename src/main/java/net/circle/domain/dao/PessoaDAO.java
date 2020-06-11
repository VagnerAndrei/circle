package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Pessoa;

public class PessoaDAO extends AbstractDAO<Pessoa>  {

	@Override
	public Class<Pessoa> getClassImplement() {
		return Pessoa.class;
	}

}
