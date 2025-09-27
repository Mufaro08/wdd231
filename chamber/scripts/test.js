// const footer = document.querySelector("footer");
// const firstParagraph = footer.selectB("p");
// const secondParagraph = footer.querySelector("p:nth-of-type(2)");


// const currentYear = new Date().getFullYear();
// const lastModified = document.lastModified;


// firstParagraph.textContent = `© ${currentYear} Mufaro Justice Tapera, Zimbabwe. All rights reserved.`;
// secondParagraph.textContent = `Last Modified: ${lastModified}`;

// document.getElementById("dynamic1").textContent = "This is the first dynamic message.";
// document.getElementById("dynamic2").textContent = "This is the second dynamic message.";

const firstParagraph = document.getElementById("myName");
const secondParagraph = document.getElementById("copyright");
const thirdParagraph = document.getElementById("lastModified");


const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;


firstParagraph.textContent = `Mufaro Justice Tapera`;
secondParagraph.textContent = `© ${currentYear} Harare Chamber of Commerce. All rights reserved.`;
thirdParagraph.textContent = `Last Modified: ${lastModified}`;


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
navMenu.classList.toggle('active');
});

async function loadMembers() {
  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();
    displayMembers(members, "grid");
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members, view) {
  const container = document.getElementById("members-container");
  container.className = view; 
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="./images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p><strong>Membership Level:</strong> ${formatLevel(member.membershipLevel)}</p>
      <p>${member.info}</p>
    `;

    container.appendChild(card);
  });
}

function formatLevel(level) {
  switch(level) {
    case 1: return "Member";
    case 2: return "Silver";
    case 3: return "Gold";
    default: return "Unknown";
  }
}

document.getElementById("grid-view").addEventListener("click", async () => {
  const response = await fetch("./data/members.json");
  const members = await response.json();
  displayMembers(members, "grid");
});

document.getElementById("list-view").addEventListener("click", async () => {
  const response = await fetch("./data/members.json");
  const members = await response.json();
  displayMembers(members, "list");
});

window.addEventListener("DOMContentLoaded", loadMembers);
