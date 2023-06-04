const React = require('react');
const ReactDOM = require('react-dom');

class PokemonSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonName: '',
      pokemonDetails: null,
      error: null
    };
  }

  handleInputChange = (event) => {
    this.setState({ pokemonName: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { pokemonName } = this.state;
    this.fetchPokemonDetails(pokemonName);
  };

  fetchPokemonDetails = (pokemonName) => {
    const API_BASE_URL = 'https://pokeapi.co/api/v2';
    const POKEMON_ENDPOINT = '/pokemon-species';
    const url = `${API_BASE_URL}${POKEMON_ENDPOINT}/${pokemonName}`;
    console.log('Making API request...');
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const pokemonDetails = {
          name: data.name,
          imageUrl: data.sprites.front_default,
          type: data.types.map((type) => type.type.name).join(', '),
          abilities: data.abilities.map((ability) => ability.ability.name)
        };
        this.setState({ pokemonDetails, error: null });
      })
      .catch((error) => {
        this.setState({ pokemonDetails: null, error: error.message });
      });
  };

  render() {
    const { pokemonName, pokemonDetails, error } = this.state;

    return (
      <div>
        <h1>Welcome to the Pokemon Search Engine!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchInput">Enter the name of a Pokemon to search:</label>
          <input
            type="text"
            id="searchInput"
            value={pokemonName}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>

        {error && <p>An error occurred: {error}</p>}

        {pokemonDetails && (
          <div>
            <div className="pokemon-image">
              <img src={pokemonDetails.imageUrl} alt={pokemonDetails.name} />
            </div>
            <div className="pokemon-info">
              <h2>{pokemonDetails.name}</h2>
              <p>Type: {pokemonDetails.type}</p>
              <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<PokemonSearch />, document.getElementById('pokemonDetails'));
