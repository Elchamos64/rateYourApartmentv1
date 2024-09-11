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
                if(item.priceMin === item.price){
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