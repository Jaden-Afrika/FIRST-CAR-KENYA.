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
  document.getElementById('detailsCarImage').src = 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'; // Default car image
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

const cars = [
    {
        id: 1,
        year: 2022,
        make: "Toyota",
        model: "Corolla",
        price: "KES 2,500,000",
        mileage: "45,000 km",
        description: "Well-maintained sedan with excellent fuel efficiency. Single owner, full service history."
    },
    {
        id: 2,
        year: 2021,
        make: "Honda",
        model: "Civic",
        price: "KES 2,800,000",
        mileage: "52,000 km",
        description: "Sporty sedan in excellent condition. Leather interior, sunroof, and advanced safety features."
    },
    {
        id: 3,
        year: 2020,
        make: "Hyundai",
        model: "i10",
        price: "KES 1,800,000",
        mileage: "65,000 km",
        description: "Compact and economical car perfect for city driving. Recently serviced with new tires."
    },
    {
        id: 4,
        year: 2023,
        make: "Nissan",
        model: "Pathfinder",
        price: "KES 4,200,000",
        mileage: "32,000 km",
        description: "Spacious SUV with powerful engine. Perfect for families. All-wheel drive and modern tech."
    },
    {
        id: 5,
        year: 2019,
        make: "Mazda",
        model: "CX-5",
        price: "KES 3,500,000",
        mileage: "78,000 km",
        description: "Reliable crossover with responsive handling. Backup camera and Bluetooth connectivity."
    },
    {
        id: 6,
        year: 2022,
        make: "Volkswagen",
        model: "Polo",
        price: "KES 2,200,000",
        mileage: "38,000 km",
        description: "Efficient hatchback with German engineering. Great on fuel, perfect for daily commuting."
    }
];

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


document.addEventListener('DOMContentLoaded', function() {
    displayCars();

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', goBackToInventory);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    
    getCars('Mercedes'); 
});



                  