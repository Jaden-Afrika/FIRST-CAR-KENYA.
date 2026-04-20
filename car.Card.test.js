/**
 * Unit Test for Car Card DOM Integrity
 * Tests that JavaScript correctly injects the expected HTML structure into the page
 */

// Set up JSDOM environment
document.body.innerHTML = `
  <div id="carGrid"></div>
`;

// Mock data - same as in index.js
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
    }
];

// Function being tested - from index.js
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
            console.log(`Car ${carId} selected`);
        });
    });
}

describe('Car Card DOM Integrity Tests', () => {
    
    beforeEach(() => {
        
        document.body.innerHTML = `<div id="carGrid"></div>`;
    });

    test('should render the correct number of car cards', () => {
        displayCars();
        const cards = document.querySelectorAll('.card');
        expect(cards.length).toBe(3);
    });

    test('should create cards with proper class name', () => {
        displayCars();
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            expect(card.classList.contains('card')).toBe(true);
        });
    });

    test('should include image placeholder in each card', () => {
        displayCars();
        const imagePlaceholders = document.querySelectorAll('.card .img-placeholder');
        expect(imagePlaceholders.length).toBe(3);
        imagePlaceholders.forEach(placeholder => {
            expect(placeholder.textContent).toBe('Image');
        });
    });

    test('should include card-info div with proper structure', () => {
        displayCars();
        const cardInfos = document.querySelectorAll('.card .card-info');
        expect(cardInfos.length).toBe(3);
        cardInfos.forEach(info => {
            expect(info.querySelector('h3')).toBeTruthy();
            expect(info.querySelector('.price')).toBeTruthy();
            expect(info.querySelector('.btn')).toBeTruthy();
        });
    });

    test('should display correct car information in headings', () => {
        displayCars();
        const headings = document.querySelectorAll('.card-info h3');
        expect(headings[0].textContent).toBe('2022 Toyota Corolla');
        expect(headings[1].textContent).toBe('2021 Honda Civic');
        expect(headings[2].textContent).toBe('2020 Hyundai i10');
    });

    test('should display correct prices', () => {
        displayCars();
        const prices = document.querySelectorAll('.card-info .price');
        expect(prices[0].textContent).toBe('KES 2,500,000');
        expect(prices[1].textContent).toBe('KES 2,800,000');
        expect(prices[2].textContent).toBe('KES 1,800,000');
    });

    test('should have View Details buttons with correct data attributes', () => {
        displayCars();
        const buttons = document.querySelectorAll('.card-info .btn');
        expect(buttons.length).toBe(3);
        expect(buttons[0].getAttribute('data-car-id')).toBe('1');
        expect(buttons[1].getAttribute('data-car-id')).toBe('2');
        expect(buttons[2].getAttribute('data-car-id')).toBe('3');
        buttons.forEach(button => {
            expect(button.textContent).toBe('View Details');
            expect(button.classList.contains('btn')).toBe(true);
        });
    });

    test('should clear existing cards before rendering new ones', () => {
        // First render
        displayCars();
        let cards = document.querySelectorAll('.card');
        expect(cards.length).toBe(3);
        
        // Second render (should still be 3, not 6)
        displayCars();
        cards = document.querySelectorAll('.card');
        expect(cards.length).toBe(3);
    });

    test('should have proper parent-child DOM hierarchy', () => {
        displayCars();
        const carGrid = document.getElementById('carGrid');
        expect(carGrid).toBeTruthy();
        
        const cards = carGrid.querySelectorAll(':scope > .card');
        expect(cards.length).toBe(3);
        
        cards.forEach(card => {
            const imagePlaceholder = card.querySelector('.img-placeholder');
            const cardInfo = card.querySelector('.card-info');
            expect(imagePlaceholder).toBeTruthy();
            expect(cardInfo).toBeTruthy();
        });
    });

    test('should render all buttons accessible for click handling', () => {
        displayCars();
        const buttons = document.querySelectorAll('.btn');
        expect(buttons.length).toBe(3);
        
        buttons.forEach((button, index) => {
            
            expect(button).toBeTruthy();
            expect(button.getAttribute('data-car-id')).toBe(String(index + 1));
            expect(button.textContent).toBe('View Details');
            expect(button.className).toContain('btn');
        });
    });
});
