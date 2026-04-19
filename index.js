const PEXELS_API_KEY = '1qJQnI2dauxr0VIrrCz39kktjSq7Am2ZVBUqTPloArYRDPiEScTmwhxb';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const carGrid = document.getElementById('carGrid');
const statusText = document.getElementById('status');
const detailsModal = document.getElementById('detailsModal');
const closeBtn = document.getElementById('closeBtn');

let carsData = []; 

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
        carsData = cars; 

    cars.forEach(async (car) => {
    let carImageUrl = "https://placehold.co/600x400?text=Car+Photo"; 

    try {
        const imgResponse = await fetch(`https://api.pexels.com/v1/search?query=${car.make}+${car.model}+car&per_page=1`, {
            headers: { 'Authorization': PEXELS_API_KEY }
        });
        const imgData = await imgResponse.json();
        if (imgData.photos && imgData.photos.length > 0) {
            carImageUrl = imgData.photos[0].src.medium;
        }
    } catch (error) {
        console.error("Image error:", error);
    }

    const carCard = `
        <div class="card">
            <img src="${carImageUrl}" alt="${car.make}" class="car-card-img">
            <div class="card-info">
                <h3>${car.make} ${car.model}</h3>
                <p>${car.year} | ${car.fueltype || 'Petrol'}</p>
                <p class="price">KSh ${(Math.floor(Math.random() * 10) * 100000 + 1500000).toLocaleString()}</p>
                <button class="btn">View Details</button>
            </div>
        </div>
    `;
    carGrid.innerHTML += carCard;
});


     document.querySelectorAll('.view-details-btn').forEach(btn => {
       btn.addEventListener('click', function() {
         const carIndex = this.closest('.card').getAttribute('data-car-index');
         showDetails(parseInt(carIndex));
       });
     });

    } catch (error) {
    statusText.innerText = "Error loading data.";
    console.error(error);
    }
}

function showDetails(index) {
  const car = carsData[index];
  if (!car) return;

  document.getElementById('detailsTitle').textContent = `${car.make} ${car.model}`;
  document.getElementById('detailsYear').textContent = car.year;
  document.getElementById('detailsMake').textContent = car.make;
  document.getElementById('detailsModel').textContent = car.model;
  document.getElementById('detailsPrice').textContent = `KSh ${(Math.floor(Math.random() * 15) * 100000 + 800000).toLocaleString()}`;
  document.getElementById('detailsFuel').textContent = car.fueltype || 'Petrol';
  document.getElementById('detailsCarImage').src = 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'; 
  document.getElementById('detailsCarImage').alt = `${car.make} ${car.model}`;

  detailsModal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
  detailsModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === detailsModal) {
    detailsModal.style.display = 'none';
  }
});

searchButton.addEventListener('click', () => {
 const query = searchInput.value.trim();
 if (query) getCars(query);
 });

searchInput.addEventListener('keypress', (e) => {
if (e.key === 'Enter') searchButton.click();
});



function displayCars() {
    const carGrid = document.getElementById('carGrid');
    carGrid.innerHTML = '';
    
    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="img-placeholder">Image</div>
            <div class="card-info">
                <h3>${car.year} ${car.make} ${car.model}</h3>
                <p class="price">${car.price}</p>
                <button class="btn" data-car-id="${car.id}">View Details</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const carId = this.getAttribute('data-car-id');
            showCarDetails(carId);
        });
    });
}

function showCarDetails(carId) {
    const car = cars.find(c => c.id === parseInt(carId));
    
    if (!car) return;
    
    document.getElementById('detailsTitle').textContent = `${car.year} ${car.make} ${car.model}`;
    document.getElementById('detailsYear').textContent = car.year;
    document.getElementById('detailsMake').textContent = car.make;
    document.getElementById('detailsModel').textContent = car.model;
    document.getElementById('detailsPrice').textContent = car.price;
    document.getElementById('detailsMileage').textContent = car.mileage;
    document.getElementById('detailsDescription').textContent = car.description;
    

    document.getElementById('inventory').style.display = 'none';
    document.getElementById('detailsPage').style.display = 'block';
}

 
function goBackToInventory() {
    document.getElementById('detailsPage').style.display = 'none';
    document.getElementById('inventory').style.display = 'block';
}

function askCarPreferences() {
    const carType = prompt('Welcome to First Car Kenya! What kind of car are you looking for today?');
    const maxBudget = prompt('How much are you willing to spend? Enter amount in KES (e.g. 2500000).');

    if (carType && carType.trim()) {
        searchInput.value = carType.trim();
        statusText.innerText = `Looking for ${carType.trim()}${maxBudget && maxBudget.trim() ? ` under KES ${maxBudget.trim()}` : ''}.`;
        getCars(carType.trim());
    } else if (maxBudget && maxBudget.trim()) {
        statusText.innerText = `Budget set to KES ${maxBudget.trim()}. Use the search box to choose a car type.`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    askCarPreferences();
    displayCars();

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', goBackToInventory);
    }
});

