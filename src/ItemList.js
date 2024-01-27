import React from 'react';
import LineItems from './LineItems';


const ItemList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map((item => (
                <LineItems
                    item = {item}
                    handleCheck = {handleCheck}
                    handleDelete = {handleDelete}
                />
            )))}
        </ul>
    )
}

export default ItemList
