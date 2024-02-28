document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('menuStudyForm');
    const menuItemSelect = document.getElementById('menuItem');
    const modal = document.getElementById('feedbackModal');
    const modalHeading = document.getElementById('modalHeading');
    const modalText = document.getElementById('modalText');
    const JsyText = document.getElementById('JsyText'); // Make sure this ID exists in your HTML
    const closeButton = document.querySelector('.close-button');

    const menuItems = {
        seaweedSalad: {
            veggies: ["baby leaf", "seaweed salad"],
            dressing: []

        },
        houseSalad: {
            veggies: ["baby leaf", "kale", "baby arugula", "cherry tomato"],
            dressing: ["japanese dressing"]
        },
        quinoaSalad: {
            veggies: ["baby leaf", "kale", "corn", "broccoli", "quinoa and beans", "cherry tomato"],
            dressing: ["sesame dressing"]
        }
        // Add more dishes here as needed
    };

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function getSelectedCheckboxValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedDish = menuItemSelect.value;
        const dish = menuItems[selectedDish];
        let isValid = true;
        let messages = [];

        // Adjusted validation for veggies to ensure no extra veggies are selected
        const selectedVeggies = getSelectedCheckboxValues('veggies');
        if (dish.veggies) {
            const isVeggieValid = dish.veggies.length === selectedVeggies.length && dish.veggies.every(veggie => selectedVeggies.includes(veggie));
            if (!isVeggieValid) {
                isValid = false;
                messages.push("Veggie selection is incorrect.");
            }
        }

        // Adjusted validation for dressing to ensure no extra dressings are selected
        // This assumes dressings are checkboxes. If it's a single select dropdown, the logic would need to be different.
        const selectedDressing = getSelectedCheckboxValues('dressing');
        if (dish.dressing && dish.dressing.length > 0) {
            const isDressingValid = dish.dressing.length === selectedDressing.length && dish.dressing.every(dressing => selectedDressing.includes(dressing));
            if (!isDressingValid) {
                isValid = false;
                messages.push("Dressing selection is incorrect.");
            }
        } else if (dish.dressing.length === 0 && selectedDressing.length > 0) {
            // If no dressing is required but some are selected
            isValid = false;
            messages.push("Dressing selection is incorrect.");
        }
        // Display feedback in modal
        if (isValid) {
            modalHeading.textContent = "Congratulations!";
            modalText.textContent = "Correct! Well done.";
            JsyText.textContent = "";//could implemnt text here
        } else {
            modalHeading.textContent = "Incorrect Submission";
            modalText.textContent = "Please review your selections: " + messages.join(" ");
            JsyText.textContent = "";//could implemnt text here
        }
        modal.style.display = "block";
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Reset all dropdowns to their first option
        document.querySelectorAll('select').forEach((select) => {
            select.selectedIndex = 0;
        });

        // Hide the modal if visible
        modal.style.display = 'none';
    });
});
