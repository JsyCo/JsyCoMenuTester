document.addEventListener('DOMContentLoaded', function() {
    const menuStudyForm = document.getElementById('menuStudyForm');
    const resetButton = document.getElementById('resetButton');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeButton = document.querySelector('.close-button');

    // Prevent form submission to server and display feedback modal
    menuStudyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        // Code to handle form data goes here, e.g., display it in the modal or log it
        openModal('Thank you!', 'Your selections have been recorded.');
    });

    // Reset the form to its default state
    resetButton.addEventListener('click', function() {
        menuStudyForm.reset();
        // Additional code to reset custom UI elements if necessary
    });

    // Function to display feedback modal with custom title and message
    function openModal(title, message) {
        document.getElementById('modalHeading').textContent = title;
        document.getElementById('modalText').textContent = message;
        feedbackModal.style.display = 'block'; // Show the modal
    }

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', function() {
        feedbackModal.style.display = 'none'; // Hide the modal
    });

    // Optional: Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == feedbackModal) {
            feedbackModal.style.display = "none";
        }
    }
});
