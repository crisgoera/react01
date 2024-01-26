import { useState } from "react";
import { FaTrashAlt} from 'react-icons/fa'

const Content = () => {

const [items, setItems] = useState([
    {
        id: 1,
        checked: false,
        item: "Half kilo unsalted roasted almonds"
    },
    {
        id: 2,
        checked: false,
        item: "Grilled Sea Bass"
    },
    {
        id: 3,
        checked: false,
        item: "Half dozen free range eggs"
    }
  ]);

  return (
        <main>
            <ul>
            {items.map((item => (
                <li className="item" key={item.id}>
                    <input
                        type="checkbox"
                        checked={item.checked}
                    />
                    <label>{item.item}</label>
                    <FaTrashAlt
                        role="button"
                        tabIndex="0"
                    />
                </li>
            )))}
            </ul>
        </main>
  )
}


export default Content
