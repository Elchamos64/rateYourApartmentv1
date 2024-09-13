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
    }catch(error){
        console.log(error);
    }
}

initialize();