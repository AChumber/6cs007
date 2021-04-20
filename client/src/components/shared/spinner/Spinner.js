import React from 'react';
import './spinner.css';

const Spinner = () => {
    const divStyle = {
        textAlign: 'center',
        top: '50%',
        transform: 'translateY(100%)'
    };

    return(
        <div style={divStyle}>
        <div className="circle">
            <div className="inner"></div>
        </div>
        <p>Loading...</p>
        </div>
    )
};

export default React.memo(Spinner);