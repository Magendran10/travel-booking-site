const bookingForm = document.querySelector("#busBookingForm");

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = "someUserId";  // Replace with actual userId
    const bookingDetails = {
        origin: document.querySelector("#origin").value,
        destination: document.querySelector("#destination").value,
        date: document.querySelector("#date").value,
    };

    const response = await fetch('http://localhost:5000/api/bookings/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            type: "bus",
            details: bookingDetails
        })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Booking Successful!");
    } else {
        alert("Booking Failed: " + result.message);
    }
});
