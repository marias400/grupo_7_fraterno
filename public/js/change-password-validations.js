const changePasswordValidation = new JustValidate("#change-password-form", {
    validateOnEvent: true,
})

changePasswordValidation
    .addField("#currentPassword", [
        {
            rule: "required",
            errorMessage: "* Ingrese su contraseña actual",
        },
    ])
    .addField("#password", [
        {
            rule: "required",
            errorMessage: "* Ingrese una nueva contraseña",
        },
        {
            rule: "strongPassword",
            errorMessage:
                "* Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
        },
        {
            rule: "minLength",
            value: 8,
            errorMessage: "* Debe tener al menos 8 caracteres",
        },
    ])
    .addField("#repassword", [
        {
            rule: "required",
            errorMessage: "* Debe repetir la contraseña",
        },
        {
            validator: (value, fields) => {
                return value === fields["#password"].elem.value;
            },
            errorMessage: "* Las contraseñas no coinciden",
        },
    ])
    .onSuccess((e) => {
        e.target.submit();
    });

document.getElementById("currentPassword").addEventListener("blur", () => {
    changePasswordValidation.revalidateField("#currentPassword");
});

document.getElementById("password").addEventListener("blur", () => {
    changePasswordValidation.revalidateField("#password");
});

document.getElementById("repassword").addEventListener("blur", () => {
    changePasswordValidation.revalidateField("#repassword");
});
