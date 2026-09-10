import styles from './style.module.css'
import { useState } from 'react'

function CadastrarLivro() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [qtdPaginas, setQtdPaginas] = useState('');
  const [anoPublicado, setAnoPublicado] = useState('');

  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  async function cadastrar() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(
        "http://localhost:8080/livros",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo,
            autor,
            genero,
            qtdPaginas: Number(qtdPaginas),
            anoPublicado: Number(anoPublicado)
          })
        }
      );
      if (!resposta.ok) throw new Error(`Erro${resposta.status}`);

      const livroCadastrado = await resposta.json();
      setLivros([...livros, livroCadastrado]);

      setTitulo('');
      setAutor('');
      setGenero('');
      setQtdPaginas('');
      setAnoPublicado('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.cadastro}>
      <form>
        <h1>Cadastro de Livros</h1>
        <input placeholder='Título' name='titulo' type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
        <input placeholder='Autor' name='autor' type='text' value={autor} onChange={(e) => setAutor(e.target.value)}/>
        <input placeholder='Gênero' name='genero' type='text' value={genero} onChange={(e) => setGenero(e.target.value)}/>
        <input placeholder='Páginas' name='qtdPaginas' type='number' value={qtdPaginas} onChange={(e) => setQtdPaginas(e.target.value)}/>
        <input placeholder='Ano' name='ano' type='number' value={anoPublicado} onChange={(e) => setAnoPublicado(e.target.value)}/>
        <button onClick={cadastrar} disabled={carregando} type='button'>Cadastrar</button>
      </form>

      <div className={styles.lista}>
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
    </div>
  )
}

export default CadastrarLivro
