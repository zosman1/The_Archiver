# The_Archiver [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> The Archiver


## Dev
to install dependencies:
```
$ npm install
```

#### Linting
We have two functions for the linter.
This one tests for improper syntax:
```
npm test
```
And this, according to xo can fix most erros that come up during testing
```
npm run fix
```

### Run

```
$ npm start
```

### Build

```
$ npm run build
```


Builds the app for macOS, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).

The commands use a bind in the package.json with the prefix `./node_modules/.bin/`

If any commands are not working for you make sure your using `npm run ___` and not just `npm ___`
## License

MIT © [<%= name %>](<%= website %>)
