import { FaTrashAlt} from 'react-icons/fa'

const LineItems = ({ item, handleCheck, handleDelete, key}) => {
    return (
        <li className="item" key={key}>
        <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheck(item.id) }
        />
        <label
            style = {(item.checked) ? {textDecoration: 'line-through'} : null}
            onDoubleClick = {() => handleCheck(item.id) }
            >{item.item}</label>
        <FaTrashAlt
            role = "button"
            onClick = {() => handleDelete(item.id)}
            tabIndex="0"
            aria-label={`Delete ${item.item}`}
        />
        </li>
    )
}

export default LineItems
