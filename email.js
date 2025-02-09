const form = document.getElementById("form");
const btn = document.getElementById("button");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  btn.value = "Sending...";

  emailjs.sendForm("service_7272v8p", "template_xpsvnyk", this)
    .then(() => {
      btn.value = "Send";
      alert("Message sent!");
      console.log("SUCCESS!");
    }, (error) => {
      btn.value = "Send";
      alert("Failed to send message.");
      console.log("FAILED...", error);
    });
});
