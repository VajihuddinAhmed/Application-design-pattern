const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>

    `

    const input = root.querySelector('input')
    const dropdown = root.querySelector('.dropdown')
    const results = root.querySelector('.results')

    const onInput = async (e) => {
        const items = await fetchData(e.target.value)

        if (!items.length) {
            dropdown.classList.remove('is-active')
            return
        }

        results.innerHTML = ''
        dropdown.classList.add('is-active')
        
        for( let item of items) {
            const options = document.createElement('a')

            options.classList.add('dropdown-item')
            options.innerHTML = renderOption(item)
            options.addEventListener('click', (e) => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item)
                onOptionSelect(item)
            })
            results.appendChild(options)
        }
    }

    input.addEventListener('input', debounce(onInput, 500))

    document.addEventListener('click', (e) => {
        if (!root.contains(e.target)) {
            dropdown.classList.remove('is-active')
        }
    })

}