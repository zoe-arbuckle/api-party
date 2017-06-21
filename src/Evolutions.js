import React, { Component } from 'react'

class Evolutions extends Component {
    state = {
        evolution_chain: {
            id: this.props.pokemon.id,
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
            const idChanged = nextProps.pokemon.id !== this.state.evolution_chain.id
            if (idChanged) {
                this.fetchEvolutionData()
            }
        }
    }

    fetchEvolutionData = () => {
        fetch(`http://pokeapi.co/api/v2/evolution-chain/${this.props.pokemon.id}`)
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