const detailsModal = document.getElementById('detailsModal');
const closeBtn = document.getElementById('closeBtn');

const carsData = [
    {
        make: 'Toyota',
        model: 'Corolla',
        year: 2018,
        price: 'KES 1,850,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'images/corolla.jpg'
    },
    {
        make: 'Honda',
        model: 'Civic',
        year: 2017,
        price: 'KES 1,950,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg'
    },
    {
        make: 'Nissan',
        model: 'X-Trail',
        year: 2019,
        price: 'KES 3,450,000',
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'
    },
    {
        make: 'Mazda',
        model: 'CX-5',
        year: 2020,
        price: 'KES 4,150,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg'
    },
    {
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2016,
        price: 'KES 6,200,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'
    },
    {
        make: 'Ford',
        model: 'Ranger',
        year: 2018,
        price: 'KES 3,950,000',
        transmission: 'Manual',
        fuel: 'Diesel',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'
    }
];

function displayCars() {
    const carGrid = document.getElementById('carGrid');
    carGrid.innerHTML = '';

    carsData.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}" class="car-inventory-img">
            
            <div class="card-info">
                <h3>${car.year} ${car.make} ${car.model}</h3>
                <p>${car.transmission} | ${car.fuel}</p>
                <p class="price">${car.price}</p>
                <button class="btn view-details-btn" data-index="${index}">View Details</button>
            </div>
        `;
        carGrid.appendChild(card);
    });

    // Add event listeners to View Details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            showDetails(parseInt(index));
        });
    });
}

function showDetails(index) {
    const car = carsData[index];
    if (!car) return;

    document.getElementById('detailsTitle').textContent = `${car.year} ${car.make} ${car.model}`;
    document.getElementById('detailsYear').textContent = car.year;
    document.getElementById('detailsMake').textContent = car.make;
    document.getElementById('detailsModel').textContent = car.model;
    document.getElementById('detailsPrice').textContent = car.price;
    document.getElementById('detailsTransmission').textContent = car.transmission;
    document.getElementById('detailsFuel').textContent = car.fuel;
    document.getElementById('detailsCarImage').src = car.image;
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

document.addEventListener('DOMContentLoaded', () => {
    displayCars(); // This runs the function immediately on load
});
