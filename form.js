document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signUpForm");
  const formMessage = document.getElementById("formMessage");

  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    formMessage.textContent = "";

    if (!firstName || !lastName || !email || !password) {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.style.color = "red";
      return;
    }

    const postData = { firstName, lastName, email, password };

    try {
      const response = await fetch("https://kqio0gctxg.execute-api.ap-southeast-2.amazonaws.com/test/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.status === "200") {
        formMessage.textContent = "Sign up successful!";
        formMessage.style.color = "green";
      } else {
        const errorData = await response.json();
        formMessage.textContent = `Error: ${errorData.error}`;
        formMessage.style.color = "red";
      }
    } catch (error) {
      console.log("Error:", error);
      formMessage.textContent = "An error occurred. Please try again.";
      formMessage.style.color = "red";
    }
  });
});
