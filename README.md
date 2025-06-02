# Blog de Viajes y Recetas

Este proyecto es una aplicación web desarrollada con Django que combina un blog de viajes con un recetario interactivo. Los usuarios pueden explorar publicaciones sobre distintos destinos, consultar el clima actual de cualquier ciudad, descubrir recetas aleatorias y organizar sus ingredientes en una lista de la compra inteligente.

## 🌍 Descripción del Proyecto

El sitio web tiene tres funcionalidades principales:

- **Blog de viajes**: Publicaciones con descripciones, imágenes y consejos sobre distintos destinos.
- **Recetas**: Acceso a recetas aleatorias mediante una API externa, con posibilidad de añadir ingredientes a la lista de la compra.
- **Clima**: Consulta del clima en tiempo real por ciudad usando una API meteorológica.
- **Lista de la compra**: Sistema visual para añadir, eliminar y calcular el coste de los ingredientes necesarios.

Además, incluye modo claro/oscuro y próximamente un modo lectura para centrarse solo en el contenido.

## ⚙️ Tecnologías utilizadas

- **Backend**: Django 4+
- **Frontend**: HTML5, CSS3 (modo claro/oscuro), JavaScript (vanilla)
- **Bases de datos**: SQLite3 (por defecto en desarrollo)
- **APIs externas**:
  - API del clima: [OpenWeatherMap](https://openweathermap.org/)
  - API de recetas: [TheMealDB](https://www.themealdb.com/)

## 🧱 Estructura del proyecto

```
mi_pagina_web/
│
├── blog/                 # App principal: viajes, recetas, clima
├── tu_compra/            # App de lista de la compra
├── templates/            # Plantillas HTML base y por app
├── static/               # Archivos estáticos (CSS, JS, imágenes)
├── media/                # Archivos subidos por el usuario (si aplica)
├── manage.py             # Comando principal del proyecto
├── requirements.txt      # Dependencias del proyecto
└── ...
```

## 🚀 Instrucciones para clonar y visualizar el proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Robtv155/python_django.git
cd mi_pagina_web
```

### 2. Crear y activar un entorno virtual

```bash
python -m venv venv
.env\Scriptsctivate  # En Windows
# source venv/bin/activate  # En macOS/Linux
```

### 3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

### 4. Migrar la base de datos

```bash
python manage.py migrate
```

### 5. Crear un superusuario (opcional pero recomendado)

```bash
python manage.py createsuperuser
```

### 6. Ejecutar el servidor

```bash
python manage.py runserver --nostatic
```

Abre tu navegador y visita `http://127.0.0.1:8000/`. Para el panel de administración, ve a `http://127.0.0.1:8000/admin/`.

## 👤 Cuentas de prueba

Puedes crear un superusuario con tu propia cuenta. No se incluyen credenciales predeterminadas por seguridad.

## 🔐 Configuraciones necesarias

Para que funcionen correctamente las APIs externas, asegúrate de configurar las claves necesarias en tu archivo `.env` o directamente en el archivo de configuración:

```python
# settings.py
WEATHER_API_KEY = 'tu_clave_de_OpenWeatherMap'
MEALDB_API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php'
```

> Si no configuras la clave, la consulta del clima puede fallar.

## 📬 Contacto

Para dudas o mejoras, puedes abrir un issue o enviar un pull request al repositorio.

## ☁️ Despliegue en Railway

Este proyecto está desplegado en producción mediante [Railway](https://railway.app/), lo que permite su acceso en línea sin necesidad de ejecutarlo localmente.

La dirección web es la siguiente: [proyectofinal-production-665b.up.railway.app]()

Para realizar el despliegue se ha configurado:

- `requirements.txt` con todas las dependencias necesarias.
- Configuración de entorno (`DEBUG`, claves API, `ALLOWED_HOSTS`) desde el panel de Railway.
- Uso de WhiteNoise para servir archivos estáticos en producción.
- Comando de ejecución: `python manage.py runserver 0.0.0.0:$PORT --nostatic`

> Asegúrate de configurar las variables de entorno correctamente en el panel de Railway antes de desplegar.
