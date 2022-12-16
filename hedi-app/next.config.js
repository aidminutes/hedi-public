const IS_DEVELOPING_WITH_IE11 = false; // turn on this flag, if you want to develop on IE11

// In order to support IE11, we have to transpile some modules...
let withTM = require('next-transpile-modules')(['next-auth', 'matrix-js-sdk', 'p-retry', 'flatpickr']);

if (process.env.NODE_ENV === 'development' && !IS_DEVELOPING_WITH_IE11) {
  // Do not use next-transpile-modules in development mode (needs to be enabled if you want to develop in IE11)
  withTM = c => c
}

module.exports = withTM({
  i18n: {
    // These are all the locales you want to support in
    // your application
    // HACK do not forget to add to `landingPagePaths` too
    locales: ["de", "en", "fa", "fr", "uk"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "de",
  },
  images: {
    domains: [
      "assets.hedi.app",
      "assets.projekt-hedi.de",
      "testassets.projekt-hedi.de",
      "assets.hedi.localhost",
    ],
  },
  // ES Module Support
  // needed as long as we have packages incompatible with es modules
  experimental: {
    esmExternals: false,
  },
  webpack: function (config) {
    const originalEntry = config.entry;

    config.entry = async () => {
      const entries = await originalEntry();

      if (
          entries["main.js"] &&
          !entries["main.js"].includes("./src/polyfills.js")
      ) {
        entries["main.js"].unshift("./src/polyfills.js");
      }
      return entries;
    };

    const originalOutput = config.output;
    config.output = {
      ...originalOutput,
      environment: {
        // The environment supports arrow functions ('() => { ... }').
        arrowFunction: false,
        // The environment supports BigInt as literal (123n).
        bigIntLiteral: false,
        // The environment supports const and let for variable declarations.
        const: false,
        // The environment supports destructuring ('{ a, b } = obj').
        destructuring: false,
        // The environment supports an async import() function to import EcmaScript modules.
        dynamicImport: false,
        // The environment supports 'for of' iteration ('for (const x of array) { ... }').
        forOf: false,
        // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
        module: false,
      }
    }

    return config;
  },
});
