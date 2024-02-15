const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const eslint = require("gulp-eslint");

function generateHTML(cb) {
  src("./views/index.ejs")
    .pipe(
      ejs({
        title: "Hello Semaphore!",
      })
    )
    .pipe(
      rename({
        extname: ".html",
      })
    )
    .pipe(dest("public"));
  cb();
}

exports.html = generateHTML;

function runLinter(cb) {
  return src(["**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on("end", function () {
      cb();
    });
}

exports.lint = runLinter;

async function generateCSS(cb) {
  src("./sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("public/stylesheets"));
  cb();
}

function copy(cb) {
  src("routes/*.js").pipe(dest("copies"));
  cb();
}

exports.copy = copy;

exports.css = generateCSS;

const sync = require("browser-sync").create();

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./public",
    },
  });
  watch("views/**.ejs", generateHTML);
  watch("sass/**.scss", generateCSS);
  watch("./public/**").on("change", sync.reload);
}

exports.sync = browserSync;
