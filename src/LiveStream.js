import React from 'react'
import PropTypes from 'prop-types'
import './LiveStream.css'

const LiveStream = ({
    viewers,
    url,
    imgURL,
    logoURL,
    status,
    name,
    gameName
}) => (
    <div className='live-card'>
        <p className='live-viewers'>
            <i className='material-icons'>Live viewers: </i>
            {viewers}
        </p>
        <a href={url} target='_blank' rel='noopener noreferrer'>
            <img src={imgURL} alt='streamImage' />
        </a>
        <div className='live-streamerLogo'>
            <img src={logoURL} alt='logoImage'/>
        </div>
        <div className='live-infoPart'>
            <p className='live-status' title={status}>
                {status}
            </p>
            <p className='live-streamerName'>
                {name}
            </p>
            <p className='live-gameName'>
                {gameName}
            </p>
        </div>
    </div>
)

LiveStream.propTypes = {
    viewers: PropTypes.number,
    url: PropTypes.string,
    imgURL: PropTypes.string,
    routeParam: PropTypes.number,
    logoImage: PropTypes.string,
    status: PropTypes.string,
    name: PropTypes.string,
    gameName: PropTypes.string
}

export default LiveStream