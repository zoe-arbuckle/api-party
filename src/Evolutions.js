import React, { Component } from 'react'

class Evolutions extends Component {
    state = {
        species: {
            evolution_chain: '',
        },
        id: 1,
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

        this.fetchEvolutionData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pokemon.id) {
            const idChanged = nextProps.pokemon.id !== this.state.id
            if (idChanged) {
                this.fetchEvolutionData()
            }
        }
    }

    fetchEvolutionData = () => {
        fetch(`http://pokeapi.co/api/v2/pokemon-species/${this.props.pokemon.id}`)
            .then(response => response.json())
            .then(species => this.setState({ species }))
            .then(this.fetchEvolutionChain)
    }

    fetchEvolutionChain = () => {
        fetch(this.state.species.evolution_chain)
                .then(response => response.json())
                .then(evolution_chain => this.setState({ evolution_chain }))
                .then(this.fetchEvolutionSprite)
    }

    fetchEvolutionSprite = () => {
        if (this.state.evolution_chain.chain) {
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
                    {chain ?
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