
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('menuStudyForm');
    const menuItemSelect = document.getElementById('menuItem');
    const modal = document.getElementById('feedbackModal');
    const modalHeading = document.getElementById('modalHeading');
    const modalText = document.getElementById('modalText');
    const closeButton = document.querySelector('.close-button');

    // Define correct answers for each dish
    const menuItems = {
    spicyChicken: {
        noodles: ["thin noodles"],
        broth: ["chicken broth"],
        protein: ["chicken chashu"],
        veggies: ["spicy bean sprouts", "spinach"],
        garnish: ["green onions"],
        oils: [],
        levels: []
    },
    jinyaChicken: {
        noodles: ["thin noodles"],
        broth: ["chicken broth"],
        protein: ["chicken chashu"],
        veggies: ["spinach"],
        garnish: ["green onions", "fried onions"],
        oils: [],
        levels: []
    },
    wontonChicken: {
        noodles: ["thin noodles"],
        broth: ["chicken broth"],
        protein: ["chicken wonton"],
        veggies: ["spinach"],
        garnish: ["green onions"],
        oils: [],
        levels: []
    },
    tonkotsuBlack: {
        noodles: ["thin noodles"],
        broth: ["pork broth"],
        protein: ["pork chashu", "egg"],
        veggies: ["kikurage", "nori"],
        garnish: ["green onions", "fried onions", "garlic chip"],
        oils: ["black garlic oil"],
        levels: []
    },
    tonkotsuRed: {
        noodles: ["thick noodles"],
        broth: ["pork broth"],
        protein: ["pork chashu", "egg"],
        veggies: ["kikurage", "nori", "spicy bean sprouts"],
        garnish: ["green onions"],
        oils: ["red hot chili oil"],
        levels: [] // Assuming level "3" means it starts getting hot from here
    },
    tonkotsuOriginal: {
        noodles: ["extra thick noodles"],
        broth: ["pork broth"],
        protein: ["pork chashu", "egg"],
        veggies: ["spinach", "nori"],
        garnish: ["green onions", "black pepper"],
        oils: [],
        levels: []
    },
    spicyUmamiMiso: {
        noodles: ["thick noodles"],
        broth: ["pork broth"],
        protein: ["pork soboro"],
        veggies: ["bean sprouts", "bok choy"],
        garnish: ["green onions"],
        oils: ["chili oil", "sancho oil"],
        levels: []
    },
    yuzuShioDelight: {
        noodles: ["thin noodles"],
        broth: ["chicken broth", "pork broth"],
        protein: ["pork chashu", "egg"],
        veggies: ["spinach", "nori"],
        garnish: ["green onions"],
        oils: [],
        levels: []
    },
    shrimpWonton: {
        noodles: ["thick noodles"],
        broth: ["pork broth", "shrimp broth"],
        protein: ["shrimp and chicken wonton"],
        veggies: ["kikurage"],
        garnish: ["green onions"],
        oils: ["shrimp oil"],
        levels: []
    },
    spicyCreamyVegan: {
        noodles: ["thick noodles"],
        broth: ["vegan veggie broth"],
        protein: ["tofu"],
        veggies: ["spinach"],
        garnish: ["green onions", "sesame seed", "fried onions", "garlic chip"],
        oils: ["chili oil", "black garlic oil"],
        levels: []
    },
    flyingVeganHarvest: {
        noodles: ["thick noodles"],
        broth: ["vegan miso broth"],
        protein: ["impossible meat", "tofu"],
        veggies: ["broccolini", "corn", "bean sprouts"],
        garnish: ["green onions", "red onions", "garlic chip", "chili seasoning"],
        oils: ["chili oil", "sancho oil"],
        levels: []
    },
    veganRedFireOpal: {
        noodles: ["thick noodles"],
        broth: ["yuzu hot and sour soup"],
        protein: ["tofu"],
        veggies: ["bamboo", "shitake", "cilantro"],
        garnish: ["chili thread", "lime"],
        oils: ["chili oil"],
        levels: []
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

        // Validate noodles (or any other single selection dropdowns)
        const noodlesSelection = form.querySelector('#noodles').value;
        if (!dish.noodles.includes(noodlesSelection)) {
            isValid = false;
            messages.push("Noodles selection is incorrect.");
        }

        // Validate checkboxes (broth, protein, veggies, garnish, oils)
        ["broth", "protein", "veggies", "garnish", "oils"].forEach(category => {
            const selectedValues = getSelectedCheckboxValues(category);
            const correctValues = dish[category];
            const isCategoryValid = selectedValues.length === correctValues.length && selectedValues.every(value => correctValues.includes(value));
            if (!isCategoryValid) {
                isValid = false;
                messages.push(`${category[0].toUpperCase() + category.slice(1)} selection is incorrect.`);
            }
        });

        // Display feedback in modal
        if (isValid) {
            modalHeading.textContent = "Congratulations!";
            modalText.textContent = "Correct! Well done.";
            JsyText.textContent = "Lets go ducky :D you got it my love ❤";
            
        } else {
            modalHeading.textContent = "Incorrect Submission";
            modalText.textContent = "Please review your selections: " + messages.join(" ");
            JsyText.textContent = "Its okay you'll learn it. I still love you c:❤";
        }
        modal.style.display = "block";
    });

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

        // Hide the modal if visible
        modal.style.display = 'none';
    });
});
