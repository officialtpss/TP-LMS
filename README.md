# API

## Prerequisite :

1. NodeJS - (v14.X.X)
2. [MongoDB](https://www.mongodb.com/try/download/community)
3. [Mongo tools](https://docs.mongodb.com/database-tools/)

## Connect to database

    - Connect to your remote database (Create free instance in [Atlas](https://www.mongodb.com/atlas/database))

## Execute Project:

1.  Copy environment files

    `cp .env.example .env`

2.  Install Dependencies

    `npm install`

3.  Start **Development** Server `npm run local` or `npm run dev`

## 🛎 Commands

-   Run the Server in production mode : `npm run start`
-   Run the Server in development mode : `npm run dev`
-   Run all unit-tests : `npm test`
-   Check for linting errors : `npm run lint`
-   Fix for linting : `npm run lint:fix`
-   Fix for styleing : `npm run style:fix`
-   Fix for linting & styleing : `npm run fix`

### ✨ ESLint, Prettier :: Code Formatter

[Prettier](https://prettier.io/) is an opinionated code formatter.

[ESLint](https://eslint.org/), Find and fix problems in your JavaScript code.

It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

Optional Setup :

1. Install [VSCode](https://code.visualstudio.com/) Extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. `CMD` + `Shift` + `P` (Mac Os) or `Ctrl` + `Shift` + `P` (Windows)

3. Format Selection With

4. Configure Default Formatter...

5. Prettier - Code formatter

<img src="https://user-images.githubusercontent.com/42952358/126604937-4ef50b61-b7e4-4635-b3c9-3c94dd6b06fa.png" alt="Formatter Setting" />

### 📗 Swagger :: API Document

[Swagger](https://swagger.io/) is Simplify API development.

Start your app in development mode at `http://localhost:3000/api-docs`

Modify `swagger.yaml` file to your source code.

### 🏎 SWC :: a super-fast JavaScript / TypeScript compiler

[SWC](https://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.

`SWC is 20x faster than Babel on a single thread and 70x faster on four cores.`

-   swc build :: `npm run build`
-   tsc build :: `npm run build:tsc`

## 🗂 Code Structure

```bash
│
├── /.vscode
│     ├── launch.json
│     └── settings.json
│
├── /app
|     |
│     ├── /configs
│     │     ├── config.ts
│     │     └── swagger.ts
│     │
│     ├── /common
│     │     ├── Constants.ts
│     │     ├── interfaces
│     │     ├── enum
│     │     └── exceptions
|     |
│     ├── /controllers
│     │     ├── demo.ts
│     │     └── todo.ts
│     │
│     ├── /factories
│     │     └── *ModelFactory.ts
│     │
│     ├── /managers
│     │     ├── TodoManager.ts
│     │     └── DemoManager.ts
│     │
│     ├── /middlewares
│     │     ├── todo.ts
│     │     └── demo.ts
│     │
│     ├── /models
│     │     └── *Model.ts
│     │
│     ├── /routes
│     │     ├── index.ts
│     │     ├── todo.ts
│     │     └── demo.ts
│     │
│     ├── /services
│     │     ├── TodoService.ts
│     │     └── DemoService.ts
│     │
│     ├── /utils
│     │     ├── common.ts
│     │     ├── dateTime.ts
│     │     ├── logger.ts
│     │     ├── util.ts
│     │     └── vaildateEnv.ts
│     │
│     ├── app.ts
│     └── server.ts
│
├── .editorconfig
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .nvmrc
├── .prettierrc
├── .swcrc
├── nodemon.json
├── package-lock.json
├── package.json
└── tsconfig.json
```

## TODO

You need to create repo and provide access to us.

1. Create 2 Models which will cover whole layer of the architecture
2. It should follow all standards with API doc
3. CRUD endpoints needs to be added
4. One of the CRUD should fetch data from any third party APIs. (Weather, Map)
5. Write unit testing using JEST (Optionally)
