document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bowlMenuForm'); // Ensure this ID matches your form
    const menuItemSelect = document.getElementById('bowlType'); // Ensure this ID matches your select element
    const modal = document.getElementById('feedbackModal');
    const modalHeading = document.getElementById('modalHeading');
    const modalText = document.getElementById('modalText');
    const closeButton = document.querySelector('.close-button');

    // Updated menu items to match your bowls
    const menuItems = {
        porkChashuBowl: {
            carbs: ["White Rice"],
            protein: ["Egg", "Pork Chashu"],
            sauce: ["Pork Chashu Sauce"],
            veggi: ["Kikurage", "Shiitake Mushroom"],
            garnish: ["Green Onion", "Sesame seed"]
        },
        chickenChashuBowl: {
            carbs: ["White Rice"],
            protein: ["Chicken Chashu", "Chicken Soboro", "Egg"],
            sauce: ["Buns Sauce"],
            veggi: ["Kikurage", "Shiitake Mushroom"],
            garnish: ["Green Onion", "Sesame seed"]
        },
        impossibleBowl: {
            carbs: ["White Rice"],
            protein: ["Imp Meat", "Fried Garbanzo Bean"],
            sauce: ["Lemon Vinaigrette", "Curry Ranch"],
            veggi: ["Pickled Red Cabbage", "Kale"],
            garnish: ["Pine Nuts", "Crispy garlic"]
        },
        curryBowl: {
            carbs: ["White Rice"],
            protein: ["Ground Chicken"],
            sauce: ["Curry"],
            veggi: ["Baby Leaf"],
            garnish: [] // No garnish specified
        },
        caPokeBowl: {
            carbs: ["White Rice"],
            protein: ["Salmon", "Spicy Tuna", "Shrimp", "Masago"],
            sauce: ["Poke Sauce"],
            veggi: ["Baby leaf", "Seaweed salad", "Avo", "Cucumber", "Cilantro", "Nori"],
            garnish: ["Ginger", "Wasabi"]
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
        const selectedBowl = menuItemSelect.value;
        const bowl = menuItems[selectedBowl];
        let isValid = true;
        let messages = [];

        // Iterate over each category in the selected bowl to validate selections
        ['carbs', 'protein', 'sauce', 'veggi', 'garnish'].forEach(category => {
            const selectedItems = getSelectedCheckboxValues(category);
            const correctItems = bowl[category];
            const isCategoryValid = selectedItems.length === correctItems.length && selectedItems.every(item => correctItems.includes(item));
            if (!isCategoryValid) {
                isValid = false;
                messages.push(`${category.charAt(0).toUpperCase() + category.slice(1)} selection is incorrect.`);
            }
        });

        // Display feedback in modal
        if (isValid) {
            modalHeading.textContent = "Congratulations!";
            modalText.textContent = "Correct! Well done.";
        } else {
            modalHeading.textContent = "Incorrect Submission";
            modalText.textContent = "Please review your selections: " + messages.join(" ");
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
