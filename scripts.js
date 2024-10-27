// Toggle navigation for mobile
function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display == 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
}

// Optional: Close the dropdown if clicked outside of it
document.addEventListener('click', function(event) {
    var dropdownMenu = document.getElementById('dropdownMenu');
    var isClickInside = dropdownMenu.contains(event.target) || event.target.closest('a[onclick="toggleDropdown()"]');
    if (!isClickInside) {
        dropdownMenu.style.display = 'none';
    }
});
