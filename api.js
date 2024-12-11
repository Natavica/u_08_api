//Consumir el siguiente endpoint https://pokeapi.co/api/v2/pokemon/ y mostrar en el front lo siguiente:

//a) Cards que contengan los 20 primeros pokemones (imagen y nombre del pokemon)
//b) Utilizar Async / Await para trabajar las promesas de forma asíncrona
//c) Usar Axios o Fetch para realizar la solicitud al endpoint mencionado
//d) Ocupar Try / Catch para el manejo de errores




// URL del endpoint de la API
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

// Función principal para obtener los datos de los Pokémon y renderizarlos
async function renderPokemonCards() {
    try {
        // Solicitud al endpoint para obtener la lista de los primeros 20 Pokémon
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        const data = await response.json();
        const pokemonList = data.results;

        // Contenedor donde se agregarán las tarjetas
        const cardContainer = document.getElementById('pokemon-container');
        cardContainer.innerHTML = ''; // Limpiar contenido previo

        // Iterar sobre la lista de Pokémon y obtener detalles adicionales
        for (const pokemon of pokemonList) {
            const pokemonDetails = await fetchPokemonDetails(pokemon.url);
            if (pokemonDetails) {
                const card = createPokemonCard(pokemonDetails);
                cardContainer.appendChild(card);
            }
        }
    } catch (error) {
        console.error(error);
        alert('Hubo un error al cargar los Pokémon.');
    }
}

// Función para obtener los detalles de un Pokémon por su URL
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
     
        if (!response.ok) {
            throw new Error(`Error al obtener detalles del Pokémon: ${response.statusText}`);
        }
        //convierte la respuesta en un json para poder manipularlo
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Función para crear un elemento de tarjeta con los datos del Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    const name = document.createElement('h3');
    name.textContent = pokemon.name;

    card.appendChild(img);
    card.appendChild(name);

    return card;
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', renderPokemonCards);
