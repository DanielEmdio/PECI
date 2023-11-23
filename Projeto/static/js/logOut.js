function logOut() {
    if (getCookie("token") /*localStorage.token*/) {
        // check if token is valid
        $.post("/logOut", { token: getCookie("token") /*localStorage.token*/})
        .done(function( data ) {
            const info = JSON.parse(data)

            if (info.deleted === "YES") {
                // delete authentication token
                eraseCookie("token") //localStorage.removeItem("token");

                // return to login
                window.location.href = "/login";
            } else {
                console.log("ocorreu um erro ao tentar contactar o servidor");
            }
        })
        .fail(function() {});
    }
}