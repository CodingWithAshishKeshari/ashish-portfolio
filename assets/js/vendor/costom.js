function switchPage() {
    document.body.classList.toggle('white-version');
    const toggleText = document.getElementById('toggleText');

    // Check if the white-version class is present
    if (document.body.classList.contains('white-version')) {
        toggleText.innerHTML = '<img src="assets/images/dark.png" alt="" style="max-width: 20px; max-height: 20px;">&nbsp;&nbsp; Dark';
        mobtoggleText.innerHTML = '<img src="assets/images/dark.png" alt="" style="max-width: 20px; max-height: 20px;">&nbsp;&nbsp';
    } else {
        toggleText.innerHTML = '<img src="assets/images/light.png" alt="" style="max-width: 20px; max-height: 20px;">&nbsp;&nbsp; Light';
        mobtoggleText.innerHTML = '<img src="assets/images/light.png" alt="" style="max-width: 20px; max-height: 20px;">&nbsp;&nbsp;';
    }
    toggleBrandImages();

}


function autoClickButton() {
    const button = document.querySelector('.next-arrow');
    if (button) {
        button.click();  // Simulate button click
    }
}

// Call the function every 5 seconds (5000 milliseconds)
setInterval(autoClickButton, 5000);



let isClientImages = false; // State variable to track which images are currently shown

function toggleBrandImages() {
    // Define a mapping of old image names to new image names
    const imageMapping = {
        'brand-01.png': 'client1.png',
        'brand-02.png': 'client2.png',
        'brand-03.png': 'client3.png',
        'brand-04.png': 'client4.png',
        'brand-05.png': 'client5.png'
    };

    // Select all the image elements in the brand sections
    const images = document.querySelectorAll('.main-content img');

    // Loop through each image and toggle the src attribute
    images.forEach(img => {
        const src = img.getAttribute('src'); // Get the current source
        const imageName = src.split('/').pop(); // Get the image file name

        // Determine the new source based on the current state
        if (isClientImages) {
            // If currently showing client images, revert to original
            const originalImage = Object.keys(imageMapping).find(key => imageMapping[key] === imageName);
            if (originalImage) {
                img.setAttribute('src', `assets/images/client/png/${originalImage}`);
            }
        } else {
            // If currently showing original images, change to client images
            if (imageMapping[imageName]) {
                img.setAttribute('src', `assets/images/client/png/${imageMapping[imageName]}`);
            }
        }
    });

    // Toggle the state
    isClientImages = !isClientImages;
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.onload = function () {
        var popup = document.getElementById('form-message');
        if (xhr.status === 200) {
            popup.className = 'popup success your-custom-success-class';
            popup.innerHTML = '<span>Message send successfully!</span>';
            document.getElementById('subject').value = ''; // Clear subject field
            document.getElementById('contact-message').value = ''; // Clear message field
        } else {
            popup.className = 'popup error your-custom-error-class';
            popup.innerHTML = '<span>Error: Failed to submit the form. Please try again later.</span>';
        }
        popup.style.display = 'block';
        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    };
    xhr.onerror = function () {
        popup.className = 'popup error your-custom-error-class';
        popup.innerHTML = '<span>Error: Network error occurred. Please check your connection and try again.</span>';
        popup.style.display = 'block';
        setTimeout(function () {
            popup.style.display = 'none';
        }, 3000);
    };
    xhr.send(data);
});