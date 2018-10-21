import React, { Component } from 'react';
import './App.css';

import DeckGL from '@deck.gl/react';
import { TripsLayer } from '@deck.gl/experimental-layers';
import { StaticMap } from 'react-map-gl';

import data from './data';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'MY_MAPBOX_TOKEN';

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9';

const INITIAL_VIEW_STATE = {
    longitude: -74,
    latitude: 40.72,
    zoom: 13,
    maxZoom: 16,
    pitch: 45,
    bearing: 0
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        };
    }

    componentDidMount() {
        this._animate();
    }

    componentWillUnmount() {
        if (this.animationFrame) {
            window.cancelAnimationFrame(this._animationFrame);
        }
    }

    _animate() {
        const {
            loopLength = 1800, // unit corresponds to the timestamp in source data
            animationSpeed = 30 // unit time per second
        } = this.props;
        const timestamp = Date.now() / 1000;
        const loopTime = loopLength / animationSpeed;

        this.setState({
            time: ((timestamp % loopTime) / loopTime) * loopLength
        });
        this._animationFrame = window.requestAnimationFrame(
            this._animate.bind(this)
        );
    }

    render() {
        return (
            <DeckGL
                controller
                initialViewState={INITIAL_VIEW_STATE}
                layers={this._renderLayers()}
            >
                <StaticMap
                    resuseMap
                    preventStyleDiffing
                    width={window.innerWidth}
                    height={window.innerHeight}
                    mapStyle={MAPBOX_STYLE}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                />
            </DeckGL>
        );
    }

    _renderLayers() {
        return [
            new TripsLayer({
                id: 'trips',
                data,
                getPath: d => d.segments,
                getColor: d =>
                    d.vendor === 0 ? [253, 128, 93] : [23, 184, 190],
                opacity: 0.3,
                strokeWidth: 2,
                trailLength: 60,
                currentTime: this.state.time
            })
        ];
    }
}

export default App;
