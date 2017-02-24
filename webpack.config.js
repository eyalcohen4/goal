var path = require('path');
var Dotenv = require('dotenv-webpack');
 
module.exports = {

  entry: ['babel-polyfill', path.resolve(__dirname, "./src/cli")],

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "bundle.js", // string
    // the filename template for entry chunks

    publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "./src")
        ],
        exclude: [
          'node_modules'
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        // conditions for the issuer (the origin of the import)

        // flags to apply these rules, even if they are overridden (advanced option)

        loader: "babel-loader",
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ["es2015"]
        },
        // options for the loader
      },

      { rules: [ /* rules */ ] }
    ],

    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "./src")
    ],

    extensions: [".js", ".json"],
    alias: {
      "module": path.resolve(__dirname, "app/third/module.js"),
    },
  },

  performance: {
    hints: false, // enum
  },

  devtool: "source-map", // enum

  context: path.resolve(__dirname, './src'), // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "node", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: "normal",
  // lets you precisely control what bundle information gets displayed

  devServer: {
    /* TODO */
  },

  plugins: [
    new Dotenv()
  ],



  cache: false, // boolean

  watch: true, // boolean


  node: {
    /* TODO */
  },

}