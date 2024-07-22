# Embedded Search Results widget
This is the repository for ViSenze's Embedded Search Results widget. 

This widget is designed to power search experiences in ecommerce websites

## Folder structure and key files

```
├─ embedded-search-results        <- Folder containing the standalone code 
   ├─ components        <- Components used by the widget
├── embedded-search-results.tsx    <- Main widget code.
 
   
```

## Local development

1. To run the widget locally:
   1. Add your app key and placement ID to `dev-configs.ts`.
   2. Run:
      ```sh
      npm run start:embedded-search-results
      ```
      The dev server will be available at `http://localhost:8080` and will automatically reload for changes made in `src/official-widgets/embedded-search-results` folder.
2. To bundle the widget:
   ```sh
   npm run build:embedded-search-results
   ```
   The bundled file will be available in `dist/embedded-search-results` directory. 