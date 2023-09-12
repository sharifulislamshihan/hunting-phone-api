const loadPhone = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    // 1. taking the phone container div
    const phoneContainer = document.getElementById('phone-container');
    // to clear phone container
    phoneContainer.textContent = '';

    // show all button if there are more then 10 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // to display only first 10 phone
    phones = phones.slice(0,10);

    phones.forEach( phone => {
        console.log(phones);
        // 2. creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl p-4 my-11`;
        
        // 3.Set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-center my-5">
            <button onclick="handleShowDetails('${phone.slug}');" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // Appner this html to the phonecard id div
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner after getting all info from API
    toggleLoadingSpinner(false);
}


// Handle search Button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    toggleLoadingSpinner(true);
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);

}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}
// showing details of single phone
const handleShowDetails = async(id) =>{
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

// showing phone details

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img class="mx-auto my-5" src="${phone.image}" alt="">
        <h3 class="font-bold text-3xl my-3">${phone.name}</h3>
        <p class="text-[#706F6F] text-sm mt-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Storage :</span>${phone.mainFeatures.storage}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Display Size :</span>${phone.mainFeatures.displaySize}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Chipset :</span>${phone.mainFeatures.chipSet}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Memory :</span>${phone?.mainFeatures?.memory}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Slug :</span>${phone.slug}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Release Date :</span>${phone.releaseDate}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">Brand :</span>${phone.brand}</h2>
        <h2 class="mt-3 text-[#706F6F] font-semibold "><span class="text-black">GPS :</span>${phone?.others?.GPS}</h2>
        <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-red-700 text-white">Close</button>
        </form>
        </div>
    `

    show_details_modal.showModal();
}

// loadPhone();