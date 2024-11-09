const resumeDisplay = document.getElementById("resumeDisplay");

const data = JSON.parse(localStorage.getItem("resumeData"));

if (data) {
  resumeDisplay.innerHTML = `
    <section>
      <h1>Personal Information</h1>
      <h2>${data.name}</h2>
      <p>Address: ${data.address}</p>
      <p>Email: ${data.email}</p>
      <p>Number: ${data.number}</p>
    </section>
    <section>
      <h3>Education</h3>
      <p>${data.education}</p>
    </section>
    <section>
      <h3>Work Experience</h3>
      <ul>${data.workExperience.map(exp => `<li>${exp}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>Skills</h3>
      <ul>${data.skills.map(skill => `<li>${skill}</li>`).join("")}</ul>
    </section>
     <button type="button" id="edit" class="editable">Edit Resume</button>
    <button class="editable" id="shareButton">Share Resume</button>
    <button class="editable" id="newResume">New Resume</button>
    <button id="copyLinkButton" class='editable'>Copy Resume Link</button>

  `;
}
document.getElementById('edit').addEventListener('click', () => {
  
  const updatedData = {
    name: resumeDisplay.querySelector("h2").innerText,
    address: resumeDisplay.querySelector("p").innerText.split(": ")[1],
    email: resumeDisplay.querySelectorAll("p")[1].innerText.split(": ")[1],
    number: resumeDisplay.querySelectorAll("p")[2].innerText.split(": ")[1],
    education: resumeDisplay.querySelectorAll("p")[3].innerText,
    workExperience: Array.from(resumeDisplay.querySelectorAll("ul")[0].children).map(li => li.innerText),
    skills: Array.from(resumeDisplay.querySelectorAll("ul")[1].children).map(li => li.innerText),
  };
  
  localStorage.setItem("resumeData", JSON.stringify(updatedData));
  window.location.href = "index.html"; 
});


document.getElementById("shareButton").addEventListener("click", async () => {
  const resumeText = document.getElementById("resumeDisplay").innerText;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "My Resume",
        text: resumeText
      });
      console.log("Resume shared successfully!");
    } catch (error) {
      console.error("Error sharing the resume:", error);
    }
  } else {
    alert("Web Share API is not supported in your browser.");
  }
});
document.getElementById("newResume").addEventListener("click", () => {
  localStorage.clear()
  window.location.href = "index.html"; 
});

  document.getElementById("copyLinkButton").addEventListener("click", () => {
    const resumeLink = window.location.href; // Get the current page URL

    // Copy the link to the clipboard
    navigator.clipboard.writeText(resumeLink)
      .then(() => {
        alert("Resume link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy the link: ", err);
        alert("Failed to copy the link. Please try again.");
      });
  });

