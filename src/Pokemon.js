import React, { Component } from 'react'
import './Pokemon.css'

class Pokemon extends Component {
    state = {
        pokeName: '',
    }

    handleChange = (e) => {
        const pokeName = e.currentTarget.value
        this.setState({ pokeName })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.history.push(`/pokemon/${this.state.pokeName}`)
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
                            value={this.state.pokeName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Look up a Pokémon!</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Pokemon