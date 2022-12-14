<div align="center"><strong>Node.js | Express | MongoDB | TypeScript</strong></div>
<div align="center">A production-ready boilerplate based on Node.js, Express and MongoDB (using Mongoose ODM) written in TypeScript. It gets you up and running very fast to quickly build RESTful APIs.<br />
  <em>Feel free to contribute</em>
</div>

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

## Features

<dl>
  <dt>MongoDB</dt>
  <dd>NoSQL database using <a href="https://mongoosejs.com/">Mongoose</a> ODM</dd>
  
  <dt>Authentication</dt>
  <dd>JWT-based authentication with <a href="http://www.passportjs.org/">Passport</a></dd>

  <dt>Roles and Rights</dt>
  <dd>Create custom roles and assign custom rights to them in order to protect routes with specific rights</dd>

  <dt>Logging</dt>
  <dd>using <a href="https://github.com/winstonjs/winston">winston</a> as logger and <a href="https://github.com/winstonjs/winston">morgan</a> as HTTP request logger middleware (if running in a Docker container, the logs are sent to <a href="https://docs.docker.com/config/containers/logging/"><code>stdout</code></a> of the Docker daemon)</dd>

  <dt>Validation</dt>
  <dd>validate the request body with <a href="https://express-validator.github.io/docs/">express-validator</a></dd>

  <dt>Process Manager</dt>
  <dd><a href="https://pm2.keymetrics.io/">PM2</a> as process manager to keep the app alive</dd>

  <dt>Mailing</dt>
  <dd>send e-mails using <a href="https://nodemailer.com/about/">Nodemailer</a> and test your set-up with <a href="https://ethereal.email/">Ethereal</a></dd>

  <dt>Task Scheduler</dt>
  <dd>schedule tasks with <a href="https://github.com/node-cron/node-cron">node-cron</a></dd>

  <dt>Security</dt>
  <dd>takes care of the application security with <a href="https://helmetjs.github.io/">Helmet</a>, <a href="https://www.npmjs.com/package/express-mongo-sanitize">Express Mongoose Sanitize</a>, <a href="https://github.com/nfriedly/express-rate-limit">Express Rate Limit</a></dd>

  <dt>Environment Variables</dt>
  <dd>using <a href="https://github.com/motdotla/dotenv">dotenv</a> (you can change the <code>.env</code> file inside the <code>nodemon.json</code> file)</dd>

  <dt>Docker / Docker-Compose support</dt>
  <dd>simply modify the <code>Dockerfile</code> and <code>docker-compose.yml</code> to fit your needs</dd>

  <dt>Compression</dt>
  <dd>gzip compression with <a href="https://github.com/expressjs/compression">compression</a></dd>

  <dt>Git hooks</dt>
  <dd>using <a href="https://github.com/typicode/husky">husky</a> and <a href="https://www.conventionalcommits.org/">conventional commits</a></dd>

  <dt>Linting & Formatting</dt>
  <dd>with <a href="https://github.com/prettier/prettier">Prettier</a> and <a href="https://github.com/eslint/eslint">ESLint</a> following the <a href="https://www.npmjs.com/package/eslint-config-airbnb-typescript">Airbnb's ESLINT config</a> with TypeScript support</dd>

  <dt>Error Handling</dt>
  <dd>centralized error handling</dd>

  <dt>Static Content</dt>
  <dd>Serve static content via the <code>public</code> folder</dd>

  <dt>Versioning</dt>
  <dd>Using <a href="https://github.com/conventional-changelog/standard-version">standard version</a> to version your project following <a href="https://semver.org/">semver</a></dd>
</dl>

## Run the app

**Locally**

Install dependencies:
`npm install` or `yarn`

Start development server using Nodemon:
`npm run dev`

Keep in mind that Docker is not used here. Instead, the environment variable `DATABASE_URI` gets accessed.

**Docker(-Compose)**

`docker-compose up`

Docker-Compose automatically creates a Node.js container using the `Dockerfile` as well as a MongoDB container using the `mongo:4.4.5-bionic` image.

_Start the Node.js container only_
`docker build <project-dir> -t node-app`

## Environment variables

The **NODE_ENV** environment variable is set inside `nodemon.json` for `development` and in the `Dockerfile` for `production`. If you don't use Docker in production, you can set the `NODE_ENV` variable in the `ecosystem.config.json` file (PM2 config file) like so:

```text
{
  "apps": [
    {
      "name": "app",
      "script": "index.js",
      "instances": 1,
      "autorestart": true,
      "time": true,
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ]
}

```

```text
SERVER_PORT=3000

DATABASE_URI=mongodb://127.0.0.1:27017/express-boilerplate

JWT_SECRET=your-secret
JWT_EXPIRATION_HOURS=24
JWT_ISSUER=Express Boilerplate

SMTP_HOST=mail-server
TP_PORT=587
SMTP_USERNAME=mail-server-username
SMTP_PASSWORD=mails-server-password
EMAIL_FROM=mail-sender
```

## Project Structure

```
src\
 |--config\         # Environment variables and configurations
 |--controllers\    # Route controllers
 |--middlewares\    # Middlwares
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--services\       # Business logic
 |--types\          # Custom types
 |--app.ts          # Express app
 |--index.ts        # Entry point
```

## API

### Endpoints

**Auth routes**

`POST /v1/auth/register` - _body:_ `{ email: string, password: string }`

`POST /v1/auth/login` - _body:_ `{ email: string, password: string }`

`GET /v1/auth/me`

`GET /v1/auth/logout`

**User routes**

`GET /v1/users`

`GET /v1/users/:id`

`POST /v1/users` - _body:_ `{ email: string, password: string }`

`PUT /v1/users/:id` - _body:_ `{ email: string, password: string }`

`DELETE /v1/users/:id`

**Right routes**

`GET /v1/rights`

`GET /v1/rights/:id`

`POST /v1/rights` - _body:_ `{ name: string, description?: string }`

`PUT /v1/rights/:id` - _body:_ `{ name: string, description?: string }`

`DELETE /v1/rights/:id`

**Role routes**

`GET /v1/roles`

`GET /v1/roles/:id`

`POST /v1/roles` - _body:_ `{ name: string, description?: string, rights?: ObjectId[] }`

`PUT /v1/roles/:id` - _body:_ `{ name: string, description?: string, rights?: ObjectId[] }`

`DELETE /v1/roles/:id`

