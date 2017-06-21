import React, { Component } from 'react'
import './Evolutions.css'

class Evolutions extends Component {
    state = {
        //TODO: Add description (flavor_text) and the full evolution chain
        species: {
            evolution_chain: '',
        },
        id: this.props.id,
        evolution_chain: {
            id: '',
            chain: {
                evolves_to: [
                    {
                        species: {
                            name: '',
                        },
                        evolves_to: [{
                            species: {
                                name: '',
                            },
                        }],
                    },
                ],
            }
        },
        evolution: {
            sprites: {
                front_default: '',
            },
        },
    }

    constructor(props) {
        super(props)

        this.fetchEvolutionData(props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pokemon.id) {
            const idChanged = nextProps.pokemon.id !== this.state.id
            if (idChanged) {
                this.setState({id: nextProps.pokemon.id }) 
                this.fetchEvolutionData(nextProps)
            }
        }
    }

    fetchEvolutionData = (props) => {
        fetch(`http://pokeapi.co/api/v2/pokemon-species/${props.pokemon.id}`)
            .then(response => response.json())
            .then(species => this.setState({ species }))
            .then(this.fetchEvolutionChain)
    }

    fetchEvolutionChain = () => {
        fetch(this.state.species.evolution_chain.url)
                .then(response => response.json())
                .then(evolution_chain => this.setState({ evolution_chain }))
                .then(this.fetchEvolutionSprite)
    }

    fetchEvolutionSprite = () => {
        if (this.state.evolution_chain.chain.evolves_to[0]) {
            fetch(`http://pokeapi.co/api/v2/pokemon/${this.state.evolution_chain.chain.evolves_to[0].species.name}`)
                .then(response => response.json())
                .then(evolution => this.setState({ evolution }))
        }
    }

    render() {
        const chain = this.state.evolution_chain.chain
        return (
            this.props.displayed
                ? <div>
                    {chain.evolves_to[0] ?
                        <div>
                            <img src={this.state.evolution.sprites.front_default} alt='evolution' />
                            <figcaption>{chain.evolves_to[0].species.name}</figcaption>
                        </div>
                        : <h4>This pokemon does not evolve!</h4>}
                </div>
                : null
        )
    }
}

export default Evolutions