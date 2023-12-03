const accessKey = 'c5gcfqK0CD15F00ffbTsn54NxR82O4-Ain9W1FCc7bw';

const inputForm = document.querySelector('#inputForm')
const inputData = document.querySelector('#inputData')
const searchResults = document.querySelector('#searchResults')
const showMoreBTN = document.querySelector('#showMoreBTN')
const aboveBTN = document.querySelector('#aboveBTN')
const showMore = document.querySelector('#showMore')

let inputText = '';
let page = 1;

async function gettingImage() {
    inputText = inputData.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if(page=== 1) {
        searchResults.innerHTML = '';
    }
    if(inputText && results.length > 1 ){
        results.map((oneResult) => {
            const eachPhoto = document.createElement('div')
            eachPhoto.classList.add('flex','flex-col','items-center','gap-y-1')
            eachPhoto.innerHTML = ` <img class="w-full rounded-md" src=${oneResult.urls.small} alt="${oneResult.alt_description}">
            <a  href=${oneResult.links.html} target="_blank" class="text-lg ">${oneResult.alt_description}</a>`;
            searchResults.appendChild(eachPhoto)
            page++;
        })
    }
    else if(!inputText){
        const nophoto = document.createElement('div');
        nophoto.classList.add('flex','flex-col','items-center','col-span-3')
        nophoto.innerHTML =`<p class="text-3xl text-white ">There is no Results!</p><p class="text-3xl text-white ">Please put complete word!</p>`;
        searchResults.appendChild(nophoto);
        page = 1;
        showMoreBTN.classList.add('hidden')
        aboveBTN.classList.add('hidden')
    }
    if(page > 1){
        console.log("lee");
        showMore.classList.remove('hidden');
        showMore.classList.add('flex');
        showMoreBTN.classList.remove('hidden')
        aboveBTN.classList.remove('hidden')
    
    }
    
}

inputForm.addEventListener('submit',(event)=> {
    event.preventDefault();
    page = 1;
    gettingImage();
    // inputData.value = null;
})

showMoreBTN.addEventListener('click',() => {
    gettingImage();
    
})

inputData.addEventListener('keydown',(event) => {
    if(event.key === 'Enter'){
     event.preventDefault();
    page = 1;
    gettingImage();
    }
})