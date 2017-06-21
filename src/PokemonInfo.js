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
            types: [{
                type: {
                    name: '',
                }
            },
            {
                type: {
                    name: '',
                },
            }
            ],
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

    hasSecondaryType = () => {
        if(this.state.pokemon.types.length > 1){
            return true;
        }else{
            return false;
        }
    }

    render() {
        const { pokemon } = this.state
        return (
            <div className="pokemon-info">
                <img src={pokemon.sprites.front_default} alt="sprite" />
                <h2>{pokemon.name.toUpperCase()}</h2>
                <p></p>
                <h3>type: {pokemon.types[0].type.name}</h3>
                
                {this.hasSecondaryType() ? <h3>secondary type: {pokemon.types[1].type.name}</h3> : null}
                <h4>height: {pokemon.height}</h4>
                <h4>weight: {pokemon.weight}</h4>
            </div>
        )
    }
}

export default PokemonInfo