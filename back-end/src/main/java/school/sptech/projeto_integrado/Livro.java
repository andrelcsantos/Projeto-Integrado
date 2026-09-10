package school.sptech.projeto_integrado;

import java.util.Date;

public class Livro {
    private Integer id;
    private String titulo;
    private String autor;
    private String genero;
    private Integer qtdPaginas;
    private Integer anoPublicado;

    public Livro() {
    }

    public Livro(Integer id, String titulo, String autor, String genero, Integer qtdPaginas, Integer anoPublicado) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.qtdPaginas = qtdPaginas;
        this.anoPublicado = anoPublicado;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getQtdPaginas() {
        return qtdPaginas;
    }

    public void setQtdPaginas(Integer qtdPaginas) {
        this.qtdPaginas = qtdPaginas;
    }

    public Integer getAnoPublicado() {
        return anoPublicado;
    }

    public void setAnoPublicado(Integer anoPublicado) {
        this.anoPublicado = anoPublicado;
    }
}
