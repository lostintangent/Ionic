var gulp = require("gulp"),
    gutil = require("gulp-util"),
    concat = require("gulp-concat"),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    karma = require("karma").server,
    sauceConnect = require("sauce-connect-launcher"),
    ngAnnotate = require("gulp-ng-annotate"),
    uglify = require("gulp-uglify"),
    tslint = require("gulp-tslint"),
    templateCache = require("gulp-angular-templatecache"),
    htmlMin = require("gulp-htmlmin");

var paths = {
  lib: ["./src/lib/*.js"],
  sass: ["./src/scss/**/*.scss"],
  html: ["./src/*.html"],
  images: ["./src/images/*.png"],
  templates: ["./src/templates/*.html"],
  ts: ["./src/ts/App.d.ts", "./src/ts/*.service.ts", "./src/ts/*.controller.ts", "./src/ts/Inventory.ts"]
};

gulp.task("default", ["build"]);

gulp.task("build", ["sass", "ts", "images", "html", "templates", "lib"]);

gulp.task("watch", function () {
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.ts, ["ts"]);
});

gulp.task("sass", function () {
  return (
    gulp.src(paths.sass)
      .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCss())
      .pipe(sourcemaps.write())
    .pipe(gulp.dest("./www/css/"))
  );
});

var project = ts.createProject({
    target: "ES5",
    sortOutput: true
});

gulp.task("ts", function () {
  return (
    gulp.src(paths.ts)
      .pipe(tslint())
      .pipe(tslint.report("prose"))
      .pipe(sourcemaps.init())
        .pipe(ts(project))
        .pipe(ngAnnotate({ remove: true, add: true, single_quotes: false }))
        .pipe(concat("App.js"))
        .pipe(uglify({ mangle: false }))
      .pipe(sourcemaps.write())
    .pipe(gulp.dest("./www/js"))
  );
});

gulp.task("templates", function () {
  return (
    gulp.src(paths.html)
      .pipe(htmlMin({
        collapseWhitespace: true
      }))
      .pipe(templateCache({
        standalone: true,
        module: "TemplateCache"
      }))
    .pipe(gulp.dest("./www/js"))
  );
});

gulp.task("images", function () {
  return (
    gulp.src(paths.images)
    .pipe(gulp.dest("./www/img"))
  )
});

gulp.task("html", function () {
  return (
    gulp.src(paths.html)
    .pipe(gulp.dest("./www"))
  )
});

gulp.task("lib", function () {
  return (
    gulp.src(paths.lib)
    .pipe(gulp.dest("./www/lib"))
  )
});

gulp.task("test", function (done) {
  karma.start({
    configFile: __dirname + "/karma.conf.js"
  }, done);
});

gulp.task("e2e", function (done) {
  var server = require("child_process")
               .spawn("ionic", ["serve", "--nobrowser"],
                   { cwd: __dirname, stdio: "inherit" });

  setTimeout(function () {
      sh.exec("protractor", function () {
          server.kill();
          done();
      });
  }, 6000);
});

gulp.task("e2e:sauce", function (done) {
  var server = require("child_process")
               .spawn("ionic", ["serve", "--nobrowser"],
                   { cwd: __dirname, stdio: "inherit" });

  sauceConnect({ username: "joncart", accessKey: "51bea282-6ae5-4388-a717-8d0c6ff34670" }, function (error, sauceConnectProcess) {
    sh.exec("protractor", function () {
        server.kill();
        sauceConnectProcess.close();
        done();
    });
  })
});