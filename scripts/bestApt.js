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

        function output(data, location){
            data.forEach(item => {
                if(item.priceMin === item.priceMax){
                    location.innerHTML += `<a href="#"><div class="productbox">
                    <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                    <h2>${item.name}</h2>
                    <h4>$${item.priceMin}<h4>
                    <h3>${item.rating} / 5</h3>
                    </div></a>`;
                }else{
                    location.innerHTML += `<a href="#"><div class="productbox">
                    <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                    <h2>${item.name}</h2>
                    <h4>$${item.priceMin} - $${item.priceMax}<h4>
                    <h3>${item.rating} / 5</h3>
                    </div></a>`;
                }
            });
        }

        function obj_sort_asc_price(a,b){
            if (a.priceMin < b.priceMin) {
                return -1;
            } else if (a.PriceMin > b.PriceMax){
                return 1;
            } else{
                return 0;
            }
        }

        function obj_sort_dec_rating(a,b){
            if (a.rating > b.rating) {
                return -1;
            } else if (a.rating < b.rating){
                return 1;
            } else{
                return 0;
            }
        }


        function bestPrice(data, location){
            data.sort(obj_sort_asc_price);
            output(data, location);
        }

        function bestRating(data, location){
            data.sort(obj_sort_dec_rating);
            output(data, location);
        }

        let title = document.getElementById("apartments-title");
        let viewMoreButton = document.getElementById("viewMoreApt");
        viewMoreButton.addEventListener("click", function(){
            newWindow = window.open("studentApproved.html");
            newWindow.onload = function() {
                let Housing = newWindow.document.querySelector("#productbox_container");
                if(title.innerHTML.includes("Female")){
                    newWindow.document.querySelector("#gender").value = "2";
                    if(title.innerHTML.includes("Priced")){
                        bestPrice(femaleApartments, Housing);
                    }else{
                        bestRating(femaleApartments, Housing);
                    }
                }else{
                    if(title.innerHTML.includes("Priced")){
                        bestPrice(maleApartments, Housing);
                    }else{
                        bestRating(maleApartments, Housing);
                    }
                }
            }
            window.close();
        });
    }catch(error){
        console.log(error);
    }
}

initialize();