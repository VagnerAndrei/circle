package net.circle.business.interfaces;

import net.circle.business.core.IReadSaveDelete;
import net.circle.domain.entity.Pessoa;

public interface IPessoaBusiness extends IReadSaveDelete<Pessoa> {
	
	Pessoa findByKey(String key, String valor) throws Exception;

}
