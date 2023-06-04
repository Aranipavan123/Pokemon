package com.pokemon.ui;

import java.util.Scanner;

import org.springframework.web.client.RestTemplate;

public class PokemonUI {

	private static final String API_BASE_URL = "https://pokeapi.co/api/v2";
	private static final String POKEMON_ENDPOINT = "/pokemon-species";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Welcome to the Pokemon Search Engine!");
        System.out.println("Enter the name of a Pokemon to search: ");
        String pokemonName = scanner.nextLine();
        
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = API_BASE_URL + POKEMON_ENDPOINT + "/" + pokemonName;
        
        try {
            String pokemonDetails = restTemplate.getForObject(apiUrl, String.class);
            System.out.println(pokemonDetails);
        } catch (Exception e) {
            System.out.println("An error occurred while fetching Pokemon details.");
            e.printStackTrace();
        }
        
        scanner.close();
    }
}

