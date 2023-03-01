// get all phone data 
const loadPhones = async(searchText, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showPhones(data.data, dataLimit)
    }
    catch (err) {
        console.log(err)
    }
}

// show all phones in UI
const showPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = '';

    const showAllElement = document.getElementById('show-all-element')
    // display 9 phones only
    if (dataLimit && phones.length >= 9) {
        phones = phones.slice(0, 9);
        showAllElement.classList.remove('d-none');
    } else showAllElement.classList.add('d-none')

    // found phone
    const foundPhone = document.getElementById('found-phone-msg');
    if(phones.length === 0) {
        foundPhone.classList.remove('d-none');
    } else foundPhone.classList.add('d-none');

    // display phones 
    phones.forEach(phone => {
        const { phone_name, image} = phone
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img height="60%" src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loading spinner
    toggleSpinner(false)
}

// this common function load the data
const processSearch = (dataLimit) => {  
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    searchField.value = '';
}

// search btn add event handler onclick search button the show phones
document.getElementById('search-btn').addEventListener('click', function() {
    // start loading spinner 
    toggleSpinner(true);
    processSearch(9);
})

// this function will work toggle spinner
const toggleSpinner = (isLoading) => {
    const spinnerElement = document.getElementById('spinner');
    if (isLoading) {
        spinnerElement.classList.remove('d-none');
    } else {
        spinnerElement.classList.add('d-none');
    }
}

// add click event handler to the show all button
document.getElementById('show-all-btn').addEventListener('click', function() {
    processSearch();

})

// loadPhones()
/*     // found phone text display none after loaded data
    const foundPhone = document.getElementById('found-phone-msg');
    foundPhone.classList.add('d-none'); */