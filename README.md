# OptimalWay - Product Management System

Una aplicació React per a la gestió de productes desenvolupada com a prova tècnica.

## 🚀 Instal·lació i Execució

### Prerequisits
- Node.js (versió 18 o superior)
- npm o yarn

### Instal·lació
```bash
# Clonar el repositori
git clone <repository-url>
cd optimalway

# Instal·lar dependències
npm install
```

### Scripts Disponibles

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

## 🏗️ Arquitectura i Decisions Tècniques

> 📖 **Documentació Detallada**: 
> - [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura, patrons i escalabilitat
> - [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md) - Justificació de decisions tècniques

### Stack Tecnològic
- **React 19** - Framework principal
- **Redux Toolkit** - Gestió d'estat global
- **React Router v7** - Navegació i routing
- **Vite** - Build tool i bundler
- **Material UI** - Components d'UI
- **ESLint** - Linting i qualitat de codi

### Decisions d'Arquitectura

#### 1. **Separació per Features**
L'aplicació està organitzada seguint el patró de **Feature-Based Architecture**:
```
src/
├── features/
│   └── products/
│       ├── api/           # Lògica d'accés a dades
│       ├── constants/     # Constants específiques
│       ├── data/          # Dades inicials
│       └── productsSlice.js # Redux slice
├── components/            # Components reutilitzables
├── pages/                 # Pàgines de l'aplicació
└── app/                   # Configuració global
```

#### 2. **Gestió d'Estat amb Redux Toolkit**
- **Async Thunks** per operacions asíncrones
- **Slices** per organitzar l'estat per funcionalitat
- **Repository Pattern** per separar l'accés a dades

#### 3. **Components Reutilitzables**
- **UI Components** (`/components/ui/`) - Components genèrics
- **Feature Components** (`/components/products/`) - Components específics
- **Layout Components** - Estructura de la pàgina

#### 4. **Responsive Design**
- CSS Grid per layouts adaptatius
- Variables CSS per consistència visual
- Design system amb colors i tipografia coherents

## 📁 Estructura de Carpetes

```
src/
├── app/                   # Configuració global
│   ├── routes.jsx        # Definició de rutes
│   └── store.js          # Configuració Redux
├── components/           # Components reutilitzables
│   ├── layout/          # Components de layout
│   ├── products/        # Components específics de productes
│   └── ui/              # Components d'UI genèrics
├── features/            # Funcionalitats organitzades
│   └── products/        # Feature de productes
│       ├── api/         # Repositori de dades
│       ├── constants/   # Constants
│       ├── data/        # Dades inicials
│       └── productsSlice.js # Redux slice
├── pages/               # Pàgines de l'aplicació
└── main.jsx            # Punt d'entrada
```

## 🎯 Funcionalitats Implementades

### ✅ Completades
- **CRUD de Productes**: Crear, llegir, actualitzar i eliminar
- **Filtres**: Cerca per nom i filtre per categoria
- **Paginació**: Navegació per pàgines
- **Validació de Formularis**: Validació en temps real
- **Estats de Càrrega**: Spinners i feedback visual
- **Responsive Design**: Adaptable a diferents pantalles
- **Gestió d'Errors**: Maneig d'errors amb feedback visual

### 🔄 Estats de Càrrega i Error
- Spinners amb Material UI per operacions asíncrones
- Missatges d'error clars i accessibles
- Estats de càrrega per a cada operació (CRUD)

### ♿ Accessibilitat
- Etiquetes ARIA per formularis
- Navegació per teclat
- Contrast adequat de colors
- Text alternatiu per imatges

## 🧪 Testing i Qualitat

### Linting
- ESLint configurat amb regles de React
- Hooks rules per evitar bugs comuns
- Consistent code style

### Estructura Escalable
- Components modulares i reutilitzables
- Separació clara de responsabilitats
- Patrons consistentos per a noves funcionalitats

## 🚧 Parts a Completar

### Testing
```bash
# Afegir testing (recomanat)
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Com completar-ho:**
1. Configurar Vitest per testing unitari
2. Testing Library per components React
3. Tests per a:
   - Components principals (ProductForm, ProductCard)
   - Redux slices i thunks
   - Hooks personalitzats
   - Integració de pàgines

### Optimitzacions
1. **Lazy Loading**: Implementar React.lazy() per pàgines
2. **Memoització**: React.memo() per components pesats
3. **Virtual Scrolling**: Per llistes grans de productes
4. **Service Worker**: Per cache i funcionalitat offline

### Funcionalitats Adicionals
1. **Autenticació**: Sistema d'usuaris
2. **Imatges**: Upload i gestió d'imatges
3. **Exportació**: PDF/Excel dels productes
4. **Notificacions**: Toast notifications
5. **Dark Mode**: Tema fosc

## 🔧 Configuració de Desenvolupament

### Variables d'Entorn
```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=OptimalWay
```

### Extensions Recomanades (VSCode)
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## 📝 Decisions de Disseny

### UX/UI
- **Design System**: Colors i tipografia consistents
- **Feedback Visual**: Estats de càrrega clars
- **Navegació Intuitiva**: Breadcrumbs i navegació clara
- **Responsive**: Mobile-first approach

### Performance
- **Code Splitting**: Per rutes
- **Bundle Optimization**: Vite per builds ràpids
- **Lazy Loading**: Per components pesats

## 🤝 Contribució

1. Fork el projecte
2. Crea una branca per a la teva feature (`git checkout -b feature/AmazingFeature`)
3. Commit els canvis (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branca (`git push origin feature/AmazingFeature`)
5. Obre un Pull Request

## 📄 Llicència

Aquest projecte és part d'una prova tècnica i està sota llicència privada.