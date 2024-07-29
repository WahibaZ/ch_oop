

document.addEventListener('DOMContentLoaded', function() {   
 //Create an object class for the product to store the properties for id, name and price of the product.
 class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// Create an object class for the shopping cart item to store the properties for product and its quantity.
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}
//Create another object class for the shopping cart which contains an array of ShoppingCartItem instances.
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const item = new ShoppingCartItem(product, quantity);
        this.items.push(item);
    }

    removeItem(productId) {
        //Si la condition item.product.id !== productId est vraie, 
        //l'élément est inclus dans le nouveau tableau. Sinon, il est exclu.
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getTotalItems() {
        //nombres des items(et pas la quantite)
        return this.items.length;
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayItems() {
        this.items.forEach(item => {
            console.log(`Product: ${item.product.name}, Quantity: ${item.quantity}, Total Price: $${item.getTotalPrice().toFixed(2)}`);
        });
    }
}
// Initialize the shopping cart
const shoppingCart = new ShoppingCart();

 // Initialize products from the DOM
 const products = document.querySelectorAll('.card');
 products.forEach((product, index) => {

     const priceElement = product.querySelector('.unit-price');
     const unitPrice = parseFloat(priceElement.textContent.replace("$", ""));
     const name = `Product ${index + 1}`;
     const newProduct = new Product(index + 1, name, unitPrice);

     // Add event listeners for the product
     const quantityElement = product.querySelector('.quantity');
     let quantity = parseInt(quantityElement.textContent);

     const updateTotalPrice = () => {
         const totalPriceElement = document.querySelector('.total');
         totalPriceElement.textContent = shoppingCart.getTotalPrice().toFixed(2);
     };
  
//calculer le nombre des articles........................................................... 

     product.querySelector('.fa-plus-circle').addEventListener('click', () => {
         quantity++;
         quantityElement.textContent = quantity;
         shoppingCart.addItem(newProduct, quantity);
         updateTotalPrice();
     });

          
  
 //minimiser le nombre des articles.........................................................
     product.querySelector('.fa-minus-circle').addEventListener('click', () => {
         if (quantity > 0) {
             quantity--;
             quantityElement.textContent = quantity;
             shoppingCart.addItem(newProduct, quantity);
             updateTotalPrice();
         }
     });

       


//supprimer un article........................................................
     product.querySelector('.fa-trash-alt').addEventListener('click', () => {
         shoppingCart.removeItem(newProduct.id);
         product.remove();
         updateTotalPrice();
     });

 //liker........................................................
     product.querySelector('.fa-heart').addEventListener('click', (event) => {
         event.target.style.color = 'red';
     });

     
 });
    


 // Add a test button to display cart items in the console
 const displayButton = document.createElement('button');
 displayButton.textContent = 'Display Cart';
 displayButton.addEventListener('click', () => {
     shoppingCart.displayItems();
 });
 document.body.appendChild(displayButton);
});



