# HOJAS DE ESTILOS

Para facilitar la lectura y el mantenimiento del código de manera ordenada y continua, propongo seguir el siguiente formato:

- **NOMENCLATURA**: que se utilice la nomenclatura **BEM** (**B**loque\_\_**E**lemento--**M**odificador) para el nombramiento de clases. Ejemplo:

```css
   .product-card {
   /* Estilos generales para la tarjeta de producto */
   }

   .product-card__image {
   /* Estilos para la imagen del producto */
   }

   .product-card__title {
   /* Estilos para el título del producto */
   }

   .product-card__price {
   /* Estilos para el precio del producto */
   }

   .product-card--featured {
   /* Estilos para la tarjeta de producto destacada */
   }

   .product-card--sale {
   /* Estilos para la tarjeta de producto en oferta */
   }
```

- En este ejemplo podemos identificar:

  - **bloque**: `product-card` representa el componente principal.
  - **elementos**: `product-card__image`, `product-card__title`, `product-card__price` son los elementos que componen la tarjeta de producto.
  - **modificadores**: `product-card--featured`, `product-card--sale` modifican el estilo de la tarjeta de producto.

- **SELECTORES**: que aparezcan en la hoja de estilos en el orden en que aparecen en el HTML. Ejemplo:

```css
/* Estilos para el header */
header {
  background-color: var(--color-primary);
  color: white;
  padding: 20px;
}

/* Estilos para el body */
body {
  font-family: var(--font-family-primary);
  margin: 0;
}

/* Estilos para el footer */
footer {
  background-color: var(--color-secondary);
  color: white;
  padding: 20px;
}
```

- **PROPIEDADES**: que se ordenen las propiedades dentro de cada selector siguiendo el orden de aparición en la siguiente lista:

1. **Propiedades de tamaño y forma**:

   1. width
   2. height
   3. max-width
   4. max-height
   5. min-width
   6. min-height

1. **Propiedades de fondo**:

   1. background-color
   2. background-image
   3. background-repeat
   4. background-position
   5. background-size

1. **Propiedades de color**:

   1. color
   2. opacity

1. **Propiedades de relleno y margen**:

   1. padding
   2. margin

1. **Propiedades de fuente**:

   1. font-family
   2. font-size
   3. font-weight
   4. font-style
   5. font-variant
   6. line-height
   7. text-align
   8. text-transform
   9. text-decoration

1. **Propiedades de borde**:

   1. border
   2. border-width
   3. border-style
   4. border-color
   5. border-top
   6. border-right
   7. border-bottom
   8. border-left
   9. border-radius

1. **Propiedades de sombra**:

   1. box-shadow
   2. text-shadow

1. **Propiedades de visualización**:

   1. display
   2. visibility
   3. overflow
   4. position
   5. top
   6. right
   7. bottom
   8. left
   9. z-index

1. **Propiedades de diseño de flexbox**:

   1. flex-direction
   2. flex-wrap
   3. flex-flow
   4. justify-content
   5. align-items
   6. align-content
   7. order
   8. flex-grow
   9. flex-shrink
   10. flex-basis

1. **Propiedades de transición y animación**:
   1. transition
   2. animation

NOTA: Las propiedades que no aparezcan en esta lista se ubicarán al final de la sección correspondiente (o una propia) siguiendo un orden según su importancia.

Ejemplo:

```css
.my-element {
  /* Tamaño y forma */
  width: 300px;
  height: 200px;

  /* Fondo */
  background-color: #f0f0f0;
  background-image: url("my-image.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* Color */
  color: #333;
  opacity: 0.8;

  /* Relleno y margen */
  padding: 20px;
  margin: 10px auto;

  /* Fuente */
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;

  /* Borde */
  border: 1px solid #ccc;
  border-radius: 5px;

  /* Sombra */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  /* Visualización */
  display: block;
  visibility: visible;
  overflow: hidden;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  /* Transición y animación */
  transition: all 0.3s ease;
  animation: my-animation 2s linear infinite;
}
```

- **VARIABLES**: que se definan al principio de la hoja de estilos, para que sean fáciles de encontrar y modificar. Ejemplo:

```css
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --font-family-primary: 'Arial', sans-serif;
  --font-family-secondary: 'Roboto', sans-serif;
}
```

- **COMENTARIOS**: que se utilicen para explicar el código y facilitar su comprensión. Ejemplo:

```css
/* Estilos para el header */
header {
  background-color: var(--color-primary);
  color: white;
  padding: 20px;
}
```

- **MEDIA QUERIES**: que se definan al final de la hoja de estilos, para que no interfieran con el resto del código. Ejemplo:

```css
/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  header {
    padding: 10px;
  }
}
```
