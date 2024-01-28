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

            <button
                type = "submit"
                aria-label = "Search Item">
            </button>
        </form>
  )
}

export default SearchItem
