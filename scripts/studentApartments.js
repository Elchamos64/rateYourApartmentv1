async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function initialize() {
    try{
        const maleApartments = await fetchJSON("data/maleApartments.json");
        const femaleApartments = await fetchJSON("data/femaleApartments.json");

        console.log(maleApartments);

        function output(data){
            const outputListElement = document.querySelector("#productbox_container");
            data.forEach(item => {
                if(item.priceMin === item.priceMax){
                    outputListElement.innerHTML += `<a href="#"><div class="productbox">
                    <img src="${item.imageUrl}" alt=${item.name}>
                    <h2>${item.name}</h2>
                    <h4>$${item.priceMin}<h4>
                    <h3>${item.rating} / 5</h3>
                    </div></a>`;   
                }else{
                    outputListElement.innerHTML += `<a href="#"><div class="productbox">
                    <img src="${item.imageUrl}" alt=${item.name}>
                    <h2>${item.name}</h2>
                    <h4>$${item.priceMin} - $${item.priceMax}<h4>
                    <h3>${item.rating} / 5</h3>
                    </div></a>`;
                }
            });
        }
        function Reset(){
            document.querySelector("#productbox_container").innerHTML = "";
        }
        function obj_sort_asc(a,b){
            if (a.priceMin < b.priceMin) {
                return -1;
            } else if (a.priceMin > b.priceMin){
                return 1;
            } else{
                return 0;
            }
        }
        function obj_sort_dsc(a,b){
            if(a.priceMin < b.priceMin) {
                return 1;
            } else if (a.priceMin > b.priceMin){
                return -1;
            } else{
                return 0;
            }
        }
        function sortPriceAsc(){
            Reset();
            maleApartments.sort(obj_sort_asc);
            output(maleApartments);
        }
        function sortPriceDsc(){
            Reset();
            maleApartments.sort(obj_sort_dsc);
            output(maleApartments);
        }

        // function filterByGym(){
        //     Reset();
        //     const filteredApartments = apartments.filter(apartment => apartment.amenities.includes("gym"));
        //     output(filteredApartments);
        // }

        // function filterByWasherDryer(){
        //     Reset();
        //     const filteredApartments = apartments.filter(apartment => apartment.amenities.includes("Washer/Dryer"));
        //     output(filteredApartments);
        // }

        // function filterByPrivateRoom() {
        //     Reset();
        //     const filteredApartments = apartments.filter(apartment => apartment.private_room === true);
        //     output(filteredApartments);
        // }

        // function filterByHouse() {
        //     Reset();
        //     const filteredApartments = apartments.filter(apartment => apartment.house === true);
        //     output(filteredApartments);
        // }

        // function filterByMusicRoom() {
        //     Reset();
        //     const filteredApartments = apartments.filter(apartment => apartment.amenities.includes("music room"));
        //     output(filteredApartments);
        // }

        // function filters(){
        //     var privateRoom = document.querySelector("#privateRoom");
        //     var house = document.querySelector("#house");
        //     var gym = document.querySelector("#exerciseRoom");
        //     var washerDryer= document.querySelector("#washerDryer");
        //     var musicRoom = document.querySelector("#musicRoom");
        //     if (privateRoom.checked) {
        //         filterByPrivateRoom();
        //     } else if (house.checked) {
        //         filterByHouse();
        //     } else if (gym.checked) {
        //         filterByGym();
        //     } else if(washerDryer.checked){
        //         filterByWasherDryer();
        //     } else if(musicRoom.checked){
        //         filterByMusicRoom();
        //     }
        //     else {
        //         Reset();
        //         output(apartments);
        //     }
        // }

        function search(){
            Reset();
            var searchInput = document.querySelector("#search").value;
            var searchResults = maleApartments.filter(apartment => apartment.name.toLowerCase().includes(searchInput.toLowerCase()));
            output(searchResults);
        }

        let minPriceValue = document.getElementById("priceMinValue");
        let maxPriceValue = document.getElementById("priceMaxValue");
        let minReviewValue = document.getElementById("reviewMinValue");
        let maxReviewValue = document.getElementById("reviewMaxValue");

        const priceRangeFill = document.querySelector("#price-range-fill");
        const reviewRangeFill = document.querySelector("#review-range-fill");

        const inputElements = document.querySelectorAll("input[type='range']");


        function validateRange(){
            let minPrice = parseInt(inputElements[0].value);
            let maxPrice = parseInt(inputElements[1].value);
            let minReview = parseInt(inputElements[2].value);
            let maxReview = parseInt(inputElements[3].value);

            if(minPrice > maxPrice){
                inputElements[0].value = maxPrice;
                inputElements[1].value = minPrice;
            }
            if(minReview > maxReview){
                inputElements[2].value = maxReview;
                inputElements[3].value = minReview;
            }

            const minPricePercentage = (minPrice / 2000) * 100;
            const maxPricePercentage = (maxPrice / 2000) * 100;
            priceRangeFill.style.left = minPricePercentage + "%";
            priceRangeFill.style.width = maxPricePercentage - minPricePercentage + "%";

            const minReviewPercentage = (minReview / 5) * 100;
            const maxReviewPercentage = (maxReview / 5) * 100;
            reviewRangeFill.style.left = minReviewPercentage + "%";
            reviewRangeFill.style.width = maxReviewPercentage - minReviewPercentage + "%";

            minPriceValue.innerHTML = "$" + minPrice;
            maxPriceValue.innerHTML = "$" + maxPrice;
            minReviewValue.innerHTML = minReview;
            maxReviewValue.innerHTML = maxReview;
        }

        inputElements.forEach(element => {
            element.addEventListener("input", validateRange);
        });

        validateRange();

        function filters(){
            // Select all checked checkboxes
            var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

            var gender = document.querySelector('#gender');

            // Extract the values of the checked checkboxes
            var checkedValues = Array.from(checkboxes).map(cb => cb.value);

            // Reset the state (clear previous filters)
            Reset();

            // Filter the apartments based on selected attributes
            var filteredApartments;
            if(gender.value === "1"){ 
                filteredApartments= maleApartments.filter(apartment => 
                checkedValues.every(attribute => apartment.attributes.includes(attribute))
                );
            }else{
                filteredApartments = femaleApartments.filter(apartment => 
                    checkedValues.every(attribute => apartment.attributes.includes(attribute))
                );
            }

            filteredApartments = filteredApartments.filter(apartment => 
                apartment.priceMin >= parseInt(inputElements[0].value) && apartment.priceMin <= parseInt(inputElements[1].value));
            filteredApartments = filteredApartments.filter(apartment => 
                apartment.rating >= parseInt(inputElements[2].value) && apartment.rating <= parseInt(inputElements[3].value));
            output(filteredApartments);

            document.querySelector("#ascending").addEventListener("click", () => {
                Reset();
                filteredApartments.sort(obj_sort_asc);
                output(filteredApartments);
            });

            document.querySelector("#descending").addEventListener("click", () => {
                Reset();
                filteredApartments.sort(obj_sort_dsc);
                output(filteredApartments);
            });

            // Output the filtered apartments 
            // if (checkedValues.length === 0) {
            //     Reset();
            //     if(document.querySelector("#gender").value === "1"){
            //         output(maleApartments);
            //     }else{
            //         output(femaleApartments);
            //     }
            // }
        }

        function clearFilter(){
            var checkedCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
            // Uncheck each checkbox
            checkedCheckboxes.forEach(cb => cb.checked = false);
            // Reset the range slider
            inputElements[0].value = 0;
            inputElements[1].value = 2000;
            inputElements[2].value = 0;
            inputElements[3].value = 5;
            priceRangeFill.style.left = "0%";
            priceRangeFill.style.width = "100%";
            reviewRangeFill.style.left = "0%";
            reviewRangeFill.style.width = "100%";
            minPriceValue.innerHTML = "$0";
            maxPriceValue.innerHTML = "$2000";
            minReviewValue.innerHTML = "0";
            maxReviewValue.innerHTML = "5";
            Reset();
            filters();
        }



        document.querySelector("#filter").addEventListener("click", filters);
        document.querySelector("#ascending").addEventListener("click", sortPriceAsc);
        document.querySelector("#descending").addEventListener("click", sortPriceDsc);
        document.querySelector("#searchButton").addEventListener("click", search);
        document.querySelector("#clearFilter").addEventListener("click", clearFilter);
        document.querySelector("#search").addEventListener("keyup", search);

    } catch(error){
        console.error(error);
    }
}

initialize();