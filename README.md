# Spotify Control Web

App que funciona como control remoto que estén reproduciendo música en Spotify.

## Índice

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API](#api)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## Descripción

El objetivo es poder usar la App para modificar lo que se está reproduciendo en el dispositivo que está reproduciendo. La idea principal es:

- Poner en practica el consumo de una API
- Realizar un buen uso de useContext
- Experimentar el uso de Material UI con React

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/usuario/nombre-del-repositorio.git

# Navegar al directorio del proyecto
cd nombre-del-repositorio

# Instalar dependencias
npm install

# Iniciar la aplicación
npm run dev
```

## Uso

1. Al levantar o ingresar a la APP, se necesita una autorizacion para que todo funcione. Aceptar estos permisos nos dá un token lo cual nos permite usar la aplicación.
2. Una vez autorizada la app, ya podemos usarla sin problemas, pudieron modificar el volumen, skippear musica e incluso buscar artistas en la aplicacion.

Nota: El token dura 1 hora, luego de eso hay que pedir uno nuevo

## Estructura del Proyecto

```bash
  Controller-Remote/
  ├── src/
  │   ├── assets/
  │   │   └── photo.jpg
  │   ├── components/
  │   │   ├── Componente1/
  │   │   │   └── index.tsx
  │   │   └── Componente2/
  │   │       └── index.tsx
  │   ├── domain/
  │   │   ├── album.ts
  │   │   └── artist.ts
  │   ├── layouts/
  │   │   └── index.tsx
  │   ├── pages/
  │   │   ├── page1/
  │   │   │   └── index.tsx
  │   │   └── page2/
  │   │       └── index.tsx
  │   ├── providers/
  │   │   └── auth/
  │   │       └── AuthContext.tsx
  │   ├── routes/
  │   │   └── routes.tsx
  │   ├── services/
  │   │   ├── configuration.ts
  │   │   └── service.ts
  │   ├── types/
  │   │   ├── domain.ts
  │   │   ├── index.ts
  │   │   └── player.ts
  │   ├── ui/
  │   │   ├── button/
  │   │   │   └── index.tsx
  │   │   └── text/
  │   │       └── index.tsx
  │   ├── util/
  │   │   └── milisegundosAMinutosConSegundos.ts
  │   ├── App.tsx
  │   ├── index.css
  │   └── main.tsx
  ├── package.json
  └── README.md
```

## API

[Documentacion API Spotify](https://developer.spotify.com/documentation/web-api)

## Tecnologías Utilizadas

- [React](https://es.react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Material UI](https://mui.com)
