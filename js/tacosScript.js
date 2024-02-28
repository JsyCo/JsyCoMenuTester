document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('menuStudyForm');
    const menuItemSelect = document.getElementById('menuItem');
    const modal = document.getElementById('feedbackModal');
    const modalHeading = document.getElementById('modalHeading');
    const modalText = document.getElementById('modalText');
    const closeButton = document.querySelector('.close-button');

    const menuItems = {
        salmonTaco: {
            protein: ["Salmon"],
            shellType: ["Wonton"],
            veggies: ["Onion", "Tomato", "Cilantro", "Lime"],
            sauces: ["Poke Sauce"]
        },
        spicyTunaTaco: {
            protein: ["Spicy Tuna", "Masago"],
            shellType: ["Wonton"],
            veggies: ["Cilantro", "Lime"],
            sauces: []
        },
        impossibleTaco: {
            protein: ["Imp Meat"],
            shellType: ["Wonton"],
            veggies: ["Cilantro", "Guac", "Lime"],
            sauces: ["Bun Sauce"]
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

        // Adjusted validation for proteins to ensure no extra proteins are selected
        const selectedProteins = getSelectedCheckboxValues('proteins');
        const requiredProteins = dish.protein || [];
        const isProteinValid = requiredProteins.length === selectedProteins.length && requiredProteins.every(protein => selectedProteins.includes(protein));
        if (!isProteinValid) {
            isValid = false;
            messages.push("Protein selection does not match.");
        }

        // Continue with other categories validation
        ['shellType', 'veggies', 'sauces'].forEach(category => {
            const selectedItems = getSelectedCheckboxValues(category);
            const dishItems = dish[category] || [];
            const isCategoryValid = dishItems.every(item => selectedItems.includes(item)) && selectedItems.every(item => dishItems.includes(item));
            if (!isCategoryValid) {
                isValid = false;
                messages.push(`${category.charAt(0).toUpperCase() + category.slice(1)} selection does not match.`);
            }
        });

        // Display feedback in modal
        if (isValid) {
            modalHeading.textContent = "Congratulations!";
            modalText.textContent = "Correct! Well done.";
            JsyText.textContent = "";//could implemnt text here
        } else {
            modalHeading.textContent = "Incorrect Submission";
            modalText.textContent = "Please review your selections: " + messages.join(", ");
            JsyText.textContent = "";//could implemnt text here
        }
        modal.style.display = "block";
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('select').forEach(select => {
            select.selectedIndex = 0;
        });
        modal.style.display = 'none';
    });
});
