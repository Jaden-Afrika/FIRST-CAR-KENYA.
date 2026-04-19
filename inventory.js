const detailsModal = document.getElementById('detailsModal');
const closeBtn = document.getElementById('closeBtn');

// Car data for inventory page
const carsData = [
    {
        make: 'Toyota',
        model: 'Corolla',
        year: 2018,
        price: 'KES 1,850,000',
        transmission: 'Automatic',
        fuel: 'Petrol'
    },
    {
        make: 'Honda',
        model: 'Civic',
        year: 2017,
        price: 'KES 1,950,000',
        transmission: 'Automatic',
        fuel: 'Petrol'
    },
    {
        make: 'Nissan',
        model: 'X-Trail',
        year: 2019,
        price: 'KES 3,450,000',
        transmission: 'Automatic',
        fuel: 'Diesel'
    },
    {
        make: 'Mazda',
        model: 'CX-5',
        year: 2020,
        price: 'KES 4,150,000',
        transmission: 'Automatic',
        fuel: 'Petrol'
    },
    {
        make: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2016,
        price: 'KES 6,200,000',
        transmission: 'Automatic',
        fuel: 'Petrol'
    },
    {
        make: 'Ford',
        model: 'Ranger',
        year: 2018,
        price: 'KES 3,950,000',
        transmission: 'Manual',
        fuel: 'Diesel'
    }
];

// Add event listeners to all View Details buttons
document.querySelectorAll('.view-details-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        showDetails(index);
    });
});

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
