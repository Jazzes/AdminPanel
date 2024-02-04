import React from 'react';
import "./Loading.scss"

const FetchLoading = () => {
    return (
        <div className="FetchLoading">
            <div className="Loading">
                <div className="Loading__inner_one"></div>
                <div className="Loading__inner_two"></div>
                <div className="Loading__inner_three"></div>
            </div>
        </div>
    );
};

export default FetchLoading;