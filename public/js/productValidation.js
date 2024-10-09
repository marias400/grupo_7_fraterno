
document.addEventListener('DOMContentLoaded', function() {
    const validation = new JustValidate('.product-form');
    validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'El nombre del producto es obligatorio',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'El nombre debe tener al menos 5 caracteres',
      },
      {
        rule: 'maxLength',
        value: 45,
        errorMessage: 'El nombre no debe tener más de 45 caracteres',
      },
    ])
    
    // Validación de la descripción
    .addField('#description', [
      {
        rule: 'required',
        errorMessage: 'La descripción es obligatoria',
      },
      {
        rule: 'minLength',
        value: 20,
        errorMessage: 'La descripción debe tener al menos 20 caracteres',
      },
      {
        rule: 'maxLength',
        value: 200,
        errorMessage: 'La descripción no debe tener más de 200 caracteres',
      },
    ])
    
    
    // Validación de los ingredientes
    .addField('#ingredients', [
      {
        rule: 'required',
        errorMessage: 'Los ingredientes son obligatorios',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Los ingredientes deben tener al menos 5 caracteres',
      },
    ])
    
    // Validación de la imagen (opcional)
    
    .addField('#image', [
        {
          rule: 'files',
          value: {
            files: {
              extensions: ['jpg', 'jpeg', 'png','gif'],             
              types: ['image/jpg', 'image/jpeg','image/png','image/gif']
            },
          },
          errorMessage: 'Debes poner una foto con la extension correcta',
        },
      ])
    
    // Validación de la categoría
    .addField('#category', [
      {
        rule: 'required',
        errorMessage: 'Debes seleccionar una categoría',
      },
    ])
    
    // Validación del tamaño
    .addField('#size', [
      {
        rule: 'required',
        errorMessage: 'El tamaño es obligatorio',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'El tamaño debe tener al menos 3 caracteres',
      },
    ])
    
    // Validación del precio
    .addField('#price', [
      {
        rule: 'required',
        errorMessage: 'El precio es obligatorio',
      },
      {
        rule: 'number',
        errorMessage: 'El precio debe ser un número válido',
      },
      {
        rule: 'minNumber',
        value: 1,
        errorMessage: 'El precio debe ser mayor a 0',
      },
    ])

       // Validación del stock
       .addField('#stock', [
        {
          rule: 'required',
          errorMessage: 'El stock es obligatorio',
        },
        {
          rule: 'number',
          errorMessage: 'El stock debe ser un número válido',
        },
      ])

      .onSuccess((event) => {
        event.preventDefault();
        alert('Formulario válido, enviando datos...');
        event.target.submit();
      });
  });
  



