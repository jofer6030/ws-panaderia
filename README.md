# Admin Api - Bot Sellar
### Requerimientos

- Node js  `">= 16.0.0` o superior.

### Instalación

_Sigue las siguientes instrucciones para clonar el repositorio_

_Clone el repositorio_

```
https://gitlab.com/2cloudpe/bot-seller/bot-seller-ws.git
```

_Instale los node_modules_

```bash
npm install
```

_Establesca un archivo .env según sea el ambiente_
 * _Para ambiente producción:_ `.env.production`
 * _Para ambiente desarrollo:_ `.env.development`


```bash
PORT=5001
OPENAI_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_API_KEY=
PHONE_ID=
TOKEN_PHONE=
URL_BACKEND=
PHONE_ID_WS=
TOKEN_PHONE_WS=
```

_Correr el proyecto Running the app_

```bash
# production mode
NODE_ENV=production npm run dev

# development mode
NODE_ENV=development npm run dev
```


### API 
#

Las API REST de bot-seller se describe a continuación.

Linck de consulta:
* Producción: https://webhook.svc.2cloud.pe/
* Desarrollo: https://webhook.dev.svc.2cloud.pe/