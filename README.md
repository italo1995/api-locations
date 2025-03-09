# api-locations
API RESTful para la gestión de países, estados, ciudades y zonas horarias, creada con TSOA, Express y Sequelize. Ideal para proyectos que requieren datos geográficos estructurados.

# API de Países, Estados, Ciudades y Zonas Horarias

## Descripción
API RESTful para la gestión de países, estados, ciudades y zonas horarias, creada con TSOA, Express y Sequelize. Ideal para proyectos que requieren datos geográficos estructurados.

## Características
- Obtener información sobre países, estados, ciudades y zonas horarias.
- Endpoints organizados y documentados.
- Basado en estándares RESTful.
- Escalable y fácil de implementar.

## Requisitos previos
Antes de usar este proyecto, asegúrate de tener instalado:
- Node.js v22.14.0 o superior.
- MySQL.
- npm o yarn.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/italo1995/api-locations.git
   npm i

## Configura las variables de entorno:
1. Crea un archivo .env con los valores necesarios: 
  MY_PORT=XXXX
  NODE_ENV=development
  JWT_SECRET_KEY=
  JWT_EXPIRES=false
  DB_HOST=https://localhost:XXXX/
  DB_HOST_TEST=https://localhost:XXXX/

  SQL_DIALECT=mysql
  DB_USER=tu_usuario
  DB_PASSWORD=tu_contraseña
  DB_HOST=localhost
  DB_NAME=nombre_de_tu_base_de_datos
  DB_PORT=XXXX

## Migraciones de la base de datos
Para ejecutar las migraciones y configurar la base de datos, sigue estos pasos:
1. Ejecuta las migraciones:
  ```bash
   npx sequelize-cli db:migrate

# Estructura del archivo `locations.json`
1. Para generar la base de datos automáticamente utilizando el endpoint `GET /countries/loadData`, es necesario proporcionar un archivo `locations.json` estructurado correctamente. A continuación, se muestra un ejemplo de cómo debería verse:

```json
    [
      {
        "id": 239,
        "name": "Venezuela",
        "iso3": "VEN",
        "iso2": "VE",
        "numeric_code": "862",
        "phone_code": "58",
        "capital": "Caracas",
        "currency": "VES",
        "currency_name": "Bolívar",
        "currency_symbol": "Bs",
        "tld": ".ve",
        "native": "Venezuela",
        "region": "Americas",
        "subregion": "South America",
        "nationality": "Venezuelan",
        "timezones": [
            {
                "zoneName": "America\/Caracas",
                "gmtOffset": -14400,
                "gmtOffsetName": "UTC-04:00",
                "abbreviation": "VET",
                "tzName": "Venezuelan Standard Time"
            }
        ],
        "translations": {
            "kr": "베네수엘라",
            "pt-BR": "Venezuela",
            "pt": "Venezuela",
            "nl": "Venezuela",
            "hr": "Venezuela",
            "fa": "ونزوئلا",
            "de": "Venezuela",
            "es": "Venezuela",
            "fr": "Venezuela",
            "ja": "ベネズエラ・ボリバル共和国",
            "it": "Venezuela",
            "cn": "委内瑞拉",
            "tr": "Venezuela"
        },
        "latitude": "8.00000000",
        "longitude": "-66.00000000",
        "emoji": "🇻🇪",
        "emojiU": "U+1F1FB U+1F1EA",
        "states": [
            {
                "id": 2044,
                "name": "Amazonas",
                "state_code": "Z",
                "latitude": "-3.41684270",
                "longitude": "-65.85606460",
                "type": "state",
                "cities": [
                    {
                        "id": 130106,
                        "name": "Maroa",
                        "latitude": "2.71880000",
                        "longitude": "-67.56046000"
                    }
                ]
            }
        ]
      }
    ]

# Uso
1. Inicia el servidor:
  ```bash
  npm start

2. Accede a la documentación de la API en:
  http://localhost:PUERTO/docs

3. URL de la API:
  http://localhost:PUERTO

# Contribuciones
¡Las contribuciones son bienvenidas! Si deseas agregar algo o corregir errores, simplemente haz un fork del proyecto, realiza los cambios y envía un pull request.

# Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

# Contacto
Si tienes alguna pregunta o comentario, no dudes en contactarme:

Autor: Italo Belen

Correo: italobelen1995@gmail.com