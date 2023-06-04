package com.pokemon.api;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/pokemon")
public class PokemonApiService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable("pokemonCache")
    @GetMapping("/{name}")
    public ResponseEntity<?> getPokemonDetails(@PathVariable String name) {
        String apiUrl = "https://pokeapi.co/api/v2/pokemon/" + name;
        ResponseEntity<?> response = restTemplate.getForEntity(apiUrl, String.class);
        return response;
    }
}
