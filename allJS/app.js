let BASE_api = "https://dummyjson.com"
let categories__wrapper = document.querySelector('.categories__wrapper')
let loader = document.querySelector('.loader')
let filter = document.querySelector('.filter')


let more = document.createElement('button')
more.classList.add('more')
more.textContent = "More"

let limit = 12
let count = 1
async function getProduct(endPOINT, count) {
    let response = await fetch(`${BASE_api}/${endPOINT}?limit=${limit * count}`)
    response
        .json()
        .then((res) => createdCARD(res))
        .catch(err => console.log(err))
        .finally(() => {
            loader.style.display = "none"
        })
}
getProduct('products', count)

function createdCARD(data) {
    while (categories__wrapper.firstChild) {
        categories__wrapper.firstChild.remove()
    }
    let div = document.createElement('div')
    div.classList.add('grid__card')
    data.products.forEach(item => {
        let card = document.createElement('div')
        card.classList.add('card')
        card.dataset.id = item.id
        card.innerHTML = `
            <img src="${item.images[0]}" class="card__image" alt="">
            <strong>${item.title}</strong>
            <div>
                <b>${item.brand}</b>
                <b class="price">${item.price}$</b>
            </div>
            <div>
                <b class="red">remained-${item.stock}</b>
                <button class="add">+</button>
            </div>
        `
        div.appendChild(card)
    })

    categories__wrapper.appendChild(div)
    categories__wrapper.appendChild(more)
}
more.addEventListener('click', () => {
    count++
    getProduct('products', count)
})
async function getCATEGORY(endpoint) {
    let res = await fetch(`${BASE_api}/${endpoint}`)
    res
        .json()
        .then(res => createCATEGORY(res))
        .catch(err => console.log(err))
}
getCATEGORY('products/category-list')

let cetegoryType = 'products'
function createCATEGORY(data) {
    data.forEach((item) => {
        let dat = document.createElement('data')
        dat.setAttribute('value', `/category/${item}`)
        dat.textContent = item
        dat.addEventListener('click', (e) => {
            cetegoryType = "products/"+e.target.value
            getProduct(cetegoryType, count)
        })
        filter.appendChild(dat)
    })
} 

categories__wrapper.addEventListener('click',(event)=>{
    if(event.target.className === 'card__image'){
        let id = event.target.closest('.card').dataset.id
       open(`/pages/product.html?q=${id}`,'_self')
    }
})