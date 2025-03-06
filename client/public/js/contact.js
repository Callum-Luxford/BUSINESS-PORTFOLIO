document
  .querySelector(".contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("/contact", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const result = await response.json();

    if (result.success) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Error: " + result.error);
    }
  });
