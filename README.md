# Frontend for [tomaarsen.com](https://www.tomaarsen.com)

This frontend dynamically fetches all public GitHub repositories to be displayed on [tomaarsen.com](https://www.tomaarsen.com). Beyond that, my [Inflex](https://github.com/tomaarsen/Inflex) project is extensively shown off, through [performance graphs](https://www.tomaarsen.com/projects/inflex/performance) as well as a page that allows visitors to [try it out](https://www.tomaarsen.com/projects/inflex/try), and compare it against alternative Python modules.

Additionally, the frontend showcases my [module_dependencies](https://github.com/tomaarsen/module_dependencies) project by showing outputs when executed on [nltk](https://github.com/nltk/nltk). In particular, the frontend shows a [sunburst graph](https://www.tomaarsen.com/projects/nltk/usage/plot) and a [list](https://www.tomaarsen.com/projects/nltk/usage/list) showing how frequently code objects from nltk are used in open-source projects on GitHub.

This frontend relies on the API from [tomaarsen.com-backend](https://github.com/tomaarsen/tomaarsen.com-backend) to provide the data required to showcase `Inflex` and `module_dependencies`.

---

To make changes to this frontend, it is recommended to run `yarn start` to create a development build that updates on the fly. For production, `yarn build` should be used to create a production-ready build. Once built, this frontend is deployed in production using nginx.
