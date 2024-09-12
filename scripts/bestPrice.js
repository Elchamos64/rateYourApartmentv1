async function fetchJson(url){
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function initialize(){
    try{
        const maleApartments = await fetchJson('data/maleApartments.json');
        const femaleApartments = await fetchJson('data/femaleApartments.json');

        let maleHousing = document.getElementById("best-price-male");
        let femaleHousing = document.getElementById("best-price-female");

        function bestPrice(data, location){
            let bestPrice = data[0].priceMin;
            let bestApartment = data[0];
            data.forEach(item => {
                if(item.priceMin < bestPrice){
                    bestPrice = item.priceMin;
                    bestApartment = item;
                }
            });
            location.innerHTML += `<a href="#"><div class="productbox">
            <img class="homeHousingImage" src="${bestApartment.imageUrl}" alt=${bestApartment.name}>
            <h2>${bestApartment.name}</h2>
            <h4>$${bestApartment.priceMin}<h4>
            <h3>${bestApartment.rating} / 5</h3>
            </div></a>`;
        }
        bestPrice(maleApartments, maleHousing);
        bestPrice(femaleApartments, femaleHousing);
    }catch(error){
        console.log(error);
    }
}

initialize();