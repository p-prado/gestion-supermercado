window.addEventListener("load", function () {
    const emailControl = document.getElementById("emailControl");
    const passControl = document.getElementById("passControl");
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        let email = emailControl.value;
        let password = passControl.value;
        console.log(email, password);
        window.comm.validateLogin(email, password);
    })

    // loginButton.addEventListener("click", function () {
    //     // Validate Login
    //     window.comm.validateLogin(email, password);
    // });
});
