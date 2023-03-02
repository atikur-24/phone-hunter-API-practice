let inputValue = '';
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
        const { phone_name, image, slug} = phone
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img height="60%" src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadDetails('${slug}')" type="button" class="btn btn-primary px-3" data-bs-toggle="modal" data-bs-target="#phoneDetail">Details</button>
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
    // start loading spinner 
    toggleSpinner(true);

    const searchField = document.getElementById('search-field')
    const searchText = searchField.value ? searchField.value : inputValue;
    inputValue = searchText
    loadPhones(searchText, dataLimit);
    searchField.value = '';
}

// search btn add event handler onclick search button then the show phones
document.getElementById('search-btn').addEventListener('click', function() {
    processSearch(9);
})

// add keypress event handler search input field
document.getElementById('search-field').addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        processSearch(9);
        console.log(event.target.value);
    }
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

//  load phone details information
const loadDetails = async slug => {
    const URL = `https://openapi.programming-hero.com/api/phone/${slug}`
    try {
        const res = await fetch(URL);
        const data = await res.json();
        showDetail(data.data);
    }
    catch (err) {
        console.log(err);
    }
}

// display phone details information
const showDetail = (data) => {
    const { name, releaseDate, brand , mainFeatures } = data;
    const { storage, displaySize, chipSet ,memory, sensors } = mainFeatures;
    const [one, two] = sensors;
    const detailTitle = document.getElementById('phoneDetailLabel');
    detailTitle.innerText = `${name}`;

    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerHTML = `
        <div>
            <p>Brand: ${brand ? brand : 'No Brand'}</p>
            <P>Display Size: ${displaySize ? displaySize : 'No found'}</P>
            <p>Storage: ${storage ? storage : 'no storage'}</p>
            <p>Chip Set: ${chipSet ? chipSet : 'no chip set'}</p>
            <p>Memory: ${memory ? memory : 'no memory found'}</p>
            <p>Sensor: ${one ? one : two}</p>
        </div>
        <div>
        <p>Release Date: ${releaseDate ? releaseDate : 'no release date found'}</p>
        </div>
    `;
} 

// loadPhones()