package net.circle.business.core;

import java.util.List;

public interface IRead<T> {

	List<T> consultarLista() throws Exception;

	T consultar(Long id) throws Exception;

}
