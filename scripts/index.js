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

        let femaleHousing = document.getElementById("Housing-Female");//Housing-Female
        output(femaleApartments.slice(0, 3), femaleHousing);
        // femaleApartments.slice(0, 3).forEach(item => {
        //     if(item.priceMin === item.priceMax){
        //         femaleHousing.innerHTML += `<a href="#"><div class="productbox">
        //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
        //         <h2>${item.name}</h2>
        //         <h4>$${item.priceMin}<h4>
        //         <h3>${item.rating} / 5</h3>
        //         </div></a>`;   
        //     }else{
        //         femaleHousing.innerHTML += `<a href="#"><div class="productbox">
        //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
        //         <h2>${item.name}</h2>
        //         <h4>$${item.priceMin} - $${item.priceMax}<h4>
        //         <h3>${item.rating} / 5</h3>
        //         </div></a>`;
        //     }
        // });

        let maleHousing = document.getElementById("Housing-Male");//Housing
        output(maleApartments.slice(0, 3), maleHousing);
        // maleApartments.slice(0, 3).forEach(item => {
        //     if(item.priceMin === item.priceMax){
        //         maleHousing.innerHTML += `<a href="#"><div class="productbox">
        //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
        //         <h2>${item.name}</h2>
        //         <h4>$${item.priceMin}<h4>
        //         <h3>${item.rating} / 5</h3>
        //         </div></a>`;   
        //     }else{
        //         maleHousing.innerHTML += `<a href="#"><div class="productbox">
        //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
        //         <h2>${item.name}</h2>
        //         <h4>$${item.priceMin} - $${item.priceMax}<h4>
        //         <h3>${item.rating} / 5</h3>
        //         </div></a>`;
        //     }
        // });


        document.querySelector("#viewMoreFemale").addEventListener("click", function(){
            var newWindow = window.open("studentApproved.html");
            newWindow.onload = function(){
                let femaleHousing = newWindow.document.querySelector("#productbox_container");
                newWindow.document.querySelector("#gender").value = "2";
                output(femaleApartments, femaleHousing);
                // femaleApartments.forEach(item => {
                //     if(item.priceMin === item.priceMax){
                //         femaleHousing.innerHTML += `<a href="#"><div class="productbox">
                //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                //         <h2>${item.name}</h2>
                //         <h4>$${item.priceMin}<h4>
                //         <h3>${item.rating} / 5</h3>
                //         </div></a>`;   
                //     }else{
                //         femaleHousing.innerHTML += `<a href="#"><div class="productbox">
                //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                //         <h2>${item.name}</h2>
                //         <h4>$${item.priceMin} - $${item.priceMax}<h4>
                //         <h3>${item.rating} / 5</h3>
                //         </div></a>`;
                //     }
                // });
            }
            window.close();
        });

        document.querySelector("#viewMoreMale").addEventListener("click", function(){
            var newWindow = window.open("studentApproved.html");
            newWindow.onload = function(){
                let maleHousing = newWindow.document.querySelector("#productbox_container");
                newWindow.document.querySelector("#gender").value = "1";
                output(maleApartments, maleHousing);
                // maleApartments.forEach(item => {
                //     if(item.priceMin === item.priceMax){
                //         maleHousing.innerHTML += `<a href="#"><div class="productbox">
                //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                //         <h2>${item.name}</h2>
                //         <h4>$${item.priceMin}<h4>
                //         <h3>${item.rating} / 5</h3>
                //         </div></a>`;   
                //     }else{
                //         maleHousing.innerHTML += `<a href="#"><div class="productbox">
                //         <img class="homeHousingImage" src="${item.imageUrl}" alt=${item.name}>
                //         <h2>${item.name}</h2>
                //         <h4>$${item.priceMin} - $${item.priceMax}<h4>
                //         <h3>${item.rating} / 5</h3>
                //         </div></a>`;
                //     }
                // });
            }
            window.close();
        });

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
            // let bestPrice = data[0].priceMin;
            // let bestApartment = data[0];
            // data.forEach(item => {
            //     if(item.priceMin < bestPrice){
            //         bestPrice = item.priceMin;
            //         bestApartment = item;
            //     }
            // });
            data.sort(obj_sort_asc_price);
            bestApartments=data.slice(0,6);
            // bestApartments.forEach(bestApartment => {
            //     location.innerHTML += `<a href="#"><div class="productbox">
            //     <img class="homeHousingImage" src="${bestApartment.imageUrl}" alt=${bestApartment.name}>
            //     <h2>${bestApartment.name}</h2>
            //     <h4>$${bestApartment.priceMin}<h4>
            //     <h3>${bestApartment.rating} / 5</h3>
            //     </div></a>`;
            // });
            output(bestApartments, location);
        }

        function bestRating(data, location){
            data.sort(obj_sort_dec_rating);
            bestApartments=data.slice(0,6);
            output(bestApartments, location);
        }

        document.querySelector("#femaleBestPrice").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let title = newWindow.document.querySelector("#apartments-title");
                let femaleHousing = newWindow.document.querySelector("#best-apartments");
                title.innerHTML = "Best Priced Female Apartments";
                bestPrice(femaleApartments, femaleHousing);
            }
            window.close();
        });
        
        document.querySelector("#maleBestPrice").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let title = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                title.innerHTML = "Best Priced Male Apartments";
                bestPrice(maleApartments, maleHousing);
            }
            window.close();
        });

        document.querySelector("#femaleBestRating").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let title = newWindow.document.querySelector("#apartments-title");
                let femaleHousing = newWindow.document.querySelector("#best-apartments");
                title.innerHTML = "Best Rated Female Apartments";
                bestRating(femaleApartments, femaleHousing);
            }
            window.close();
        });

        document.querySelector("#maleBestRating").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let title = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                title.innerHTML = "Best Rated Male Apartments";
                bestRating(maleApartments, maleHousing);
            }
            window.close();
        });
    }catch(error){
        console.error(error);
    }
    // function myFunction() {
    //     var popup = document.getElementById("myPopup");
    //     popup.classList.toggle("show");
    //   }
}

initialize();