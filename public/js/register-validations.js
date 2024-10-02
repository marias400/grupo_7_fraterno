const registerFormValidation = new JustValidate("#register-form");

registerFormValidation
  .addField("#firstName", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 2,
    },
    //agregar mensajes de error
  ])
  .addField("#lastName", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 2,
    },
    //agregar mensajes de error
  ])
  .addField("#email", [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
    //que el email no se repita en la db
  ])
  .addField("#password", [
    {
      rule: "required",
    },
    {
      rule: "strongPassword",
    },
    //agregar mensajes de error
  ])
  .addField("#image", [
    {
      rule: "files",
      value: {
        files: {
          extensions: ["jpeg", "jpg", "png", "gif"],
        },
      },
      //agregar mensajes de error
    },
  ])
  .addField("#phone", [
    {
      rule: "customRegexp",
      value: /^\+?\d{10,15}$/,
      errorMessage: "Número de telefono inválido",
    },
  ])
  .onSuccess((e) => {
    e.target.submit();
  })