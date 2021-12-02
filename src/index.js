// array of objects 
/*
DELIVERABLES
- see all ramen images in div with id of ramen-menu
- click on an image from the ramen-menu and see it's info in the ramen-detail 
- create new ramen after submutting new-ramen form  
*/

// ! GLOBAL VARIABLES 
// find our menu
const ramenMenu = document.querySelector('#ramen-menu');
// find our form 
const form = document.querySelector('#new-ramen');

document.addEventListener('DOMContentLoaded', () => {
    loadRamenData();

    // add event listener to form for submit 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // set user input equal to key/value pairs in object
        const ramenObject = {
            name: `${e.target.new_name.value}`,
            restaurant: `${e.target.new_restaurant.value}`,
            image: `${e.target.new_image.value}`,
            rating: `${e.target.new_rating.value}`,
            comment: `${e.target.new_comment.value}`,
        }
        // pass object to be rendered to DOM
        renderRamenObject(ramenObject)
        // reset form after submit event
        form.reset();
    });
})

// fetch ramen data 
function loadRamenData() {
    fetch('http://localhost:3000/ramens')
    .then (res => res.json())
    .then(ramenArray => iterateRamenArray(ramenArray))
}

function iterateRamenArray(ramenArray) {
    // iterate through ramen array and pass each object within the array to be rendered
    ramenArray.forEach((ramenObj) => renderRamenObject(ramenObj));
}

function renderRamenObject(ramenObj) {
    // create new img element
    const ramenEl = document.createElement('img')
    // set img values equal to argument object values 
    ramenEl.src = `${ramenObj.image}`;
    ramenEl.className = `${ramenObj.name}`;
    ramenEl.restaurant = `${ramenObj.restaurant}`;
    ramenEl.rating = `${ramenObj.rating}`;
    ramenEl.comment = `${ramenObj.comment}`;
    // add event listener to ramen element
    ramenEl.addEventListener('click', handleDetails)
    // append ramenEl to ramen menu
    ramenMenu.append(ramenEl);
}

function handleDetails(e){
    // set var equal to clicked element
    const ramenClicked = e.target;
    // find our detail image element 
    const ramenDetails = document.querySelector('.detail-image');
    // set element src to ramenClicked src   
    ramenDetails.src = `${ramenClicked.src}`;
    ramenDetails.alt = `${ramenClicked.className}`
    // set element name to ramenClicked name
    const ramenName = document.querySelector('.name');
    ramenName.innerText = `${ramenClicked.className}`;
    // set element restaurant to ramenClicked restaurant 
    const ramenRestaurant = document.querySelector('.restaurant');
    ramenRestaurant.innerText = `${ramenClicked.restaurant}`;
    // set element rating to ramenClicked rating 
    const ramenRating = document.querySelector('#rating-display');
    ramenRating.innerText = `${ramenClicked.rating}`;
    // set element comment to ramenClicked comment
    const ramenComment = document.querySelector('#comment-display');
    ramenComment.innerText = `${ramenClicked.comment}`;
}