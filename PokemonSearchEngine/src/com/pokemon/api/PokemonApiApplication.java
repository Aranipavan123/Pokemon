package com.pokemon.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootConfiguration
public class PokemonApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(PokemonApiApplication.class, args);
    }
}
