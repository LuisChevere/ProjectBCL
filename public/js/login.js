const alertEl = document.getElementById("login-alert");
alertEl.style.display = "none";

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alertEl.style.display = "flex";

      setTimeout(() => {
        alertEl.style.display = "none";
      }, 3000);
    }
  }
}

document
  .getElementById("login-btn")
  .addEventListener("click", loginFormHandler);
