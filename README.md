<div align="center">
  <picture style="display: flex; flex-direction: column; align-items: center;">
    <source src="./static/addon-example.avif" type="image/avif" />
    <img style="border-radius: 1rem;"
      src="./static/addon-example.png"
      alt="Example of the addon in use, showing a status page for components published on a Figma file."
      loading="lazy"
      decoding="async"
      height="247"
    />
  </picture>

  <h1>Storybook Addon - Figma Status Sync</h1>
  
  <p>
    This addon translates status information fetches from published components in a Figma component library that use a <a href="TODO">companion Figma community file</a> into <a href="https://storybook.js.org/docs/writing-stories/tags">tags</a> for your stories, and provides you with an automatically-generated component status page.
  </p>

  <p>
    <img src="https://img.shields.io/badge/status-experimental-c74c1e" alt="Status: Experimental" />
    <a href="https://github.com/pvignau/storybook-figma-status-sync/commits"><img src="https://img.shields.io/github/commit-activity/m/pvignau/storybook-figma-status-sync" alt="commit activity" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/commits"><img src="https://img.shields.io/github/last-commit/pvignau/storybook-figma-status-sync" alt="last commit" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/issues/"><img src="https://img.shields.io/github/issues/pvignau/storybook-figma-status-sync" alt="open issues" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/actions/workflows/github-code-scanning/codeql"><img src="https://github.com/pvignau/storybook-figma-status-sync/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main" alt="CodeQL status" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/actions/workflows/continuous-integration.yml"><img src="https://github.com/pvignau/storybook-figma-status-sync/actions/workflows/continuous-integration.yml/badge.svg?branch=main" alt="CI status" /></a>
    <a href="https://codecov.io/gh/pvignau/storybook-figma-status-sync"><img src="https://codecov.io/gh/pvignau/storybook-figma-status-sync/graph/badge.svg?token=4SX3N57XH3" alt="code coverage" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/graphs/contributors"><img src="https://img.shields.io/github/contributors/pvignau/storybook-figma-status-sync" alt="contributors" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/blob/main/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="code of conduct: contributor covenant 2.1" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/blob/main/LICENSE"><img src="https://img.shields.io/github/license/pvignau/storybook-figma-status-sync.svg" alt="license" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/network/members"><img src="https://img.shields.io/github/forks/pvignau/storybook-figma-status-sync" alt="forks" /></a>
    <a href="https://github.com/pvignau/storybook-figma-status-sync/stargazers"><img src="https://img.shields.io/github/stars/pvignau/storybook-figma-status-sync" alt="stars" /></a>
  </p>
</div>

---

## 📔 Table of Contents

<!-- no toc -->
- [Table of Contents](#-table-of-contents)
- [Installation](#-installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Support](#-support)
- [Contact](#️-contact)
- [Acknowledgments](#-acknowledgments)

## 📦 Installation

```sh
yarn add -D storybook-addon-figma-status-sync
```

```sh
npm install -D storybook-addon-figma-status-sync
```

```sh
pnpm install -D storybook-addon-figma-status-sync
```

In your `.storybook/main.ts` file, add the following:

```ts
// .storybook/main.ts
export default {
  addons: [
    // ...
    // Put this last to ensure it overrides all indexers from all other addons.
    'storybook-addon-figma-status-sync',
  ],
}
```

> [!CAUTION]
> TODO continue instructions

## 👀 Usage

> [!CAUTION]
> TODO

## Roadmap

> [!TIP]
> * Add option to transform indexed entries and inject tags based on data
> * Provide default option matching our needs
> 

## 👩🏽‍💻 Contributing

### Code of Conduct

Please read the [Code of Conduct](https://github.com/pvignau/storybook-figma-status-sync/blob/main/CODE_OF_CONDUCT.md) first.

### Developer Certificate of Origin

To ensure that contributors are legally allowed to share the content they contribute under the license terms of this project, contributors must adhere to the [Developer Certificate of Origin](https://developercertificate.org/) (DCO). All contributions made must be signed to satisfy the DCO. This is handled by a Pull Request check.

> By signing your commits, you attest to the following:
>
> 1. The contribution was created in whole or in part by you and you have the right to submit it under the open source license indicated in the file; or
> 2. The contribution is based upon previous work that, to the best of your knowledge, is covered under an appropriate open source license and you have the right under that license to submit that work with modifications, whether created in whole or in part by you, under the same open source license (unless you are permitted to submit under a different license), as indicated in the file; or
> 3. The contribution was provided directly to you by some other person who certified 1., 2. or 3. and you have not modified it.
> 4. You understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information you submit with it, including your sign-off) is maintained indefinitely and may be redistributed consistent with this project or the open source license(s) involved.

### Getting Started

This project uses PNPM as a package manager.

- See the [installation instructions for PNPM](https://pnpm.io/installation)
- Run `pnpm i`

### Useful commands

- `pnpm start` starts the local Storybook
- `pnpm build` builds and packages the addon code
- `pnpm pack:local` makes a local tarball to be used as a NPM dependency elsewhere
- `pnpm test` runs unit tests

### Migrating to a later Storybook version

If you want to migrate the addon to support the latest version of Storyboook, you can check out the [addon migration guide](https://storybook.js.org/docs/addons/addon-migration-guide).

### Release System

This package auto-releases on pushes to `main` with [semantic-release](https://github.com/semantic-release/semantic-release). No changelog is maintained and the version number in `package.json` is not synchronised.

## 🆘 Support

Please [open an issue](https://github.com/pvignau/storybook-figma-status-sync/issues/new) for bug reports or code suggestions. Make sure to include a working Minimal Working Example for bug reports. You may use [storybook.new](https://new-storybook.netlify.app/) to bootstrap a reproduction environment.

## ✉️ Contact

* Pierre-Yves Vignau · `@pyve__` on the [Storybook Discord](https://discord.gg/storybook) - [LinkedIn](https://www.linkedin.com/in/pierre-yves-vignau-a99a9424/)
* Steve Dodier-Lazaro · `@Frog` on the [Storybook Discord](https://discord.gg/storybook) - [LinkedIn](https://www.linkedin.com/in/stevedodierlazaro/)

Project Link: [https://github.com/pvignau/storybook-figma-status-sync](https://github.com/pvignau/storybook-figma-status-sync)

## 💛 Acknowledgments

### Thanks

- [Michael Shilman](https://github.com/shilman) for his help with addon internals

### Built With

[![Dependabot](https://img.shields.io/badge/Dependabot-025E8C?logo=dependabot&logoColor=white)](https://github.com/dependabot)
[![ESLint](https://img.shields.io/badge/ESLint-4b32c3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Figma](https://img.shields.io/badge/Figma-a259ff?logo=figma&logoColor=white)](https://github.com/figma/rest-api-spec/)
[![GitHub](https://img.shields.io/badge/GitHub-0d1117?logo=github&logoColor=white)](https://github.com/solutions/ci-cd)
[![Prettier](https://img.shields.io/badge/Prettier-f8bc45?logo=prettier&logoColor=black)](https://prettier.io/)
[![Semantic-Release](https://img.shields.io/badge/semantic--release-cccccc?logo=semantic-release&logoColor=black)](https://github.com/semantic-release/semantic-release)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.js.org/)
[![tsup](https://img.shields.io/badge/tsup-fde047)](https://tsup.egoist.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-acd268?logo=vitest&logoColor=black)](https://https://vitest.dev/)
