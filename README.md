# OptimalWay - Prova tècnica

## Instal·lació i Execució

### Requisits
- Node.js (versió 19 o superior) i npm

### Instal·lació
```bash
# Clonar el repositori
# Instal·lar dependències
npm install
```

### Dependències Principals
L'aplicació utilitza les següents llibreries:

```bash
# React router
npm install react react-dom react-router-dom

# Gestió d'estat amb Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Material UI pel component Spinner
npm install @mui/material @emotion/react @emotion/styled

# Generació de IDs únics
npm install uuid
```

### Scripts del projecte

```bash
# Desenvolupament (servidor local)
npm run dev

# Build de producció
npm run build

# Preview del build de producció
npm run preview

# Linting
npm run lint
```

## Decisions Tècniques

### Stack
- **React 19.1.1**
- **Redux Toolkit** - Gestió d'estat
- **React Router v7** - Navegació i routing
- **Vite**
- **Material UI** - Components d'UI (Spinner: indicador de càrrega)
- **ESLint** - Qualitat de codi

#### **Arquitectura separada en Features i Components**

He organitzat el codi seguint una arquitectura que separa la presentació visual (components) de la part lògica (features).
La carpeta `components/` conté components reutilitzables que s'utilitzen en les pàgines principals, que es troben dins la carpeta `pages/`. Dins de `components/` hi ha una subcarpeta `products/` que agrupa components relacionats amb els productes (ProductCard, ProductForm, ProductDetailModal), els quals són reutilitzables entre diferents pàgines.
La carpeta `features/` conté la lògica. Dins de `features/products/` hi ha tot el que envolta les dades de productes: constants (de les categories de productes), les dades inicials dels productes, el repositori que permet l'accés a dades i el slice de Redux que gestiona l'estat global.
Les pàgines (`pages/`) utilitzen components reutilitzables (`components`) mentre consumeixen la lògica (`features/products`), mantenint una clara separació d'utilitats per carpetes.

```
src/
├── features/              # Lògica
│   └── products/
│       ├── api/           # Accés a dades (Repositori)
│       ├── constants/     # Constants relacionades amb productes (les categories)
│       ├── data/          # Dades incials dels productes
│       └── productsSlice.js # Redux slice (estat global)
├── components/            # Components reutilitzables
│   ├── ui/               # Components genèrics (Spinner i ConfirmModal)
│   ├── products/         # Components en relació amb productes
│   └── layout/           # Components del layout
├── pages/                 # Pàgines de l'aplicació (Llistat de productes, Edició de producte i Creació de producte)
└── app/                 # Conté store.js (Redux) i routes.jsx (Navegació entre pàgines)
    ├── routes.jsx # Definició de rutes
│   └── store.js # Configuració Redux     
```

**CSS Modules per Component**: Cada component té el seu propi fitxer CSS (ex: `ProductCard.css`, `ProductForm.css`). Al mateix temps, existeix un fitxer `index.css` global per estils compartits. Aquesta decisió facilita el manteniment, ja que per modificar un component, només cal actualitzar el seu CSS específic. 

**Escalabilitat i Mantenibilitat**: L'arquitectura està dissenyada per facilitar el seu creixement. Per afegir una nova feature (ex: `features/users/`) només s'ha de crear una nova carpeta amb la seva lògica, dades, etc. Els components UI genèrics es reutilitzen i les pàgines poden utilitzar la nova lògica creada, sense perjudicar alguna funcionalitat existent.
Cada feature gestiona la seva pròpia lògica, així doncs, en cas de modificar la gestió de productes, només s'ha de tocar la carpeta `features/products/`. Si cal canviar l'aparença d'un component, només s'ha de modificar el seu CSS específic. Aquesta separació redueix el risc de bugs i facilita les actualitzacions.

**Testing**: La separació clara entre lògica (`features/`) i presentació (`components/`) també facilita el testing. Es poden testar els Redux slices i el repositori independentment, i testar els components UI individualment.


#### **Redux Toolkit per Gestió d'Estat**

He triat Redux Toolkit sobre altres alternatives com Context API, ja que la quantitat de dades podria augmentar en gran mesura si l'aplicació creix i el Context API comportaria complicacions. En quant a Zustand, no hi tinc experiència.
Una aplicació com aquesta ha de recordar quins productes hi ha al catàleg, quins filtres ha aplicat l'usuari administrador, en quina pàgina està navegant, quins productes està editant, l'estat de les operacions (creant, editant, eliminant), etc. Si utilitzés Context API (més simple), cada vegada que es produís un canvi, com crear un nou producte, tots els components que escolten aquest context es tornarien a renderitzar, fins i tot els que no necessiten aquesta informació. Això faria que l'aplicació funcionés més lenta.

**Com escalaria l'estat si el domini creix?**

Ara mateix només es gestionen productes, però si l'aplicació creix, es gestionarien llistes d'usuaris, tracking i estat de comandes, analítiques de vendes i informes, estoc, proveïdors, incidències, tipus de moneda, personalització de l'aplicació, etc.
En el futur, cada secció (productes, usuaris, comandes, etc.) tindria la seva pròpia "caixa" (slice) amb les seves regles. De manera que, si es fan canvis en l'apartat d'usuaris, no afecta la part de productes. Cada secció es gestionaria sense molestar les altres.

Per exemple, l'estat podria evolucionar de la següent manera:
```javascript
// Ara (només productes):
{ products: { items, filters, pagination } }

// En el futur:
{
  products: { catalog, categories, prices },
  users: { usersList, permissions, activity },
  orders: { orders, state, tracking },
  inventory: { stock, alerts, suppliers },
  analytics: { sales, metrics, reports },
  storeSettings: { currency, itemsPerPage }
}
```

#### **Repositori**

Totes les operacions de dades de productes (CRUD) passen a través del `productsRepo`.

Aquesta separació facilita el testing, ja que permet mockar el repository completament sense tocar la lògica de Redux del Slice o els components que depenen de l'estat del Slice. A més, si en el futur es vol canviar de localStorage a una API real, només s'ha de modificar el repositori, mantenint la lògica del `productsSlice` neta, i facilitant també el testing en el Slice, ja que tots els thunks i reducers continuen funcionant amb les mateixes dades. La migració a una API real seria senzilla, només caldria canviar el repositori.

**Repositori In-Memory amb Simulació Async**

L'aplicació utilitza un repositori in-memory que simula una API amb el retard del servidor. Es troba a `src/features/products/api/productsRepo.js` i ofereix diversos avantatges pel desenvolupament i testing. He escollit aquesta opció perquè em facilita el desenvolupament frontend sense necessitat d'un backend.

**Base de Dades Inicial:**

El repositori s'inicialitza amb dades de prova (`src/features/products/data/initialProductsDb.js`) que inclouen més de 20 productes de diverses categories (Electronics, Gaming, Mobile, etc.) per facilitar les demostracions.

**Material UI**

He utilitzat el component Spinner de Material-UI per aconseguir un element de càrrega amb un disseny coherent i una implementació ràpida.

## Funcionalitats Implementades
- **CRUD complet**: Create, Read, Update, Delete de productes
- **Filtratge**: Cerca per nom, preu i categoria
- **Paginació**: Gestió de pàgines amb control de nombre d'items per pàgina
- **Persistència**: Les dades es mantenen durant la sessió de l'aplicació
- **Estructura Escalable**: Components reutilitzables. Separació clara de responsabilitats.
- **Validació i Gestió d'Errors**: Maneig d'errors amb feedback visual