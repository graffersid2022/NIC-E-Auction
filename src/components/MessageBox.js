import React from 'react';

export default function MessageBox(props) {
    return (
        <div className={`alert alert-${props.variant || 'info'}`} style={{ color: 'red' }}>
            {props.children}
        </div>
    );
}
