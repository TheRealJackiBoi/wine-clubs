# Platform template (medium)
This repo contains a template for setting up a NextJS platform, which will serve as both frontend and backend. The 
repository includes code for running a simple todo list, for inspiration of how to work with NextJS.

## Prerequisties
To work with this repository, the following tools are required.

- [Docker](https://docs.docker.com/desktop/install/mac-install/) - must be installed and running
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) - must be globally available
- [NodeJS](https://nodejs.org/en/download/package-manager#macos)

# Getting started
> __TODO__: List the instructions of what to do, when scaffolding from this repository. Create script maybe?

## First-time setup

Before starting the project for the first time, run:

```bash
yarn init:env
```

This will prepare a .env in the app directory.  
Next, install all packages by running:

```bash
yarn install:all
```

## Running the project
### Visual Studio Code
To start the project, press <kbd>SHIFT</kbd> + <kbd>CMD</kbd> + <kbd>P</kbd> and type `Tasks: Run Task`, press enter and select `Run`.

### Terminal
```bash
yarn start:database
yarn prisma:studio
yarn start:app
```

## Database Migrations
Run the Prisma migrations by running

```bash
yarn prisma:migrate
```

You can now open the app at http://localhost:3000

## Development Environment
For development purposes, the repo serves a Postgres database through Docker. Prisma is used as ORM, which with Prisma 
Studio provides a database administration tool. Prisma Studio is available on http://localhost:5555.

The application is available at http://localhost:3000.

### Seeding the database
To seed the database with development data, run the following command:

```bash
yarn prisma:seed
```

You can now authenticate with `admin@kvalifik.dk`, password: `admin`

__Note: When you change the database model, you need to reload the Prisma Studio process__

# App

The app is built on the following technologies:

- [NextJS](https://nextjs.org/)
- [React Query](https://tanstack.com/query/v3/)
- [Chakra-UI](https://chakra-ui.com/)
- [Formik](https://formik.org/)
- [Auth.js](https://auth.js.org/)

## Folder and file layout

Source code for the app is found inside `src`:

- `./src/app`: This is where all the public available routes and their layout are defined. 
- `./src/components`: This is where all custom components are defined.  
Note that theres a shift in the NextJS layout where components are more self-contained and stored inside an `app/ui` folder, next to the routes. This seems confusing, and we do not follwo this pattern just yet.
- `./src/hooks`: Place your application wide custom hooks in here.
- `./src/lib`: Place your specific application wide custom algorithms in here.
- `./src/lib/actions.ts`: Place your application wide server actions in here.
- `./src/lib/data.ts`: Place your application wide data-fetching functions in here.
- `./src/lib/definitions.ts`: Place your application wide TypeScript definitions in here.
- `./src/styles`: Place your custom styling in here.

### Components
Components should be as self-contained as possible. Therefore, anything that are relevant for only the specific 
component should be located inside that component:
- `./src/components/<COMPONENT_NAME>/hooks`: Place your component specific custom hooks in here.
- `./src/components/<COMPONENT_NAME>/lib`: Place your component specific custom algorithms in here.
- `./src/components/<COMPONENT_NAME>/lib/actions.ts`: Place your component specific server actions in here.
- `./src/components/<COMPONENT_NAME>/lib/data.ts`: Place your component specific data-fetching functions in here.
- `./src/components/<COMPONENT_NAME>/lib/definitions.ts`: Place your component specific TypeScript definitions in here.

## Testing
It's mandatory to write automated tests for any business logic. Read more about how we do software testing at Kvalifik 
in the [Kvalifik Developers Handbook](https://github.com/Kvalifik/developers-handbook)

- End-2-End tests  
__Cypress__ is used for end-2-end tests. These test are located in `cypress/e2e`.
- Components tests  
__Cypress__ is also used for doing component tests. These will be located next to the component they are testing, ie. `src/components/todo-list/FormikButton.cy.tsx`.
- Integration tests  
__Jest__ is used for integration tests, and these are located next to the specific routes they are testing, ie. `src/app/api/users/route.test.ts`
- Unit tests  
__Jest__ is also used for unit tests, and the tests are located next to the files they test, ie. `src/lib/utils.test.ts`

## Convenience Scripts

The frontend contains scripts to create pages and components.

### Pages
Pages should contain all the logic and do the fetching. The page should also contain as little UI as possible - this should be on a component level.

To create a new page:

```
yarn create:page page-name
```

If the page should be restricted to authenticated users:

```
yarn create:page page-name auth
```

### Components
Components should be as reusable as possible, and primarly consist of UI.

To create a new component:
```
yarn create:component ComponentName
```

If the component should be placed in a specific category-directory:

```
yarn create:component ComponentName CategoryName
```

# TODO:
- Setup Github Actions to run all test types
- Make API testing work with Jest.
- Make documentation, possible a script, about setting up Vercel.
- Review and possible rewrite the convenience scripts
