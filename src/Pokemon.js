import React, { Component } from 'react'
import './Pokemon.css'

import { Route } from 'react-router-dom'
import PokemonInfo from './PokemonInfo'

class Pokemon extends Component {
    state = {
        pokeNum: '',
    }

    handleChange = (e) => {
        const pokeNum = e.currentTarget.value
        this.setState({ pokeNum })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.history.push(`/pokemon/${this.state.pokeNum}`)
    }

    render(){
        return(
            <div className="pokemon">
                <img className="pokemon-logo" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/2000px-International_Pokémon_logo.svg.png" 
                    alt="pikachu" />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            type="text"
                            value={this.state.pokeNum}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Look up a Pokémon!</button>
                    </div>
                </form>

                <Route exact path='/pokemon' render={() => <h3>Please enter a number between 1 and 721</h3>} />
                <Route path='/pokemon/:pokeNum' component={PokemonInfo} />
            </div>
        )
    }
}

export default Pokemon