const loginFormValidation = new JustValidate("#login-form", {
  validateOnEvent: true,
});

loginFormValidation
  .addField("#email", [
    {
      rule: "required",
      errorMessage: "* Ingrese un email",
    },
    {
      rule: "email",
      errorMessage: "* Ingrese un email válido",
    },
  ])
  .addField("#password", [
    {
      rule: "required",
      errorMessage: "* Ingrese una contraseña",
    },
  ])
  .onSuccess((e) => {
    e.target.submit();
  });

document.getElementById('email').addEventListener('blur', ()=>{
  loginFormValidation.revalidateField('#email');
});

document.getElementById('password').addEventListener('blur', ()=>{
  loginFormValidation.revalidateField('#password');
});