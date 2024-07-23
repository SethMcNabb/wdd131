document.addEventListener('DOMContentLoaded', function() {
    function setGoal() {
        const goal = document.getElementById('goalInput').value;
        localStorage.setItem('financialGoal', goal);
        document.getElementById('currentGoal').textContent = `Current Goal: ${goal}`;
    }

    function loadGoal() {
        const goal = localStorage.getItem('financialGoal');
        if (goal) {
            document.getElementById('currentGoal').textContent = `Current Goal: ${goal}`;
        }
    }

    function handleExpenseForm() {
        document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault(); 

            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const description = document.getElementById('description').value;

            const expense = { date, category, amount, description };
            
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            alert('Expense added!');
            this.reset();
        });
    }

    function displayRecentTransactions() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const transactionsContainer = document.querySelector('.recent-transactions');
        
        if (expenses.length > 0) {
            transactionsContainer.innerHTML = '<h2>Recent Transactions</h2>';
            expenses.forEach(expense => {
                const transaction = document.createElement('div');
                transaction.innerHTML = `
                    <p><strong>Date:</strong> ${expense.date}</p>
                    <p><strong>Category:</strong> ${expense.category}</p>
                    <p><strong>Amount:</strong> $${expense.amount.toFixed(2)}</p>
                    <p><strong>Description:</strong> ${expense.description}</p>
                    <hr>
                `;
                transactionsContainer.appendChild(transaction);
            });
        } else {
            transactionsContainer.innerHTML = '<h2>Recent Transactions</h2><p>No transactions yet.</p>';
        }
    }

    function displayTotalAmount() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        const totalBalanceSection = document.querySelector('.total-spent');
        totalBalanceSection.innerHTML = `<h2>Total Spent: $${totalAmount.toFixed(2)}</h2>`;
    }

    function displaySpendingByCategory() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const categoryTotals = expenses.reduce((totals, expense) => {
            if (!totals[expense.category]) {
                totals[expense.category] = 0;
            }
            totals[expense.category] += expense.amount;
            return totals;
        }, {});

        const categoriesSection = document.querySelector('.spending-by-category');
        categoriesSection.innerHTML = '<h2>Spending By Category</h2>';
        
        Object.keys(categoryTotals).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<p><strong>${category}:</strong> $${categoryTotals[category].toFixed(2)}</p>`;
            categoriesSection.appendChild(categoryDiv);
        });
    }

    if (document.querySelector('.form-container')) {
        handleExpenseForm();
    }

    if (document.querySelector('.grid')) {
        loadGoal();
        displayRecentTransactions();
        displayTotalAmount();
        displaySpendingByCategory();
    }

    document.getElementById('clearStorage').addEventListener('click', function() {
        localStorage.clear();
        alert('Local storage cleared!');
        location.reload();
    });

    document.getElementById('setGoal').addEventListener('click', setGoal);
});
