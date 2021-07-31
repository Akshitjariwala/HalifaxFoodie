import React from 'react';
import RestaurantNavBar from './RestaurantNavBar';
const WordCloud = (props) => {
    return (
        <div className="tabBody" style={{marginRight:'20px'}}>
            <RestaurantNavBar />

            <div style={{ "margin-left": "250px" }}>

                <iframe src="https://datastudio.google.com/embed/reporting/03208f66-f0a2-44f0-9e6b-bbc800149d12/page/55UWC" width="100%" height="400px" style={{ border: '1px solid black' }}>
                </iframe>            </div>
        </div>

    );
};
export default WordCloud;