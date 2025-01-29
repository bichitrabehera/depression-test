let map;
let markers = []; // Array to hold therapist markers

// Initialize the map
function initMap() {
    console.log("Initializing Map...");

    // Default location (you can leave it blank or change it based on your needs)
    const defaultLocation = { lat: 20.5937, lng: 78.9629 }; // Initial map center (global view)

    // Create the map centered at default location
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 2, // Starting zoom level to give a global view
    });

    console.log("Map Loaded Successfully!");
}

// Function to search therapists based on location input
function searchTherapists() {
    const locationInput = document.getElementById('place').value; // Get input from user

    if (!locationInput) {
        alert("Please enter a location!");
        return;
    }

    // Initialize geocoder to convert location name to coordinates
    const geocoder = new google.maps.Geocoder();

    // Geocode the location to get latitude and longitude
    geocoder.geocode({ address: locationInput }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            // If location is found, set the map center to the new location
            const location = results[0].geometry.location;
            map.setCenter(location);
            map.setZoom(13); // Zoom in on the location

            // Clear previous markers
            clearMarkers();

            // Now search for therapists near the new location
            findTherapists(location);
        } else {
            alert("Location not found. Please try again.");
        }
    });
}

// Function to search for therapists near the given location
function findTherapists(location) {
    console.log("Finding therapists...");

    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: location,
        radius: 5000, // Search within 30km radius
        type: ['doctor'], // Searching for doctors (therapists are often listed here)
        keyword: 'therapist', // Looking for therapists
    };

    // Perform the nearby search for therapists
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log("Therapists found:", results);

            // If therapists are found, display them as markers
            results.forEach(place => {
                addMarker(place.geometry.location, place.name, place.vicinity);
            });
        } else {
            console.error("Error fetching therapists:", status);
            alert("No therapists found in this area.");
        }
    });
}

// Function to add markers on the map for each therapist
function addMarker(location, name, vicinity) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: `${name} - ${vicinity}`,
    });

    // Optional: Add a click listener to show more details
    google.maps.event.addListener(marker, 'click', function() {
        // Redirect to a new page with therapist details when clicked
        const url = `https://www.google.com/maps/search/?q=${encodeURIComponent(name)}&q=${encodeURIComponent(vicinity)}`;
        window.open(url, '_blank');
    });

    // Add the marker to the array
    markers.push(marker);
}

// Function to clear previous markers from the map
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null)); // Remove each marker
    markers = []; // Reset the markers array
}
