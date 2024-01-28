import { useState } from "react";
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Footer from './Footer';
import Content from './Content';


const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const [newItem, setNewItem] = useState("")
  const [searchItem, setSearchItem] = useState("")

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

    setAndSaveItems([...items, myNewItem])
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
      <SearchItem
        searchItem = {searchItem}
        setSearchItem = {setSearchItem}
      />
      <Content
        items = {items.filter((item) => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  )
}

export default App
