const stripe = Stripe("YOUR_STRIPE_PUBLIC_KEY");

const products = [
  {
    id: "Menace-Cape",
    name: "Menace Cape",
    price: 9.99,
    image: "assets/MenaceCape.webp"
  },
  {
    id: "Purple-Heart-Cape",
    name: "Purple heart Cape",
    price: 14.99,
    image: "assets/twitchCape.avif"
  },
  {
    id: "Home-Cape",
    name: "Home Cape",
    price: 9.99,
    image: "assets/Minecraft-Movie-Cape.png"
  },
];

const container = document.getElementById("products");

products.forEach(product => {
  const el = document.createElement("div");
  el.className = "product";
  el.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button onclick="buy('${product.id}', ${product.price})">Buy Now</button>
  `;
  container.appendChild(el);
});

function buy(productId, price) {
  fetch("http://localhost:4242/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, price })
  })
  .then(res => res.json())
  .then(data => {
    stripe.redirectToCheckout({ sessionId: data.id });
  });
}

