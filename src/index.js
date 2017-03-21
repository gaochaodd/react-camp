'use strict';

import React from 'react';
import ReactDOM from 'react-dom'

var App = React.createClass({
    render: () => {
        return <h1>Yo</h1>;
    }
});

ReactDOM.render(<App />, document.getElementById('root'));