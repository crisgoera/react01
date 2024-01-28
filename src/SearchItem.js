const SearchItem = ( {SearchItem, setSearchItem} ) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="searchForm">Search for...</label>
            <input
                autoFocus
                id = 'searchItem'
                type = 'text'
                role = 'searchbox'
                placeholder = 'Search for...'
                required
                value = {SearchItem}
                onChange = {(e) => setSearchItem(e.target.value)}
            />
        </form>
  )
}

export default SearchItem
