window.onload = () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    usernameInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            tryLogin();
        }
    });

    passwordInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            tryLogin();
        }
    });
};

function tryLogin () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (password === "" || username === "") {
        errorBox.innerHTML = "Por favor preencha todos os campos!";
    } else {

        $.post("/auth", { username: username, password: password })
        .done(function( data ) {
            const info = JSON.parse(data)

            if (info.authentication === "OK") {
                setCookie("token", info.token); // localStorage.setItem("token", info.token)
                console.log(info)
                window.location.pathname = '/'
            }
        })
        .fail(function() {});
    }
}
