const carsData = [
    {
        make: 'Toyota',
        model: 'Corolla',
        year: 2018,
        price: 'KES 1,850,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: ''
    },
    {
        make: 'Alfa',
        model: 'Romeo',
        year: 2017,
        price: 'KES 1,950,000',
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg'
    },
    {
        make: 'Mercedes',
        model: 'AMG GT',
        year: 2019,
        price: 'KES 3,450,000',
        transmission: 'Automatic',
        fuel: 'Diesel',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg'
    },
    {
        make: 'AUDI',
        model: 'A5',
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
        make: 'Mercedes ',
        model: 'AMG GT',
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
                <a href="car-${index}.html" class="btn">View Details</a>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayCars(); 
});
