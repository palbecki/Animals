import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import axios from 'axios';

const PETS = [
    {
        value: 'shibes',
        label: 'Psy'
    },
    {
        value: 'cats',
        label: 'Koty'
    },
    {
        value: 'birds',
        label: 'Ptaki'
    },
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shibes: [],
            loading: false,
            numberOfPets: 1,
            typeOfPet: 'random'
        };
    }

    numberOfPetsChanged = (event) => {
        this.setState({ numberOfPets: event.target.value });
    }

    typeOfPetChanged = (event) => {
        this.setState({ typeOfPet: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        var pet = this.state.typeOfPet;
        if (pet === 'random') {
            pet = PETS[Math.floor(Math.random() * 3)].value;
        }

        let data = await axios(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/${pet}?count=${this.state.numberOfPets}`);
        this.setState({
            shibes: data.data,
            loading: false
        });
    }

    render() {
        return (
            <div className="App">
                <Form values={PETS}
                    loading={this.state.loading}
                    numberInput={this.state.numberOfPets}
                    selectInput={this.state.typeOfPet}
                    onNumberInputChange={this.numberOfPetsChanged}
                    onSelectInputChange={this.typeOfPetChanged}
                    onSubmit={this.handleSubmit}
                />
                <ul>
                    {this.state.shibes.map((shibe) => {
                        return <li key={shibe}><img src={shibe} alt='' /></li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default App;
