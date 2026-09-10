import { useState } from 'react'
import CadastrarLivro from './pages/cadastrarLivro'
import ListarLivros from './pages/listarLivros'
import styles from './App.module.css'

function App() {
  const [tela, setTela] = useState('cadastrar');

  return (
    <div className={styles.layout}>
      <nav className={styles.sidebar}>
        <h2>Biblioteca</h2>
        <button
          className={tela === 'cadastrar' ? styles.ativo : ''}
          onClick={() => setTela('cadastrar')}
        >
          Cadastrar Livro
        </button>
        <button
          className={tela === 'livros' ? styles.ativo : ''}
          onClick={() => setTela('livros')}
        >
          Livros Cadastrados
        </button>
      </nav>

      <main className={styles.conteudo}>
        {tela === 'cadastrar' ? <CadastrarLivro /> : <ListarLivros />}
      </main>
    </div>
  )
}

export default App