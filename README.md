# [Stabilite Frontend](https://app.stabilite.money/)

This is the front-end repo for Stabilite.

## 🔧 Setting up Local Development

Required:

- [Node v14](https://nodejs.org/download/release/latest-v14.x/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)

```bash
git clone https://github.com/Stabilite-Money/stabilite-frontend.git
cd stabilite-frontend
yarn install
npm run start
```

The site is now running at `http://localhost:3000`!
Open the source code and start editing!

**Pull Requests**:
Each PR into master will get its own custom URL that is visible on the PR page. QA & validate changes on that URL before merging into the deploy branch.

## 👏🏽 Contributing Guidelines

We keep an updated list of bugs/feature requests in [Github Issues](https://github.com/Stabilite-Money/stabilite-frontend/issues).

![GitHub issues](https://github.com/Stabilite-Money/stabilite-frontend/issues?style=flat-square)

Filter by ["good first issue"](https://github.com/Stabilite-Money/stabilite-frontend/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) to get your feet wet!
Once you submit a PR, our CI will generate a temporary testing URL where you can validate your changes. Tag any of the gatekeepers on the review to merge them into master.

_**NOTE**_: For big changes associated with feature releases/milestones, they will be merged onto the `develop` branch for more thorough QA before a final merge to `master`
