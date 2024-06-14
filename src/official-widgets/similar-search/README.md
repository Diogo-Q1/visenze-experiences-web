# Similar Search widget
This is the repository for ViSenze's Similar Search widget. 

This widget is designed to enable consumers to search similar products from a PLP or search results page

## Folder structure and key files

```
├─ similar-search        <- Folder containing the standalone code 
   ├─ components        <- Folder containing the product card component - start here to customise the product card
   ├─ screens           <- Folder containing the results page layout, start here to customise the layout and appearance of the widget
   ├─ icons             <- Folder containing the icons used 
├── similar-search.tsx    <- Main widget code.
 
   
```

## Local development

1. To run the widget locally:
   1. Add your app key and placement ID to `dev-configs.ts`.
   2. Run:
      ```sh
      npm run start:similar-search
      ```
      The dev server will be available at `http://localhost:8080` and will automatically reload for changes made in `src/official-widgets/similar-search` folder.
2. To bundle the widget:
   ```sh
   npm run build:similar-search
   ```
   The bundled file will be available in `dist/similar-search` directory. 