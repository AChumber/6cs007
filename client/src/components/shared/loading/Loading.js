import './loading.css';
import React from 'react';

const Loading = () => {
    return(
        <div className="loading-wrapper">
            <div className="loading-circle circle-1"></div>
            <div className="loading-circle circle-2"></div>
            <div className="loading-circle circle-3"></div>
        </div>
    );
}
export default React.memo(Loading);