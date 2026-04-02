# EventMaster

Proyecto **Expo** (Expo Router) en **JavaScript** (.js / .jsx), trabajo en equipo, arquitectura **MVVM** por carpetas en `src/`.

## Carpetas `src/` (MVVM)

| Carpeta | Uso |
|---------|-----|
| `models/` | Datos y reglas de dominio |
| `viewmodels/` | Estado y acciones de pantalla |
| `views/` | Pantallas / presentación |
| `components/` | Piezas de UI reutilizables |
| `services/` | API, almacenamiento, integraciones |
| `hooks/` | Hooks compartidos |
| `helpers/` | Utilidades |

Cada carpeta tiene `.gitkeep` para versionarla vacía. Importa desde `app/` con rutas relativas (por ejemplo `../src/...`) hasta que el equipo decida otra convención.

## `app/`

Solo **Expo Router**: `_layout.jsx` (envoltorio) e `index.jsx` (pantalla inicial vacía).

## Archivos de configuración (resumen)

| Archivo | Para qué sirve |
|---------|----------------|
| `app.json` | Nombre, iconos, splash, plugins de Expo (incluye expo-router). |
| `package.json` | Dependencias y scripts (`npm start`, `npm run lint`). |
| `eslint.config.js` | Reglas de **ESLint** (calidad de código); opcional ejecutar `npm run lint`. |

Expo usa por defecto **Babel** por dentro (`babel-preset-expo`); no hace falta un `babel.config.js` en la raíz salvo que más adelante necesites plugins extra.

## Arranque

```bash
npm install
npx expo start
```

```bash
npm run lint
```

(Cuando haya `.js` / `.jsx` en `src/`, puedes ampliar el script de lint a `eslint app src`.)
