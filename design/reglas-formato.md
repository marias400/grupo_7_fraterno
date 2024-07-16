# HOJAS DE ESTILOS

Para facilitar la lectura y el mantenimiento del código de manera ordenada y continua, propongo seguir el siguiente formato:

## **NOMENCLATURA DE CLASES**
 Que se utilice la nomenclatura **BEM** (**B**loque\_\_**E**lemento--**M**odificador) para el nombramiento de clases.

 Ejemplo:

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

## **SELECTORES**

Que aparezcan en la hoja de estilos en el orden en que aparecen en el HTML.

Ejemplo:

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

## **PROPIEDADES**

Que se ordenen las propiedades dentro de cada selector siguiendo el orden propuesto por la siguiente tabla:

| **#** | **Categoría**                         | **Propiedades**                                                                                                              |
|-------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
|   1   | Propiedades de tamaño y forma         | width, height, max-width, max-height, min-width, min-height                                                                  |
|   2   | Propiedades de fondo                  | background-color, background-image, background-repeat, background-position, background-size                                  |
|   3   | Propiedades de color                  | color, opacity                                                                                                               |
|   4   | Propiedades de relleno y margen       | padding, margin                                                                                                              |
|   5   | Propiedades de fuente                 | font-family, font-size, font-weight, font-style, font-variant, line-height, text-align, text-transform, text-decoration      |
|   6   | Propiedades de borde                  | border, border-width, border-style, border-color, border-top, border-right, border-bottom, border-left, border-radius        |
|   7   | Propiedades de sombra                 | box-shadow, text-shadow                                                                                                      |
|   8   | Propiedades de visualización          | display, visibility, overflow, position, top, right, bottom, left, z-index                                                   |
|   9   | Propiedades de diseño de flexbox      | flex-direction, flex-wrap, flex-flow, justify-content, align-items, align-content, order, flex-grow, flex-shrink, flex-basis |
|  10   | Propiedades de transición y animación | transition, animation                                                                                                        |
|  11   | Propiedades misceláneas               | cursor, user-select, pointer-events, white-space, word-wrap, word-break, text-overflow, resize, outline, appearance          |

Las propiedades que no aparezcan en esta tabla se ubicarán al final de la categoría correspondiente o una propia en caso de no estar listada, siguiendo un orden según su relevancia.

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

  /* Propiedad que no aparece en la lista */
  list-style-type: none;
}
```

## **VARIABLES**

Que se definan al principio de la hoja de estilos, para que sean fáciles de encontrar y modificar.

Ejemplo:

```css
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --font-family-primary: 'Arial', sans-serif;
  --font-family-secondary: 'Roboto', sans-serif;
}
```

## **COMENTARIOS**

Que se utilicen para explicar el código y facilitar su comprensión.

Ejemplo:

```css
/* Estilos para el header */
header {
  background-color: var(--color-primary);
  color: white;
  padding: 20px;
}
```

## **MEDIA QUERIES**

Que se definan al final de la hoja de estilos, para que no interfieran con el resto del código.

Ejemplo:

```css
/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  header {
    padding: 10px;
  }
}
```
