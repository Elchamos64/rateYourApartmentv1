
let apartments= [
    {
        "id": 1,
        "imageUrl": "images/the_cove.jpg",
        "name": "The Cove",
        "address": "220 S 2nd W",
        "city": "Rexburg",
        "state": "ID",
        "zip": "83440",
        "price": 1750,
        "rating": 4.5,
        "amenities": ["Washer/Dryer", "gym", "music room"],
        "private_room": false
    },
    {
        "id": 2,
        "imageUrl": "images/the_lodge.jpg",
        "name": "The Lodge",
        "address": "538 S 2nd W",
        "city": "Rexburg",
        "state": "ID",
        "zip": "83440",
        "price": 1610,
        "rating": 3.8,
        "amenities": ["gym", "parking"],
        "private_room": false
    },
    {
        "id": 3,
        "imageUrl": "images/nauvoo-house-apartments-rexburg-id-primary-photo.jpg",
        "name": "Nauvoo Housing",
        "address": "789 Oak Street",
        "city": "City",
        "state": "State",
        "zip": "13579",
        "price":1500,
        "rating": 4.2,
        "amenities": ["pool", "parking"],
        "private_room": false
    },
    {
        "id": 4,
        "imageUrl": "images/Northpoint.webp",
        "name": "North Point",
        "address": "1011 Pine Street",
        "city": "City",
        "state": "State",
        "zip": "24680",
        "price": 1675,
        "rating": 4.0,
        "amenities": ["pool", "gym"],
        "private_room": false
    },
    {
        "id": 5,
        "imageUrl": "images/ridge.webp",
        "name": "The Ridge",
        "address": "1213 Cedar Street",
        "city": "City",
        "state": "State",
        "zip": "35791",
        "price": 1799,
        "rating": 4.7,
        "amenities": ["pool", "gym", "parking"],
        "private_room": true
    },
    {
        "id": 6,
        "imageUrl": "images/the_landing.jpg",
        "name": "The Landing",
        "address": "1415 Maple Street",
        "city": "City",
        "state": "State",
        "zip": "46802",
        "price": 1670,
        "rating": 3.5,
        "amenities": ["pool", "gym", "parking"],
        "private_room": false
    }
];
function output(data){
    const outputListElement = document.querySelector("#productbox_container");
    data.forEach(item => {
        outputListElement.innerHTML += `<a href="#"><div class="productbox">
        <img src="${item.imageUrl}" alt=${item.name}>
        <h3>${item.name}</h3>
        <p>$${item.price}/Semester<p>
        <h4>${item.rating}</h4>
        <span class="star">&#8902;</span>
        <span class="star">&#8902;</span>
        <span class="star">&#8902;</span>
        <span class="star">&#8902;</span>
        <span class="star">&#8902;</span></div></a>`;       
    });
}
function Reset(){
    document.querySelector("#productbox_container").innerHTML = "";
}
function obj_sort_asc(a,b){
    if (a.price < b.price) {
        return -1;
    } else if (a.price > b.price){
        return 1;
    } else{
        return 0;
    }
}
function obj_sort_dsc(a,b){
    if(a.price < b.price) {
        return 1;
    } else if (a.price > b.price){
        return -1;
    } else{
        return 0;
    }
}
function sortPriceAsc(){
    Reset();
    apartments.sort(obj_sort_asc);
    output(apartments);
}
function sortPriceDsc(){
    Reset();
    apartments.sort(obj_sort_dsc);
    output(apartments);
}
output(apartments);
document.querySelector("#ascending").addEventListener("click", sortPriceAsc);
document.querySelector("#descending").addEventListener("click", sortPriceDsc);