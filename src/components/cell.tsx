import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import React from 'react';

interface Props {
    toggle: () => void,
    occupied: boolean,
}

const Cell = ({ toggle, occupied } : Props) => {
    return (
        <div onClick={toggle}>
            *
        </div>
    );
};

export default Cell;
