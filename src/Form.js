import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    static propTypes = {
        values: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        numberInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        selectInput: PropTypes.string.isRequired,
        onNumberInputChange: PropTypes.func.isRequired,
        onSelectInputChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label>
                    Ilość zdjęć:
                    <input
                        type="number"
                        required min="1" max="10"
                        value={this.props.numberInput}
                        onChange={this.props.onNumberInputChange} />
                </label>
                <label>
                    Typ zwierzaka:
                    <select
                        required
                        value={this.props.selectInput}
                        onChange={this.props.onSelectInputChange}>
                        {
                            this.props.values.map((value) => (
                                <option key={value.value} value={value.value}>
                                    {value.label}
                                </option>
                            ))
                        }
                        <option value="random">Losowe</option>
                    </select>
                </label>

                <input disabled={this.props.loading} type="submit" value={this.props.loading ? 'Ładowanie danych' : 'Szukaj'} />
            </form >
        );
    }
}

export default Form;
