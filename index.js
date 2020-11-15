const fetchData = async function (searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
        params : {
            apikey : '10db1a79',
            s : searchTerm
        }
    })
    console.log(response.data)
}

const input = document.querySelector('input')

const onInput = (e) => {
    fetchData(e.target.value)
}

input.addEventListener('input', debounce(onInput, 500))