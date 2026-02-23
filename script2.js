// ===== JOB DATA =====
const jobs = [
  { id: 1, company: "Google", position: "Frontend Developer", location: "Remote", type: "Full-time", salary: "$120k", description: "Build modern UI applications.", status: null },
  { id: 2, company: "Microsoft", position: "Backend Developer", location: "USA", type: "Full-time", salary: "$130k", description: "Work on cloud systems.", status: null },
  { id: 3, company: "Amazon", position: "Full Stack Developer", location: "Canada", type: "Full-time", salary: "$110k", description: "Develop scalable systems.", status: null },
  { id: 4, company: "Facebook", position: "React Developer", location: "Remote", type: "Contract", salary: "$100k", description: "Build social interfaces.", status: null },
  { id: 5, company: "Netflix", position: "UI Engineer", location: "USA", type: "Full-time", salary: "$140k", description: "Streaming UI systems.", status: null },
  { id: 6, company: "Tesla", position: "Software Engineer", location: "USA", type: "Full-time", salary: "$150k", description: "Automotive software.", status: null },
  { id: 7, company: "Apple", position: "iOS Developer", location: "USA", type: "Full-time", salary: "$145k", description: "Develop iOS apps.", status: null },
  { id: 8, company: "Spotify", position: "Web Developer", location: "Remote", type: "Part-time", salary: "$90k", description: "Music platform web app.", status: null }
];

let currentTab = "all";

const jobsContainer = document.getElementById("jobsContainer");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const totalCount = document.getElementById("totalCount");
const tabCount = document.getElementById("tabCount");


// ===== RENDER JOBS =====
function renderJobs() {

  jobsContainer.innerHTML = "";

  const filteredJobs = jobs.filter(job => {
    if (currentTab === "all") return true;
    return job.status === currentTab;
  });

  tabCount.innerText = filteredJobs.length + " jobs";

  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = `
      <div class="text-center py-16 text-gray-500">
        <div class="text-5xl mb-4">📄</div>
        <h3 class="text-lg font-semibold">No jobs available</h3>
        <p>Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  filteredJobs.forEach(job => {

    const card = document.createElement("div");
    card.className = "bg-white border border-gray-200 p-5 rounded-xl hover:shadow-md transition";

    let badge = "";
    if (job.status === "interview") {
      badge = `<span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 mb-3">Interview</span>`;
    } 
    else if (job.status === "rejected") {
      badge = `<span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 mb-3">Rejected</span>`;
    }

    card.innerHTML = `
      <h3 class="text-sm text-gray-500">${job.company}</h3>
      <p class="text-lg font-semibold mb-1">${job.position}</p>
      <p class="text-sm text-gray-500 mb-2">
        ${job.location} • ${job.type} • ${job.salary}
      </p>
      <p class="text-sm mb-3">${job.description}</p>
      ${badge}
      <div class="flex gap-3 mt-3">
        <button class="interviewBtn px-3 py-1 rounded-md text-sm transition 
          ${job.status === "interview"
            ? "bg-green-600 text-white"
            : "bg-green-50 text-green-600 hover:bg-green-100"}">
          Interview
        </button>
        <button class="rejectedBtn px-3 py-1 rounded-md text-sm transition
          ${job.status === "rejected"
            ? "bg-red-600 text-white"
            : "bg-red-50 text-red-600 hover:bg-red-100"}">
          Rejected
        </button>
      </div>
    `;

    const interviewBtn = card.querySelector(".interviewBtn");
    const rejectedBtn = card.querySelector(".rejectedBtn");

    interviewBtn.addEventListener("click", () => {
      job.status = job.status === "interview" ? null : "interview";
      updateCounts();
      renderJobs();
    });

    rejectedBtn.addEventListener("click", () => {
      job.status = job.status === "rejected" ? null : "rejected";
      updateCounts();
      renderJobs();
    });

    jobsContainer.appendChild(card);
  });
}


// ===== UPDATE COUNTS =====
function updateCounts() {
  interviewCount.innerText = jobs.filter(j => j.status === "interview").length;
  rejectedCount.innerText = jobs.filter(j => j.status === "rejected").length;
  totalCount.innerText = jobs.length;
}


// ===== TAB SWITCHING =====
document.querySelectorAll(".tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("bg-blue-600", "text-white");
      t.classList.add("bg-gray-200");
    });

    tab.classList.remove("bg-gray-200");
    tab.classList.add("bg-blue-600", "text-white");

    currentTab = tab.dataset.tab; // already lowercase in HTML
    renderJobs();
  });

});


// ===== INITIAL LOAD =====
updateCounts();
renderJobs();