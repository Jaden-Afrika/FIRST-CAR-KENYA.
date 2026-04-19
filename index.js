const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const carGrid = document.getElementById('carGrid');
const statusText = document.getElementById('status');

async function getCars(query) {
    statusText.innerText = `Searching for "${query}"...`;
    carGrid.innerHTML = ''; 

try {
    const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?where=model%20like%20"${query}"%20or%20make%20like%20"${query}"&limit=12`);
 const data = await response.json();
    const cars = data.results;

        if (!cars || cars.length === 0) {
 statusText.innerText = "No cars found. Try searching 'Toyota' or 'Mazda'.";
            return;
        }

        statusText.innerText = `Showing results for ${query}:`;

     cars.forEach(car => {
     const carCard = `
      <div class="card">
      <div class="img-placeholder">${car.make}</div>
      <div class="card-info">
      <h3>${car.make} ${car.model}</h3>
      <p>${car.year} | ${car.fueltype || 'Petrol'}</p>
    <p class="price">KSh ${(Math.floor(Math.random() * 15) * 100000 + 800000).toLocaleString()}</p>
        <button class="btn">View Details</button>
        </div>
     </div>
       `;
     carGrid.innerHTML += carCard;
     });

    } catch (error) {
    statusText.innerText = "Error loading data.";
    console.error(error);
    }
}

searchButton.addEventListener('click', () => {
 const query = searchInput.value.trim();
 if (query) getCars(query);
});

searchInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') searchButton.click();
});


const PEXELS_API_KEY = '1qJQnI2dauxr0VIrrCz39kktjSq7Am2ZVBUqTPloArYRDPiEScTmwhxb';


cars.forEach(async (car) => {
    try {
        
        const imageRes = await fetch(`https://api.pexels.com/v1/search?query=${car.make}+${car.model}+car&per_page=1`, {
            headers: { 'Authorization': '1qJQnI2dauxr0VIrrCz39kktjSq7Am2ZVBUqTPloArYRDPiEScTmwhxb' }
        });
        const imageData = await imageRes.json();
        

        const carImg = imageData.photos.length > 0 
            ? imageData.photos[0].src.medium 
            : 'https://placehold.co/600x400?text=No+Image+Available';

        const carCard = `
            <div class="card">
                <img src="${carImg}" alt="${car.model}" class="car-image">
                <div class="card-info">
                    <h3>${car.make} ${car.model}</h3>
                    <p>${car.year} | ${car.fueltype || 'Petrol'}</p>
                    <p class="price">KSh ${(Math.floor(Math.random() * 15) * 100000 + 800000).toLocaleString()}</p>
                    <button class="btn">View Details</button>
                </div>
            </div>
        `;
        carGrid.innerHTML += carCard;
    } catch (err) {
        console.error("Image failed to load", err);
    }
});