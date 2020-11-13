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

const debounce = (func, delay = 1000) => {
    let timeout
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}


const onInput = (e) => {
    fetchData(e.target.value)
}


input.addEventListener('input', debounce(onInput, 500))