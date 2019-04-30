import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{
    render(){
        return(
            <div className="navbar-fixed z-depth-3">
                <nav>
                    <div className="nav-wrapper brown darken-3">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "monospace",
                        }}
                        className="col s5 brand-logo center"
                        >
                        <i className="material-icons">code</i>
                        MERN
                        </Link>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;