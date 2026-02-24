const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const totalCount = document.getElementById('totalCount');
const emptyState = document.getElementById('emptyState');
const filterButtons = document.querySelectorAll('.filter-btn');
const jobContainer = document.getElementById('jobContainer');

function getJobCards() {
    return document.querySelectorAll('.job-card');
}

function updateCounts() {

    let interview = 0;
    let rejected = 0;
    let total = 0;

    getJobCards().forEach(card => {

        total++;

        if (card.dataset.status === 'interview') interview++;
        if (card.dataset.status === 'rejected') rejected++;

    });

    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;
    totalCount.textContent = total;
}

function checkEmpty() {

    let visible = 0;

    getJobCards().forEach(card => {
        if (card.style.display !== 'none') visible++;
    });

    emptyState.classList.toggle('hidden', visible !== 0);
}

/* =========================
   EVENT DELEGATION
=========================*/

jobContainer.addEventListener('click', function (e) {

    const card = e.target.closest('.job-card');
    if (!card) return;

    const badge = card.querySelector('.status-badge');

    // INTERVIEW
    if (e.target.classList.contains('interview-btn')) {

        card.dataset.status = 'interview';
        badge.textContent = 'INTERVIEW';
        badge.className =
            "status-badge px-3 py-1 rounded bg-green-100 text-green-700 text-sm";

        updateCounts();
    }

    // REJECTED
    if (e.target.classList.contains('rejected-btn')) {

        card.dataset.status = 'rejected';
        badge.textContent = 'REJECTED';
        badge.className =
            "status-badge px-3 py-1 rounded bg-red-100 text-red-700 text-sm";

        updateCounts();
    }

    // DELETE
    if (e.target.classList.contains('delete-btn')) {

        card.remove();

        updateCounts();
        checkEmpty();
    }

});

/* =========================
   FILTER
=========================*/

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        const filterType = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200');
        });

        button.classList.remove('bg-gray-200');
        button.classList.add('bg-blue-600', 'text-white');

        getJobCards().forEach(card => {

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

updateCounts();