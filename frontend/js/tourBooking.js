// Function to fetch available tours based on location and date range
async function searchTours() {
    const location = document.getElementById('location').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const guests = parseInt(document.getElementById('guests').value);

    try {
        const response = await fetch(`/api/tours/search?location=${location}&startDate=${startDate}&endDate=${endDate}&guests=${guests}`);
        const tours = await response.json();
        displayTours(tours);
    } catch (error) {
        console.error('Error fetching tours:', error);
    }
}

// Function to display fetched tours in the tour cards section
function displayTours(tours) {
    const tourCardsContainer = document.getElementById('tour-cards');
    tourCardsContainer.innerHTML = ''; // Clear previous results

    if (tours.length === 0) {
        tourCardsContainer.innerHTML = '<p>No tours found for the selected criteria.</p>';
        return;
    }

    tours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <img src="images/tour1.jpg" alt="${tour.name}">
            <div class="tour-details">
                <h4>${tour.name}</h4>
                <p>${tour.startDate} - ${tour.endDate}</p>
                <p>Location: ${tour.location}</p>
                <p>Price: $${tour.price}</p>
                <p>Description: ${tour.description}</p>
                <button onclick="bookTour('${tour.name}', ${tour.price})">Book Now</button>
            </div>
        `;
        tourCardsContainer.appendChild(tourCard);
    });
}

// Booking modal functions
function bookTour(tourName, price) {
    document.getElementById('modal-text').innerText = `You are booking the "${tourName}" tour for $${price}.`;
    document.getElementById('booking-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

function confirmBooking() {
    alert('Your booking is confirmed!');
    closeModal();
}

document.addEventListener('DOMContentLoaded', async () => {
    const locationDropdown = document.getElementById('location');

    try {
        // Fetch available locations from the server
        const response = await fetch('/api/tours/locations');
        const locations = await response.json();

        // Populate the dropdown with locations
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
});

