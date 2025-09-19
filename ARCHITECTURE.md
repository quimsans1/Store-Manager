# Nota d'Arquitectura - OptimalWay

## Arquitectura

### **UI**
```
components/
├── ui/                 # Components genèrics
│   ├── modals/        # Modals reutilitzables
│   └── pagination/    # Component de paginació
├── products/          # Components específics
│   ├── productCard/   # Targeta de producte
│   ├── productForm/   # Formulari de producte
│   └── productDetailModal/ # Modal de detalls
└── layout/            # Components de layout
```

### **Lògica**
```
features/products/
├── productsSlice.js   # Lògica d'estat i reducers
├── api/              # Accés a dades
└── constants/        # Constants de categories
```

### **Dades**
```
features/products/
├── api/productsRepo.js    # Repository pattern
└── data/initialProductsDb.js # Dades inicials
```

### **Navegació i Store**
```
app/
├── routes.jsx        # Definició de rutes
└── store.js         # Configuració del Store de Redux
```

## Gestió d'Estat

### **Estructura de l'Estat del Slice de Redux**

```javascript
{
  products: {
    items: [],           // Llista de productes
    current: null,       // Producte actual (edit)
    loading: false,      // Estat de càrrega
    error: null,         // Errors
    filters: {           // Filtres actius
      search: '',
      category: ''
    },
    pagination: {        // Paginació//
      page: 1,
      itemsPerPage: 12,
      total: 0
    }
  }
}
```

### **Async Thunks**

Operacions asíncrones gestionades amb Redux Toolkit

## Escalabilitat

### **Per Afegir Noves Features:**

**Crear nova carpeta a `features/`**
```
features/
├── products/     # Feature existent
├── users/        # Nova feature
└── orders/       # Nova feature
```

**Afegir al store:**
```javascript
// app/store.js
export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,    // Nova feature
    orders: ordersReducer,  // Nova feature
  },
});
```
