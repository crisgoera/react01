import { useState, useEffect } from "react";
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Footer from './Footer';
import Content from './Content';
import apiRequest from "./apiRequest";


const App = () => {
    const API_URL = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error('Did not receive expected data');
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            (async () => await fetchItems())();
        }, 2000);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
    }

    const addItem = async (item) => {
        const id = items.length ? (items[items.length - 1].id + 1) : 1;

        const myNewItem = {
            id: id,
            checked: false,
            item: item
        }

        setItems([...items, myNewItem])

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(myNewItem)
        }

        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);
    }

    const handleCheck = async (id) => {
        const listItems = items.map((item)=> item.id === id ? {...item,
        checked: ! item.checked } : item);
        setItems(listItems);

        const myItem = listItems.filter(item => item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ checked: myItem[0].checked })
        }
        const reqURL = `${API_URL}/${id}`;
        const result = await apiRequest(reqURL, updateOptions);
        if (result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);

        const deleteOptions = {
            method: 'DELETE',
            headers: {
                'Content-type': 'appilcation/json'
            },
        }
        const reqURL = `${API_URL}/${id}`;
        const result = await apiRequest(reqURL, deleteOptions);
        if (result) setFetchError(result);
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
        <main>
            {isLoading && <p>Loading items...</p>}
            {fetchError && <p style = {{color: 'red'}}>{`Error: ${fetchError}`}</p>}
            {!fetchError && !isLoading && <Content
                items = {items.filter((item) => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
            />}
        </main>

        <Footer length = {items.length}/>
        </div>
    )
}

export default App
