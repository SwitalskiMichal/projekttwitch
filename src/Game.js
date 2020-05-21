import React, { Component } from 'react'
import Loader from './Loader'
import LiveStream from './LiveStream'
import { GetGameViewedStreams, GetGameStreams } from './Twitch'

class Game extends Component {
    constructor(props){
        super(props)

        this.state = {
            gameName: '',
            gameRawName: '',
            liveStreams: [],
            mostViewedStreams: [],
            waitingForResponse: true,
            error: null
        }
    }

    getGameDataFromTwitch = async () => {
        let waitingForResponse

        let gameRawName = 
            this.props && this.props.location && this.props.location.props
                ? this.props.location.props.gameName
                : this.props.location.pathname.match(/[^/]+$/)[0]

        let gameName = gameRawName.replace(/&|\+/g, match => {
            return match === '&' ? '%26' : match === '+' ? '%2B' : ''
        })

        this.setState({gameName, gameRawName})

        try {
            let liveStreams = await GetGameStreams(gameName)
            liveStreams.length === 0
                ? (waitingForResponse = false)
                : (waitingForResponse = true)
            
            let mostViewedStreams = await GetGameViewedStreams(gameName)
            this.setState({liveStreams, mostViewedStreams, waitingForResponse})
        } catch (error){
            this.setState({error: 'error'})
            console.log(error)
        }
    }

    componentDidMount() {
        window.scrollTo(0,0)
        this.getGameDataFromTwitch()
    }

    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.getGameDataFromTwitch()
        }
    }

    render() {
        const {
            gameName,
            liveStreams,
            waitingForResponse,
            error
        } = this.state

        if(error){
            return (
                <div style={{margin: '50px', textAlign: 'center'}}>
                    <h4>Something went wrong</h4>
                </div>
            )
        }

        let coverArt = `https://static-cdn.jtvnw.net/ttv-boxart/./${gameName}-272x380.jpg`

        const gameCard = gameName ? (
            <div className='game-topContainer'>
                <div className='game-logoContainer'>
                    <div className='game-gameLogo'>
                        <img src={coverArt} alt='coverArtImage' />
                    </div>
                </div>
            </div>
        ) : (
            <Loader />
        )

        const title_liveStreams = (
            <h4 className='game-partTitle' style={{marginTop: '50px'}}>
                Top Live Streams
            </h4>
        )

        const renderLiveStreams = liveStreams.length ? (
            liveStreams.map((stream, index) => {
                return (
                    <LiveStream
                        viewers={stream.viewers}
                        url={stream.channel.url}
                        imgURL={stream.preview.medium}
                        routeParam={stream.channel._id}
                        logoURL={stream.channel.logo}
                        status={stream.channel.status}
                        name={stream.channel.display_name}
                        key={index}
                    />
                )
            })
        ) : waitingForResponse ? (
            <Loader />
        ) : (
            <h4>Seems like nobody is streaming {gameName}</h4>
        )

        return (
            <div>
                {gameCard}
                {title_liveStreams}
                <div className='game-streamContainer' style={{marginTop: '100px'}}>
                    {renderLiveStreams}
                </div>
            </div>
        )
    }
}

export default Game