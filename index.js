const fetchData = async function (searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
        params : {
            apikey : '10db1a79',
            s : searchTerm
        }
    })

    if (response.data.Error) {
        return []
    }


    return response.data.Search
}

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>

`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const results = document.querySelector('.results')

const onInput = async (e) => {
    const movies = await fetchData(e.target.value)
    for( let mov of movies) {
        const div = document.createElement('div')

        div.innerHTML = `
        <img src=${mov.Poster} />
        <h1>${mov.Title}</h1>
        `
        document.querySelector('#target').appendChild(div)
    }
}

input.addEventListener('input', debounce(onInput, 500))