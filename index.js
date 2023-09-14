
//products array
const productData = [
    {
        qty: 0,
        id: 1,
        img: "https://www.baskethunt.com/wp-content/uploads/2021/01/nestle-classic-chocolate-bar-37-4-g-3-20201111.jpg",
        name: "chocolate-bar ",
        rate: 19.99,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 2,
        img: "https://smoor.in/cdn/shop/collections/TRUE_BAR_-_CARAMEL_CRUNCH_CHOCOLATE_1200x1200.png?v=1680964993",
        name: "CRUNCH_CHOCOLATE ",
        rate: 29.99,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 3,
        img: "https://images.meesho.com/images/products/261300037/9wdx0_512.jpg",
        name: "Some chocolate",
        rate: 29.99,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 4,
        img: "https://www.bigbasket.com/media/uploads/p/l/40091019-9_4-cadbury-fuse-chocolate-bar.jpg",
        name: "fuse-chocolate ",
        rate: 29.99,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 5,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Milka_Alpine_Milk_Chocolate_bar_100g_with_chunks_broken_off.jpg/800px-Milka_Alpine_Milk_Chocolate_bar_100g_with_chunks_broken_off.jpg",
        name: "Milka_Alpine_Milk_Chocolate_bar ",
        rate: 40,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 6,
        img: "https://health.clevelandclinic.org/wp-content/uploads/sites/3/2015/03/chocolateWhiteDark-454384771-770x533-1.jpg",
        name: "chocolateWhiteDark ",
        rate: 50,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 7,
        img: "https://www.verywellfit.com/thmb/45JlEKUHBca4l6D09yErf11wb-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chocolate-crop-af8463c81ccd4c8eb896f8a577a4c48e.jpg",
        name: "chocolate ",
        rate: 60,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvK9PZsmdX-EF6RMOy1XRnbxe8cIyLmTMRBQ&usqp=CAU",
        name: "something 2",
        rate: 70,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 9,
        img: "https://m.media-amazon.com/images/I/51nF7-x2bPL.jpg",
        name: "something 3",
        rate: 70,
        isAdded: 'N'
    },
    {
        qty: 0,
        id: 10,
        img: "https://opensecret.in/cdn/shop/files/CoconutChocolate_lifestyle.jpg?v=1686558429",
        name: "something 4",
        rate: 70,
        isAdded: 'N'
    },

];
//global cart count
let count = 0;
//store the products array in localstorage
localStorage.setItem("productData", JSON.stringify(productData));
showAll();


function updateQuantity(id, newValue) {
    // Find the product with the given id
    productData.forEach((item, index) => {
        if (item.id == id) {
            // console.log(index);
            var temp = item;
            temp.qty = newValue;
            productData[index] = temp
            localStorage.setItem("productData", JSON.stringify(productData));
            // console.log(productData);
        }
    });

}


$('#mainSection').on('click', '.btnAdd', function () {
    var $input = $(this).parent().find('input');
    var valid = parseInt($input.val());

    const id = $(this).attr('data-id');
    // Find the product with the given id
    if (valid > 0) {
        if (count < 8) {
            count++;
            productData.forEach((item, index) => {
                if (item.id == id) {
                    var temp = item;
                    temp.isAdded = "Y";
                    productData[index] = temp;
                    localStorage.setItem("productData", JSON.stringify(productData));
                }
            });
            // console.log(productData);
            showAll();
            calculateTotal();
        } else {
            //toastr
            alert("Pack can contain only 8 items");
        }
    } else {
        //toastr
        alert("Please add valid quantity");

    }
});

function calculateTotal() {
    var total = 0;
    productData.forEach((item, index) => {
        if (item.isAdded == "Y") {
            total += (parseInt(item.rate) * parseInt(item.qty));
        }
    });

    // Update the HTML content of an element with the class "total"
    $('.total').html(total);
}

function showAll() {
    // console.log('in');
    $('#mainSection').empty();
    if (productData) {
        for (const product of productData) {
            var cardDiv = "";
            cardDiv =
                `<div class="col-xs-12 col-md-4 col-lg-3 mb-2 mt-2" >` +
                `<div class="card">` +
                `<img class="card-img-top m-2" style="height: 150px; width:auto;" src="${product.img}" alt="Card image cap">` +
                `<div class="card-body">` +
                `<h5 class="card-title">${product.name}</h5>` +
                `<p class="card-text">Price: ${product.rate.toFixed(2)}</p>` +
                `</div>` +
                '<div class="d-flex justify-content-center m-2">' +
                '<a class="minus" data-id="' + product.id + '">-</a>' +
                '<input type="text" class="inputBtn" data-id="' + product.id + '" value="' + product.qty + '"/>' +
                '<a class="plus" data-id="' + product.id + '">+</a>' +
                '</div>';

            // console.log(product.isAdded == "Y");
            if (product.isAdded == "Y") {
                // console.log('inside Y');
                cardDiv += `<a href="javascript:;" class="btn btn-success btnRemove" data-id="${product.id}">Added</a>` +
                    `</div>` +
                    `</div>` +
                    `</div>`;
            } else {
                cardDiv += `<a href="javascript:;" class="btn btn-primary btnAdd" data-id="${product.id}">Add to Cart</a>` +
                    `</div>` +
                    `</div>` +
                    `</div>`;
            }

            $('#mainSection').append(cardDiv);
        }
    }
}
$('#mainSection').on('click', '.minus', function () {
    const id = $(this).attr('data-id');
    var $input = $(this).parent().find('input');
    // console.log(id);
    var count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    $input.val(count);
    $input.change();
    updateQuantity(id, count);
    calculateTotal();
    return false;
});

$('#mainSection').on('click', '.plus', function () {

    const id = $(this).attr('data-id');
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) + 1;
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    updateQuantity(id, count);
    calculateTotal();
    return false;
});
$('#mainSection').on('click', '.btnRemove', function () {

    const id = $(this).attr('data-id');
    // Find the product with the given id
    count--;
    productData.forEach((item, index) => {
        if (item.id == id) {
            var temp = item;
            temp.isAdded = "N";
            productData[index] = temp;
            localStorage.setItem("productData", JSON.stringify(productData));
        }
    });
    //reload data
    showAll();
    calculateTotal();

});


$('#cartModel').on('click', function () {
    // first create html to append to table
    var html = "";
    var localTotal = 0;
    $('#tableData').empty();
    $('#tableTotal').empty();
    productData.forEach((item, index) => {
        if (item.isAdded == "Y") {
            html += '<tr>' +
                '<td class="w-25">' +
                '<img src="' + item.img + '"class="img-fluid img-thumbnail" alt="Sheep">' +
                '</td >' +
                '<td>' + item.name + '</td>' +
                '<td>' + parseInt(item.rate) + '</td>' +
                '<td class="qty">' + item.qty + '</td>' +
                '<td>' + parseInt(item.qty) * parseInt(item.rate) + '</td>';
            '</tr>' +
                {/* <td>178</td> */ }
            localTotal += parseInt(item.qty) * parseInt(item.rate);

        }
    });
    // html += '<td>' + localTotal + '</td>';
    // tableData
    $('#tableData').append(html);
    $('#tableTotal').append(localTotal);
    $('#cartModal').modal('show');

});