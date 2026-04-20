// Function to build the car card HTML
export const createCarCard = (car) => {
    return `
        <div class="card">
            <img src="${car.image}" alt="${car.make}" class="car-card-img">
            <div class="card-info">
                <h3>${car.make} ${car.model}</h3>
                <p class="price">KSh ${car.price}</p>
            </div>
        </div>
    `;
};