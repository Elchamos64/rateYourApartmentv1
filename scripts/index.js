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

        function ClosestTo(data,building,location){
            let filteredData = data.filter(item =>
                item.closestTo === building
            );
            output(filteredData,location)
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
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Best Rated Male Apartments";
                bestRating(maleApartments, maleHousing);
            }
            window.close();
        });

        document.querySelector("#Hart").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                maleTitle.innerHTML = "Male Apartments Closest to the Hart";
                femaleTitle.innerHTML = "Female Apartments Closest to the Hart";
                ClosestTo(maleApartments,"Hart Building",maleHousing);
                ClosestTo(femaleApartments,"Hart Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#STC").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Science and Technology Center (STC)";
                ClosestTo(femaleApartments,"Science and Technology Center",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Science and Technology Center (STC)";
                ClosestTo(maleApartments,"Science and Technology Center",maleHousing);
            }
            window.close();
        });

        document.querySelector("#Clarke").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Clarke";
                ClosestTo(maleApartments,"Clarke Building",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Clarke";
                ClosestTo(femaleApartments,"Clarke Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#I-Center").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the I-Center";
                ClosestTo(maleApartments,"I-Center",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the I-Center";
                ClosestTo(femaleApartments,"I-Center",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#Austin").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Austin";
                ClosestTo(maleApartments,"Austin Building",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Austin";
                ClosestTo(femaleApartments,"Austin Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#Hinckley").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Hinckley";
                ClosestTo(maleApartments,"Hinckley Building",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Hinckley";
                ClosestTo(femaleApartments,"Hinckley Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#Snow").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Snow";
                ClosestTo(maleApartments,"Snow Building",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Snow";
                ClosestTo(femaleApartments,"Snow Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#Health").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Health Center";
                ClosestTo(maleApartments,"Health Center", maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Health Center";
                ClosestTo(femaleApartments,"Health Center",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
            }
            window.close();
        });

        document.querySelector("#Spori").addEventListener("click", function(){
            var newWindow = window.open("bestApt.html");
            newWindow.onload = function(){
                let maleTitle = newWindow.document.querySelector("#apartments-title");
                let maleHousing = newWindow.document.querySelector("#best-apartments");
                maleTitle.innerHTML = "Male Apartments Closest to the Spori";
                ClosestTo(maleApartments,"Spori Building",maleHousing);
                let femaleTitle= newWindow.document.querySelector("#apartments-female-title");
                let femaleHousing = newWindow.document.querySelector("#best-female-apartments");
                let viewMoreButton = newWindow.document.querySelector("#viewMoreFemaleApt");
                femaleTitle.innerHTML = "Female Apartments Closest to the Spori";
                ClosestTo(femaleApartments,"Spori Building",femaleHousing);
                viewMoreButton.innerHTML = `<button class="viewMoreButton" id="viewMoreApt">View More</button>`;
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