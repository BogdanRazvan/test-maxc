# Maxcomply - Frontend

Internal library of shared Vue 3 components, utils, helpers and so on to be used across various internal Maxcomply frontend projects.

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Usage

First install the library using your prefered package manager

```bash
yarn add @maxcomply/frontend
```

then you can import the available components like so

```vue
import { BtnGeneric } from '@maxcomply/frontend'
```

## Available commands

Here is a list of all available npm commands.

**Dev server**

Start Vite dev server in the current directory. Will enter the watch mode in development environment and run mode in CI automatically.

```bash
yarn dev
```

**Developing in Storybook locally**

Start storybook, it will read your story files and display them on port 40969.

```bash
yarn storybook:sslfallback:host
```

This url should work for you, just replace your dev initials:

http://sandbox.maxcomply.dev[initials]:40969/

Note: you may find that the port is inaccessible from outside your VM. If this is the case, run:
```bash
sudo ufw allow 40969
```

Note: this requires your /usr/local/bin/command.conf to be configured correctly.

**Building the library**

Build for production.

```bash
yarn build
```

Build for production with development flag

```bash
yarn build:dev
```

Build for production with sourcemaps

```bash
yarn build:sourcemap
```

Build for production with development flag and sourcemaps

```bash
yarn build:dev:sourcemap
```

**Previewing the library**

Locally preview production build.

```bash
yarn preview
```

**Optimise**

Pre-bundle dependencies.

```bash
yarn optimise
```

**Analyzing bundle sizes with [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**

```bash
yarn analyze
```

**Bundling/packaging the library**

Install dependencies, build the lib, and package into tarball for use in other projects

```bash
yarn bundle
```

Build the lib without reinstalling dependencies, and package into tarball for use in other projects

```bash
yarn bundle:simple
```

Build the lib without reinstalling dependencies and in development mode, and package into tarball for use in other projects

```bash
yarn bundle:dev
```

**Linting**


Lint JS & Vue

```bash
yarn lint
```

Lint Styles

```bash
yarn lint:styles
```

Lint JS, Vue, & Styles

```bash
yarn lint:all
```

**Testing the library**

Run unit tests

```bash
yarn test:unit
```

Run unit tests with coverage

```bash
yarn test:unit:coverage
```

Run unit tests with ui

```bash
yarn test:unit:ui
```

## PR Creation

**Linting**

You must lint before creating a PR:

```bash
yarn lint:all
```
**Unit Tests**

You must add tests for components. Your tests should all pass.

Run tests with the following command:

```bash
yarn test:unit
```

**Storybook Stories**

It's recommended that if you add a new group of components, you add a [group].stories.mdx file in the directory with some info about the group of components.

For each component, if it's something that's visual, or easily demonstratable, e.g. an input, please create a [component].stories.js file. Not only does this document our components, it makes the available components immediately transparent to newcomers and details the options available within.