import React, { Component } from 'react'
import './PokemonInfo.css'

import Evolutions from './Evolutions'

class PokemonInfo extends Component {
    state = {
        pokemon: {
            sprites: {
                front_default: '',
            },
            name: '',
            id: '',
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
        displayed: false,
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
        if (this.state.pokemon.types.length > 1) {
            return true;
        } else {
            return false;
        }
    }

    handleClick = (e) => {
        if(e.currentTarget.textContent === 'Display Evolution'){
            e.currentTarget.textContent = 'Undisplay Evolution'
            this.setState({displayed: true})
        } else{
            e.currentTarget.textContent = 'Display Evolution'
            this.setState({displayed: false})
        }
    }

    render() {
        const { pokemon } = this.state
        if (pokemon.height) {
            let hStr = pokemon.height.toString()
            let wStr = pokemon.weight.toString()
            hStr = hStr.substr(0, hStr.length - 1) + '.' + hStr.substr(hStr.length - 1)
            wStr = wStr.substr(0, wStr.length - 1) + '.' + wStr.substr(wStr.length - 1)
            return (
                <div className={`pokemon-info ${pokemon.types[0].type.name}`}>
                    <img src={pokemon.sprites.front_default} alt="sprite" />
                    <h2>{pokemon.name.toUpperCase()}</h2>
                    <div>
                        {this.hasSecondaryType()
                            ? <h2>{pokemon.types[0].type.name}/{pokemon.types[1].type.name}</h2>
                            : <h2>{pokemon.types[0].type.name}</h2>}
                    </div>
                    <h4>height: {hStr} m</h4>
                    <h4>weight: {wStr} kg</h4>
                    <div>
                        {/*probs will add in a component for the evolutions tomorrow*/}
                        <button type="onClick" onClick={this.handleClick}
                            className={`${pokemon.types[0].type.name}`}>
                                Display Evolution
                        </button>
                    </div>
                    <Evolutions pokemon={this.state.pokemon} displayed={this.state.displayed}/>
                </div>
            )
        } else {
            return <h3>That was not a valid pokemon. Please enter a number between 1 and 721.</h3>;
        }
    }
}

export default PokemonInfo