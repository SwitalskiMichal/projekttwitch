import React from 'react'
import { withRouter } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import debounce from 'debounce-promise'
import { GetSearchOptions } from './Twitch'

const asyncControl = {
    control: base => ({
        ...base,
        height: '40px',
        fontFamily: 'Roboto'
    })
}

const searchBarStyle = {
    width: '350px',
    padding: 'auto',
    margin: '-66pz auto',
    marginBottom: '15px',
    fontFamily: 'Roboto'
};

class SearchBar extends React.Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            isLoading: false,
            searchTerm: '',
            options: [{ value: '', label: '', makeURL: '' }]
        }
    }

    resetComponent = () => this.setState({ isLoading: false, options: [] })

    handleSelect = selectedOption =>
    {
        if (selectedOption)
        {
            this.props.history.push(selectedOption.makeURL)
        }
    }

    onInputChange(value)
    {
        this.setState({ isLoading: true, searchTerm: value })

        setTimeout(() =>
        {
            if (this.state.searchTerm.length < 1) return this.resetComponent()
            this.setState({ isLoading: false })
        }, 500)
    }

    loadOptions = async (value, callback) =>
    {
        let gameOptions = await GetSearchOptions("games", value);
        let options = await gameOptions.games.map(game => ({
            value: game._id,
            label: game.name,
            makeURL: `/game/${game.name}`
        }));

        this.setState({ options });
        

        callback(this.getOptions());
    }

    getOptions()
    {
        const { options } = this.state
        return options
    }

    render()
    {
        return (
            <div style={{ display: 'flex', flexFLow: 'wrap', justifyContent: 'center', backgroundImage: 'linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)' }}>
                <div style={searchBarStyle}>
                    <AsyncSelect
                        isClearable={true}
                        noOptionsMessage={() => 'No matches found.'}
                        openMenuOnClick={false}
                        placeholder='Search game'
                        styles={asyncControl}
                        loadOptions={debounce(this.loadOptions.bind(this), 700)}
                        onInputChange={debounce(this.onInputChange.bind(this), 700)}
                        onChange={this.handleSelect}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar)