import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from "react-bootstrap"
import './Navbar.css'

class MyNavbar extends React.Component {
    render(){
        return(
            <Navbar className='background-color'>
                <Nav>
                    <NavItem>
                        <Link className='nav-links' to='/'>Twitch Game Stream Search</Link>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default MyNavbar