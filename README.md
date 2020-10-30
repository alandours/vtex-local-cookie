# vtex-local-cookie

Agrega la cookie `VtexIdclientAutCookie` a vtexlocal y Vtex Uploader.

## Instalación

### Chrome

1. Clonar repo o descargar como zip y descomprimir
2. Ir a `chrome://extensions`
3. Activar "Modo de desarrollador"
4. Hacer click en "Cargar extensión sin empaquetar" y seleccionar la carpeta del repo

> Para que funcione en incógnito, hacer click en "Detalles" de la extensión y activar "Permitir modo incógnito"

### Firefox

1. Clonar repo o descargar como zip y descomprimir
2. Dentro del repo cambiar a la branch firefox `git checkout firefox`
3. Ir a `about:addons`
4. En "Administrar extensiones" hacer click en "Instalar complemento desde archivo..." y seleccionar el archivo .xpi

> Para que funcione en ventanas privadas, hacer click en la extensión y seleccionar "Permitir" en "Ejecutar en ventanas privadas".

## Uso

Repetir estos pasos todos los días (o cuando expiren las cookies)

> Repetir los mismos pasos en las ventanas privadas/incógnito ya que guardan las cookies en stores diferentes.

#### 1. Loguearse en cualquier ambiente de vtexcommercestable o myvtex para crear la cookie

```
https://{env}.vtexcommercestable.com.br
https://{env}.myvtex.com
```

#### 2.1 Vtexlocal

Al entrar por primera vez a cada ambiente es necesario hacerlo en /admin para agregar la cookie

```
http://{env}.vtexlocal.com.br/admin
```

Una vez que la cookie es agregada, redirige automaticamente a la home, y se puede entrar normalmente

```
http://{env}.vtexlocal.com.br
```

#### 2.2 Vtex Uploader
La cookie se agrega al entrar por primera vez al uploader

```
https://uploader.janisdev.in
```