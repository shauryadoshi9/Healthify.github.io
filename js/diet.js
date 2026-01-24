const DIET_DATA = {
    gain: [
        { meal: "Breakfast", item: "Oatmeal with nuts, banana, and whole milk", cal: "500 kcal" },
        { meal: "Snack", item: "Greek yogurt with honey", cal: "200 kcal" },
        { meal: "Lunch", item: "Grilled chicken breast with brown rice & avocado", cal: "700 kcal" },
        { meal: "Snack", item: "Peanut butter sandwich", cal: "300 kcal" },
        { meal: "Dinner", item: "Salmon with quinoa and roasted vegetables", cal: "600 kcal" }
    ],
    loss: [
        { meal: "Breakfast", item: "Boiled eggs (2) + Green Tea", cal: "250 kcal" },
        { meal: "Snack", item: "Apple or Carrot stick", cal: "50 kcal" },
        { meal: "Lunch", item: "Mixed Green Salad with grilled tofu", cal: "350 kcal" },
        { meal: "Snack", item: "Handful of almonds", cal: "100 kcal" },
        { meal: "Dinner", item: "Vegetable Soup + 1 slice whole grain bread", cal: "300 kcal" }
    ],
    maintain: [
        { meal: "Breakfast", item: "Whole grain toast + Scrambled eggs", cal: "400 kcal" },
        { meal: "Snack", item: "Fruit Smoothie", cal: "200 kcal" },
        { meal: "Lunch", item: "Turkey Wrap with plenty of veggies", cal: "500 kcal" },
        { meal: "Snack", item: "Dark Chocolate + Nuts", cal: "150 kcal" },
        { meal: "Dinner", item: "Baked Fish with sweet potato", cal: "450 kcal" }
    ]
};

function generateDiet() {
    const goal = document.getElementById('diet-goal').value;
    const plan = DIET_DATA[goal];

    const tbody = document.getElementById('diet-table-body');
    tbody.innerHTML = "";

    plan.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding: 1rem; border-bottom: 1px solid #eee;"><strong>${row.meal}</strong></td>
            <td style="padding: 1rem; border-bottom: 1px solid #eee;">${row.item}</td>
            <td style="padding: 1rem; border-bottom: 1px solid #eee; color: var(--text-muted);">${row.cal}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('diet-result').style.display = 'block';
}
