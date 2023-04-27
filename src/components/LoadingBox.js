import React from 'react';
import '../style/loadingBox.css';
import RESOURCE from '../config/resource';
let style = {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

};
export default function LoadingBox() {
    return (
        <div className="loading" style={style}>
            <img className='loader-img' src={`${RESOURCE.REFERENCE_LINK}/loginloading.gif`} />
        </div>
    );
}
