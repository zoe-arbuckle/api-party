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
        let hStr = pokemon.height.toString()
        let wStr = pokemon.weight.toString()
        hStr = hStr.substr(0, hStr.length - 1) + '.' + hStr.substr(hStr.length - 1)
        wStr = wStr.substr(0, wStr.length - 1) + '.' + wStr.substr(wStr.length - 1)
        return (
            <div className="pokemon-info">
                <img src={pokemon.sprites.front_default} alt="sprite" />
                <h2>{pokemon.name.toUpperCase()}</h2>
                <h3>type: {pokemon.types[0].type.name}</h3>
                {this.hasSecondaryType() ? <h3>secondary type: {pokemon.types[1].type.name}</h3> : null}
                <h4>height: {hStr} m</h4>
                <h4>weight: {wStr} kg</h4>
            </div>
        )
    }
}

export default PokemonInfo