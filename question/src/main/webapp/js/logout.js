document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutbutton");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            fetch("/demo/logout", {
                method: "GET"
            })
                .then((response) => {

                })
                .catch((error) => {
                    console.error("Error during logout:", error);
                });
            window.location.href = "loginpage.html";
        });

    }
});
