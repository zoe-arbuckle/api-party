import React, { Component } from 'react'
import './PokemonInfo.css'

class PokemonInfo extends Component {
    state = {
        pokemon: {
            sprites: {
                front_default: '',
            },
            name: '',
            weight: '',
            height: '',
        },
    }

    constructor(props) {
        super(props)

        this.fetchPokemonData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location
        if (locationChanged) {
            this.fetchPokemonData(nextProps)
        }
    }

    fetchPokemonData = (props) => {
        fetch(`http://pokeapi.co/api/v2/pokemon/${props.match.params.pokeNum}`)
            .then(response => response.json())
            .then(pokemon => this.setState({ pokemon }))
    }

    render() {
        const { pokemon } = this.state
        return (
            <div className="pokemon-info">
                <img src={pokemon.sprites.front_default} alt="sprite" />
                <h2>{pokemon.name}</h2>
                <h3>height: {pokemon.height}</h3>
                <h3>weight: {pokemon.weight}</h3>
            </div>
        )
    }
}

export default PokemonInfo