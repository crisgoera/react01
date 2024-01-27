import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { useState } from "react";

const App = () => {
  const [items, setItems] = useState([
    {
        id: 1,
        checked: true,
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

  const handleCheck = (id) => {
    const listItems = items.map((item)=> item.id === id ? {...item,
    checked: ! item.checked } : item);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return (
    <div className = 'App'>
      <Header title = "Grocery List"/>
      <Content
        items={items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  )
}

export default App
