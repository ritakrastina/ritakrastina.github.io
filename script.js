// Set current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set email
const user = "rita.krastina";
const domain = "gmail.com";
const emailLinks = document.querySelectorAll(".email-link");

emailLinks.forEach((link) => {
  link.href = `mailto:${user}@${domain}`;
});
