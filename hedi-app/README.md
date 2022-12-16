# HEDI App

HEDI App web server and client

## Installation / Development

* git
* nodejs v.14
* yarn version 1
* typescript 4.3.5 

### optional

* VSCode
* VS Code extensions:
  * prettier plugin `esbenp.prettier-vscode`
  * TODO tree `gruntfuggly.todo-tree`

### run

`package.json` defines some yarn scripts
main ones are:
* `yarn view`
* `yarn dev` (scss & ts)
* `yarn debug` (ts)

`launch.json` defines attach and launch

## Structure

### modules
functionality is split up into **modules** as far as possible, see `./modules`

code which is required by multiple modules should be refactored into `./common`

### routes / URLs

since `./pages` represents the public routing / url path segment, a human sensible naming and placement should be picked, even if it compromises module separation.

### imports 
in [`tsconfig.json`](./tsconfig.json) you can configure alias routes.
[Source](https://medium.com/@benjaminwfox/next-js-setup-config-for-testing-linting-and-absolute-imports-605959d7bd6f)

### api

`./pages/api/*` since this is not meant as an api for third party intergration but just as means of communication between HEDI client and server, the path segemnts can easily stick to module naming convention

## Internationalization

Configuring the available languages and add autodetection is available in the file `next.config.js`.
To link language aware to a site with self slug, use the `next/link` component.

For different slugs, we have to build our own resolver.

You can use `import {useRouter} from 'next/router'` to get locale, locales, defaultLocale on the site.
See [here](./pages/index.tsx)