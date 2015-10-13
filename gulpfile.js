var gulp = require("gulp"),
    sh = require("shelljs"),
    sourcemaps = require("gulp-sourcemaps"),
    ts = require("gulp-typescript");
    
var paths = {
  lib: ["./src/lib/*.js"],
  sass: ["./src/scss/**/*.scss"],
  html: ["./src/*.html"],
  images: ["./src/images/*.png"],
  templates: ["./src/templates/*.html"],
  ts: ["./src/ts/App.d.ts", "./src/ts/*.service.ts", "./src/ts/*.controller.ts", "./src/ts/Inventory.ts"]
};

gulp.task("build", ["sass", "ts", "images", "html", "templates", "lib"]);
gulp.task("default", ["build"]);

gulp.task("watch", function () {
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.ts, ["ts"]);
  gulp.watch(paths.html, ["html"]);
});

gulp.task("sass", function () {
  var sass = require("gulp-sass"),
    minifyCss = require("gulp-minify-css");

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
  var concat = require("gulp-concat"),
      ngAnnotate = require("gulp-ng-annotate"),
      uglify = require("gulp-uglify"),
      tslint = require("gulp-tslint");

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
  var htmlMin = require("gulp-htmlmin"),
    templateCache = require("gulp-angular-templatecache");

  return (
    gulp.src(paths.templates)
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
  var Server = require("karma").Server;
  var server = new Server({ configFile: __dirname + "/karma.conf.js"}, done);
  server.start();
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
  // Spin up an instance of the Ionic
  // integrated server for our session to request
  var server = require("child_process")
               .spawn("ionic", ["serve", "--nobrowser"],
                   { cwd: __dirname, stdio: "inherit" });

  var sauceConnect = require("sauce-connect-launcher");

  // Initialize a new SauceConnect tunnel so that the remote
  // instance can successfully request our local server
  sauceConnect({ username: "joncart", accessKey: "51bea282-6ae5-4388-a717-8d0c6ff34670" }, function (error, sauceConnectProcess) {
    // Initialize protractor, which will
    // kick off our test suite
    sh.exec("protractor", function () {
        server.kill();
        sauceConnectProcess.close();
        done();
    });
  });
});