const jobCards = document.querySelectorAll('.job-card');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');


function updateCounts() {

    let interview = 0;
    let rejected = 0;

    jobCards.forEach(card => {
        if (card.dataset.status === 'interview') interview++;
        if (card.dataset.status === 'rejected') rejected++;
    });

    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;
}


function checkEmpty() {

    let visible = 0;

    jobCards.forEach(card => {
        if (card.style.display !== 'none') visible++;
    });

    emptyState.classList.toggle('hidden', visible !== 0);
}


jobCards.forEach(card => {

    const interviewBtn = card.querySelector('.interview-btn');
    const rejectedBtn = card.querySelector('.rejected-btn');
    const badge = card.querySelector('.status-badge');

    interviewBtn.addEventListener('click', () => {

        card.dataset.status = 'interview';
        badge.textContent = 'INTERVIEW';
        badge.className = "status-badge px-3 py-1 rounded bg-green-100 text-green-700 text-sm";

        updateCounts();
    });

    rejectedBtn.addEventListener('click', () => {

        card.dataset.status = 'rejected';
        badge.textContent = 'REJECTED';
        badge.className = "status-badge px-3 py-1 rounded bg-red-100 text-red-700 text-sm";

        updateCounts();
    });

});


filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        const filterType = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200');
        });

        button.classList.remove('bg-gray-200');
        button.classList.add('bg-blue-600', 'text-white');

        jobCards.forEach(card => {

            if (filterType === 'all') {
                card.style.display = 'block';
            }
            else if (card.dataset.status === filterType) {
                card.style.display = 'block';
            }
            else {
                card.style.display = 'none';
            }

        });

        checkEmpty();
    });

});