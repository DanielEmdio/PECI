function checkToken () {
    if (getCookie("token") /*localStorage.token*/) {
        // check if token is valid
        $.post("/valid", { token: getCookie("token") /*localStorage.token*/})
        .done(function( data ) {
            const info = JSON.parse(data)

            if (info.tokenIsValid === "VALID") {
                // get page content
            } else {
                // return to login
                window.location.href = '/login';
            }
        })
        .fail(function() {
            errorBox.innerHTML = "Ocorreu um erro ao tentar contactar o servidor!";
        });
    } else {
        // return to login
        window.location.pathname = '/login'
    }
}