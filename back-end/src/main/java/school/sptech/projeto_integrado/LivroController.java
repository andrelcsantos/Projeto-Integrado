package school.sptech.projeto_integrado;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/livros")
@CrossOrigin(origins = "http://localhost:5173")
public class LivroController {
    private final JdbcTemplate jdbcTemplate;

    public LivroController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Livro>> listarLivros() {
        String sql = "SELECT * FROM livros";
        List<Livro> livros = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Livro.class));

        return ResponseEntity.status(200).body(livros);
    }

    @PostMapping
    public ResponseEntity<Livro> criarLivro(@RequestBody Livro livro) {
        if (livro.getTitulo() == null || livro.getTitulo().isBlank() || livro.getAutor() == null || livro.getAutor().isBlank() || livro.getGenero() == null || livro.getGenero().isBlank() || livro.getQtdPaginas() == null || livro.getAnoPublicado() == null) {
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO livros (titulo, autor, genero, qtd_paginas, ano_publicado) VALUES(?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update( con -> {
            PreparedStatement ps = con.prepareStatement(sql,
                    Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, livro.getTitulo());
            ps.setString(2, livro.getAutor());
            ps.setString(3, livro.getGenero());
            ps.setInt(4, livro.getQtdPaginas());
            ps.setInt(5, livro.getAnoPublicado());

            return ps;
        },keyHolder);

        Integer idInserido = keyHolder.getKeyAs(Integer.class);
        livro.setId(idInserido);
        return ResponseEntity.status(201).body(livro);

    }
}
