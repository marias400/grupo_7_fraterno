
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
        value: 3,
        errorMessage: 'El nombre debe tener al menos 3 caracteres',
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'El nombre no debe tener más de 50 caracteres',
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
        value: 10,
        errorMessage: 'La descripción debe tener al menos 10 caracteres',
      },
      {
        rule: 'maxLength',
        value: 300,
        errorMessage: 'La descripción no debe tener más de 300 caracteres',
      },
    ])
    
    // Validación del SKU
    .addField('#sku', [
      {
        rule: 'required',
        errorMessage: 'El SKU es obligatorio',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'El SKU debe tener al menos 3 caracteres',
      },
      {
        rule: 'maxLength',
        value: 10,
        errorMessage: 'El SKU no debe tener más de 10 caracteres',
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
          errorMessage: 'Debes poner una foto con la extencion correcta',
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

      .onSuccess((event) => {
        event.preventDefault();
        alert('Formulario válido, enviando datos...');
        event.target.submit();
      });
  });
  



