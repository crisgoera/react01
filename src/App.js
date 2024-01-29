import { useState, useEffect } from "react";
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Footer from './Footer';
import Content from './Content';


const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState("")
  const [searchItem, setSearchItem] = useState("")

  useEffect(()=> {
    localStorage.setItem('shoppinglist', JSON.stringify(items))
  }, [items])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
  }

  const addItem = (item) => {
    const id = items.length ? (items[items.length - 1].id + 1) : 1;

    const myNewItem = {
        id: id,
        checked: false,
        item: item
    }

    setItems([...items, myNewItem])
  }

  const handleCheck = (id) => {
    const listItems = items.map((item)=> item.id === id ? {...item,
    checked: ! item.checked } : item);
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)
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
