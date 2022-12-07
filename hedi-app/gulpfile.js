// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
// Importing all the Gulp-related packages we want to use
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// File paths
const files = {
  scssPath: "scss/styles.scss",
  themePath: "scss/**/*.scss",

};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass({ includePaths: ["node_modules"] })) // compile SCSS to CSS
    .pipe(postcss([autoprefixer()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest("pages")); // put final CSS in root/pages folder
}
// Watch task: watch SCSS for changes
// If any change, run scss tasks
function watchTask() {
  watch(
    [files.themePath],
    { interval: 1000, usePolling: true }, //Makes docker work
    series(parallel(scssTask))
  );
}

// Export the default Gulp task so it can be run
exports.scss = series(scssTask);
// Runs the scss and then watch task
exports.default = series(parallel(scssTask), watchTask);