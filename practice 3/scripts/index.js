document.querySelector("#query").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {

        let val = document.querySelector("#query").value;
        GetData(val)
    }

})
let arr;
async function GetData(query) {
    let url = `https://masai-mock-api.herokuapp.com/hotels/search?city=${query}`
    const res = await fetch(url);
    let data = await res.json();
    arr = data.hotels;
    append(arr)

}
document.addEventListener("#sort_lth").addEventListener("click", function () {
    console.log("A")
})


function append(arr) {
    let hotelList = document.querySelector("#hotels_list")
    hotelList.innerHTML = null
    arr.forEach(elm => {
        let img = document.createElement("img");

        img.src = elm.Images.one;
        let name = document.createElement("p")
        name.innerText = elm.Title;
        let price = document.createElement("p");
        price.innerText = `price-${elm.Price}`;
        let ac = document.createElement("p");
        ac.innerText = `Ac-${elm.Ac}`;
        let rating = document.createElement("p");
        rating.innerText = `Rating- ${elm.Rating}`
        let div = document.createElement("div");
        div.id = "hotel";
        let book = document.createElement("input");
        book.type = "button";
        book.value = "Book now";
        book.className = "book";

        book.addEventListener("click", function () {
            let logIn = localStorage.getItem("logIn");
            console.log(logIn)
            if (logIn == "true") {
                localStorage.setItem("checkOut", JSON.stringify(elm));
                console.log(localStorage);
                window.location.replace("./checkout.html")
            }

            else {
                alert("User Not Login,kindly login")
            }
        })
        div.append(img, name, price, rating, ac, book)
        hotelList.append(div)
    });

}



function lth(){
    console.log(arr)
    arr = arr.sort(function(a,b){
        return a.Price - b.Price
    });
    console.log('arr1', arr)
    append(arr);
}



function htl(){
    arr.sort(function(a,b){
        if(a.Price < b.Price) return 1;
          if(a.Price > b.Price) return -1;
        return 0 ;
    });
    append(arr);
}


function ac() {
    let data = arr.filter(hotel => hotel.Ac === true)
    append(data);
}
function nonac() {
    let data = arr.filter(hotel => hotel.Ac === false)
    append(data);
}


