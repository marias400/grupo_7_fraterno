const editProfileValidation = new JustValidate('#edit-profile-form', {
    validateOnEvent: true,
});

editProfileValidation
    .addField('#firstName', [
        {
            rule: 'required',
            errorMessage: '* El nombre es obligatorio',
        },
        {
            rule: 'minLength',
            value: 2,
            errorMessage: '* Debe tener al menos 2 caracteres',
        },
    ])
    .addField('#lastName', [
        {
            rule: 'required',
            errorMessage: '* El apellido es obligatorio',
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: '* El correo electrónico es obligatorio',
        },
        {
            rule: 'email',
            errorMessage: '* El correo electrónico no es válido',
        },
    ])
    .addField('#phone', [
        {
            rule: 'number',
            errorMessage: '* El teléfono debe ser un número',
        },
        {
            rule: 'minLength',
            value: 10,
            errorMessage: '* El número debe tener al menos 10 dígitos',
        },
        {
            rule: 'maxLength',
            value: 15,
            errorMessage: '* El número no puede tener más de 15 dígitos',
        },
    ])
    .addField('#address', [
        {
            rule: 'required',
            errorMessage: '* La dirección es obligatoria',
        },
        {
            rule: 'minLength',
            value: 5,
            errorMessage: '* Debe tener al menos 5 caracteres',
        },
    ])
    .onSuccess((e) => {
        e.target.submit();
    });

document.getElementById("firstName").addEventListener("blur", () => {
    editProfileValidation.revalidateField("#firstName");
});

document.getElementById("lastName").addEventListener("blur", () => {
    editProfileValidation.revalidateField("#lastName");
});

document.getElementById("email").addEventListener("blur", () => {
    editProfileValidation.revalidateField("#email");
});

document.getElementById("phone").addEventListener("blur", () => {
    editProfileValidation.revalidateField("#phone");
});

document.getElementById("address").addEventListener("blur", () => {
    editProfileValidation.revalidateField("#address");
});
    
    