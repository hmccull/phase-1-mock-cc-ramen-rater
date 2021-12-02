// As a user, I can... 
// see all ramen images in the div with id of #ramen-menu
// click on image from the #ramen-menu div and see the info about the ramen inside the #ramen-detail div
// create a new ramen after submitting the new-ramen form, which should be added to the #ramen-menu div - does not need to be POST'ed 

document.addEventListener('DOMContentLoaded', () => {
    loadImages();

    const form = document.querySelector('#new-ramen');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRamenObj = {
            name: e.target.new_name.value,
            restaurant: e.target.new_restaurant.value,
            image: e.target.new_image.value,
            rating: e.target.new_rating.value,
            comment: e.target.new_comment.value
        }
        renderRamen(newRamenObj);
    });
})

function loadImages() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => data.forEach(ramenData => renderRamen(ramenData)))
}

// function toPostNewRamen(newRamenObj) {
//     fetch('http://localhost:3000/ramens', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify()
//     })
//     .then(res => res.json())
//     .then(newRamen => renderImages(newRamen))
// }

function renderRamen(ramenData) {
    // set variables equal to desired elements to manipulate
    const imageDiv = document.querySelector('#ramen-menu');
    const imageEl = document.createElement('img');

    // set img src equal to argument
    imageEl.src = `${ramenData.image}`;
    imageEl.className = `${ramenData.name}`;
    imageEl.restaurant = `${ramenData.restaurant}`;
    imageEl.rating = `${ramenData.rating}`;
    imageEl.comment = `${ramenData.comment}`

    // append to image div
    imageDiv.append(imageEl);

    // add event listener to each image 
    imageEl.addEventListener('click', imageDetailsHandle);
}

// handle to update featured image when image is clicked 
function imageDetailsHandle(e) {
    // set variables equal to desired elements to manipulate
    const detailImage = document.querySelector('.detail-image');
    const imageName = document.querySelector('.name');
    const imageRestaurant = document.querySelector('.restaurant');
    const imageRating = document.querySelector('#rating-display');
    const imageComment = document.querySelector('#comment-display');

    // set detail image values equal to selected image values 
    detailImage.src = `${e.target.src}`;
    imageName.innerText = `${e.target.className}`;
    imageRestaurant.innerText = `${e.target.restaurant}`;
    imageRating.innerText = `${e.target.rating}`;
    imageComment.innerText = `${e.target.comment}`;
}


//------------------------------------------------------------------------

// fetch(`http://localhost:3000/ramens/${newRamenObj}`, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify()
// })
// .then(res => res.json())
// .then(newRamenObj => renderImages(newRamenObj))