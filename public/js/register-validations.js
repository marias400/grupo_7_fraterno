const registerFormValidation = new JustValidate("#register-form");

registerFormValidation
  .addField("#firstName", [
    {
      rule: "required",
      errorMessage: "* El nombre es obligatorio",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "* Debe tener al menos 2 caracteres",
    },
  ])
  .addField("#lastName", [
    {
      rule: "required",
      errorMessage: "* El apellido es obligatorio",
    },
  ])
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "* El correo electrónico es obligatorio",
    },
    {
      rule: "email",
      errorMessage: "* El correo electrónico no es válido",
    },
  ])
  .addField("#phone", [
    {
      rule: "number",
      errorMessage: "* El teléfono debe ser un número",
    },
    {
      rule: "minLength",
      value: 10,
      errorMessage: "* El número debe tener al menos 10 dígitos",
    },
    {
      rule: "maxLength",
      value: 15,
      errorMessage: "* El número no puede tener más de 15 dígitos",
    },
  ])
  .addField("#image", [
    {
      rule: "files",
      value: {
        files: {
          extensions: ["jpeg", "jpg", "png", "gif"],
        },
      },
      errorMessage: "* Solo se permiten archivos JPEG, JPG, PNG o GIF",
    },
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "* La contraseña es obligatoria",
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

document.getElementById("email").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#email");
});

document.getElementById("password").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#password");
});

document.getElementById("repassword").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#repassword");
});

document.getElementById("firstName").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#firstName");
});

document.getElementById("lastName").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#lastName");
});

document.getElementById("phone").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#phone");
});

document.getElementById("image").addEventListener("blur", () => {
  registerFormValidation.revalidateField("#image");
});