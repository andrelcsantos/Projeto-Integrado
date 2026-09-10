import styles from './style.module.css'
import { useState, useEffect } from 'react'

function ListarLivros() {

  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  async function buscar() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(
        "http://localhost:8080/livros"
      );
      if (!resposta.ok) throw new Error(`Erro${resposta.status}`);

      const dados = await resposta.json();
      setLivros(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Livros Cadastrados</h1>

      {erro && <p>Erro: {erro}</p>}
      {carregando && <p>Carregando...</p>}

      { livros.map((livro) =>(
        <div key={livro.id} className={styles.card}>
          <div>
            <p>Título: <span></span>{livro.titulo}</p>
            <p>Autor: <span></span>{livro.autor}</p>
            <p>Gênero: <span></span>{livro.genero}</p>
            <p>Páginas: <span></span>{livro.qtdPaginas}</p>
            <p>Ano Publicado: <span></span>{livro.anoPublicado}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListarLivros
