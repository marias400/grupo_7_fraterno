const loginFormValidation = new JustValidate("#login-form");

loginFormValidation
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "Debe ingresar un Email",
    },
    {
      rule: "email",
      errorMessage: "Debe ser un Email válido",
    },
    //que el email este en la db
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "Ingrese una contraseña",
    },
  ])
  .onSuccess((e) => {
    e.target.submit();
  })

