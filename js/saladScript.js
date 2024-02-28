document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('menuStudyForm');
    const menuItemSelect = document.getElementById('menuItem');
    const modal = document.getElementById('feedbackModal');
    const modalHeading = document.getElementById('modalHeading');
    const modalText = document.getElementById('modalText');
    const JsyText = document.getElementById('JsyText'); // Ensure you have this ID in your HTML for this to work
    const closeButton = document.querySelector('.close-button');

    const menuItems = {
        seaweedSalad: {
            veggies: ["baby leaf", "seaweed salad"]
        },
        houseSalad: {
            veggies: ["baby leaf", "kale", "baby arugula", "cherry tomato"],
            dressing: ["japanese dressing"]
        },
        quinoaSalad: {
            veggies: ["baby leaf", "kale", "corn", "broccoli", "quinoa and beans", "cherry tomato"],
            dressing: ["sesame dressing"]
        }
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

        // Since the original menu items don't include noodles, broth, etc., we'll skip those validations
        // Validate veggies (since this is common across all dishes)
        const selectedVeggies = getSelectedCheckboxValues('veggies');
        if (dish.veggies && !selectedVeggies.every(value => dish.veggies.includes(value))) {
            isValid = false;
            messages.push("Veggies selection is incorrect.");
        }

        // Optionally validate dressing if applicable
        if (dish.dressing && dish.dressing.length > 0) {
            const selectedDressing = getSelectedCheckboxValues('dressing');
            if (!selectedDressing.every(value => dish.dressing.includes(value))) {
                isValid = false;
                messages.push("Dressing selection is incorrect.");
            }
        }

        // Display feedback in modal
        if (isValid) {
            modalHeading.textContent = "Congratulations!";
            modalText.textContent = "Correct! Well done.";
            JsyText.textContent = "Let's go ducky, you got it! ❤";
        } else {
            modalHeading.textContent = "Incorrect Submission";
            modalText.textContent = "Please review your selections: " + messages.join(" ");
            JsyText.textContent = "It's okay ducky, you'll get it next time. ❤";
        }
		    // Reset button logic
		document.getElementById('resetButton').addEventListener('click', function() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Reset all dropdowns to their first option
        document.querySelectorAll('select').forEach((select) => {
            select.selectedIndex = 0;
        });
        modal.style.display = "block";
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        // Reset logic as provided remains the same
    });
});
