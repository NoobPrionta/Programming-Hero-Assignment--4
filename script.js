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

// ===== VARIABLES =====
let currentTab = "all";

const jobsContainer = document.getElementById("jobsContainer");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");
const totalCount = document.getElementById("totalCount");
const tabCount = document.getElementById("tabCount");


// ===== RENDER JOBS =====
function renderJobs() {

  jobsContainer.innerHTML = "";

  // Filter jobs by tab
  const filteredJobs = jobs.filter(job => {
    if (currentTab === "all") return true;
    return job.status === currentTab;
  });

  tabCount.innerText = filteredJobs.length + " jobs";

  // Empty State
  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = `
      <div class="empty-state">
        <div style="font-size:50px;">📄</div>
        <h3>No jobs available</h3>
        <p>Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  // Create cards
  filteredJobs.forEach(job => {

    const card = document.createElement("div");
    card.classList.add("job-card");

    // ===== STATUS BADGE =====
    let badge = "";
    if (job.status === "interview") {
      badge = `<div class="status-badge interview-badge">Interview</div>`;
    } 
    else if (job.status === "rejected") {
      badge = `<div class="status-badge rejected-badge">Rejected</div>`;
    }

    card.innerHTML = `
      <h3>${job.company}</h3>
      <p><strong>${job.position}</strong></p>
      <small>${job.location} • ${job.type} • ${job.salary}</small>
      <p>${job.description}</p>

      ${badge}

      <div class="buttons">
        <button class="btn btn-interview ${job.status === "interview" ? "active-interview" : ""}">
          Interview
        </button>

        <button class="btn btn-rejected ${job.status === "rejected" ? "active-rejected" : ""}">
          Rejected
        </button>
      </div>
    `;

    // ===== BUTTON LOGIC =====
    const interviewBtn = card.querySelector(".btn-interview");
    const rejectedBtn = card.querySelector(".btn-rejected");

    interviewBtn.addEventListener("click", () => {
      if (job.status === "interview") {
        job.status = null;  // remove status
      } else {
        job.status = "interview";
      }

      updateCounts();
      renderJobs();
    });

    rejectedBtn.addEventListener("click", () => {
      if (job.status === "rejected") {
        job.status = null;  // remove status
      } else {
        job.status = "rejected";
      }

      updateCounts();
      renderJobs();
    });

    jobsContainer.appendChild(card);
  });
}


// ===== UPDATE DASHBOARD COUNTS =====
function updateCounts() {
  const interviewJobs = jobs.filter(job => job.status === "interview").length;
  const rejectedJobs = jobs.filter(job => job.status === "rejected").length;

  interviewCount.innerText = interviewJobs;
  rejectedCount.innerText = rejectedJobs;
  totalCount.innerText = jobs.length;
}


// ===== TAB SWITCHING =====
document.querySelectorAll(".tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentTab = tab.dataset.tab;

    renderJobs();
  });

});


// ===== INITIAL LOAD =====
updateCounts();
renderJobs();