import { useState } from "react";
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import AddItem from './AddItem';

const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [newItem, setNewItem] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
  }

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {
    const id = items.length ? (items[items.length - 1].id + 1) : 1;

    const myNewItem = {
        id: id,
        checked: false,
        item: item
    }

    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)

  }

  const handleCheck = (id) => {
    const listItems = items.map((item)=> item.id === id ? {...item,
    checked: ! item.checked } : item);
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems)
  }

  return (
    <div className = 'App'>
      <Header title = "Grocery List"/>
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      <Content
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  )
}

export default App
