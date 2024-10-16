let BASE_api = "https://dummyjson.com"
let loader = document.querySelector('.loader')
let container = document.querySelector('.container')
let wrapper = document.querySelector('.wrapper')
let info = document.querySelector('.info')
let CommentAndDesc = document.querySelector('.CommentAndDesc')
let allCam = document.querySelector('.allCam')



async function getINFO(){
    let query = new URLSearchParams(window.location.search)
    let id = query.get('q')
    let response = await fetch(`${BASE_api}/products/${id}`)
    response
    .json()
    .then(res => createdInfoPage(res))
    .catch(err => console.log(err))
    .finally(()=> loader.style.display = 'none')
}
getINFO()



function createdInfoPage(data){

    info.innerHTML = `
        <div class="data_img">
            <div></div>
            <img class="on" src="${data.images[0]}" alt="">
        </div>
        <div class="data_text">
           <div>
                <strong>${data.title}</strong><br>
                <b>${data.price} $ </b>
           </div>
            <div class="grid_text">
                <div class="border">Rating</div>
                <div>${data.rating}</div>

                <div class="border">Brand</div>
                <div>${data.brand}</div>

                <div class="border">Category</div>
                <div>${data.category}</div>
            </div>
        </div>
    `;

    CommentAndDesc.innerHTML = `<p>${data.description}</p>`; // Tavsifni tozalab qo'yamiz
    
    data.reviews.forEach(el => {     
        allCam.innerHTML += `
        <br>
           <div class="com">
           <div class="comment">
           <div class="item">
                   <span class="pad">${el.reviewerName}</span>
              <p class="pad">${el.comment}</p>
              <span class="pad">${el.reviewerEmail}</span>

            <div class=""stars>
                    ${'<i class="fa-solid fa-star"></i>'.repeat(el.rating)}
                    ${'<i class="fa-regular fa-star"></i>'.repeat(5 - el.rating)}
            </div>

           </div>
         </div>
           </div>
        `;
    });
}

