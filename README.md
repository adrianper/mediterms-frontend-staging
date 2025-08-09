# MediTerms-Frontend
---------------------------------------------------------
### Requirements
- Node V22+

### Instructions
- `npm install` para instalar paquetes
- `npm run dev` para iniciar el servidor
- `npm run build` para compilar
- `npm cap add [ios/android]` para iniciar el proyecto para compilar la app movil
- `npm cap sync [ios/android]` para sincronizar el proyecto cuando haces cambios y una build nueva de la app movil (recuerda que cada vez que modificas la app debes compilarla de nuevo con `npm run build`)
- `npx capacitor-assets generate [--ios, --android]` para cambiar el icono de la app utilizando el que esta en `assets/logo.png`


### Android
- Es necesario tener instalado Android Studio, Java tanto como su JRE version 8 como el JDK version 21 (OJO el proyecto debe estar en tu windows, porque si esta en WSL2 no encontrara las ubicaciones de Android Studio ni del JDK de Java)
- `npx cap open android` para abrir android studio
- `npx cap run android` para ejecutar la app en android en modo debug
- Cuando quieras hacer la build sigue los pasos:
	- Incrementa en 1 el `versionCode` en el archivo `build.Gradle`, tambien puedes cambiar el `versionName`
	- En Android Studio busca Build > Generate Signed Bundle
	- Utiliza los keys que te brinda el equipo
	- Deja la variante de compilacion en `release`
	- Localiza el archivo final en `android/app/release/app-release.abb` y  ese es el que puedes subir en Google Play Console
- Para subir en la Play store
	- Ve a Google Play Console y busca tu app
	- En Internal Testing crea un nuevo release
	- En App bundles sube el archivo `app-release.abb` generado, puedes agregar unas notas de release y publicalo
	- En Production crea un nuevo release y elige el que subiste antes en `Add from library` y publicalo y espera la revision en `Publishing overview`

### IOS
- Pendiente