const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const glob = require('glob');
// const components = require('./components.json');

const components = glob.sync('../src/components/**/*.ts').reduce((entries, p) => {
  const name = path.parse(p).dir.split('/').pop();
  // const name = path.basename(p, '.ts');
  return { ...entries, [name]: `${p}` };
}, {});

function buildCss(cb) {
  gulp.src('../src/styles/index.scss', { allowEmpty: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('../lib/styles'));
  cb();
}

console.log(components);
function buildSeperateCss(cb) {
  Object.keys(components).forEach((compName) => {
    gulp.src(`../src/styles/${compName}.scss`, { allowEmpty: true })
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename(`${compName}.css`))
      .pipe(gulp.dest('../lib/styles'));
  });

  cb();
}

exports.default = gulp.series(buildCss, buildSeperateCss);
