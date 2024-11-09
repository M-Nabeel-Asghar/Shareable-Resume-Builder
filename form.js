let isDataSaved = false;
document.getElementById("save").addEventListener("click", () => {
  const resumeData = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    number: document.getElementById("number").value,
    education: document.getElementById("education").value,
    workExperience: document.getElementById("workExperience").value.split(",").map(exp => exp.trim()),
    skills: document.getElementById("skills").value.split(",").map(skill => skill.trim()),
  };
  
  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  isDataSaved = true; 
  alert("Resume data saved!");
});


document.getElementById("viewResume").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const education = document.getElementById("education").value;
  const workExperience = document.getElementById("workExperience").value;
  const skills = document.getElementById("skills").value;
  
  switch (true) {
    case !isDataSaved:
      alert("Please save your data before proceeding.");
      break;
    case !(name && address && email && number && education && workExperience && skills):
      alert("Please fill in all fields before proceeding.");
      break;
    default:
      window.location.href = "resume.html";
  }
  
});

document.addEventListener("DOMContentLoaded", () => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData) {
        document.getElementById("name").value = savedData.name || '';
        document.getElementById("address").value = savedData.address || '';
        document.getElementById("email").value = savedData.email || '';
        document.getElementById("number").value = savedData.number || '';
        document.getElementById("education").value = savedData.education || '';
        document.getElementById("workExperience").value = savedData.workExperience.join(", ") || '';
        document.getElementById("skills").value = savedData.skills.join(", ") || '';
    }
});
