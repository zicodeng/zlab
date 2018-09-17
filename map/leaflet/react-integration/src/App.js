import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import logo from './logo.svg';
import './App.css';

const position = [51.505, -0.09];

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Map center={position} zoom={13} style={{ height: '800px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup.
                            <br />
                            Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}

export default App;
