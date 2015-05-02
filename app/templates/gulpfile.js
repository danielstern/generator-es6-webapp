/*global -$ */
'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('preflight',['eslint']);

gulp.task('eslint', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.eslint())
        .pipe(reload({stream: true, once: true}))
        /* Outputs hinting to console */
        .pipe($.eslint.format())
				//.pipe($.if(!browserSync.active, $.eslint.failOnError()))
});

gulp.task('produce',['wiredep','es6','less','images','fonts']);

gulp.task('package',['html'])

gulp.task('less', function () {
  return gulp.src('app/styles/*.less')
    .pipe($.less())
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('es6', ['eslint'], function () {
	browserify({
		entries:'./app/scripts/main.js',
		debug:true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('app.js'))
	.pipe(gulp.dest('./tmp'));
});


gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: ['.tmp']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['produce'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.<%= includeLess ? 'less' : 'css' %>', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('app/scripts/**/*.js', ['es6']);
});

gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', function () {
  browserSync({
    notify: false,
    open: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test'
    }
  });

  gulp.watch([
    'test/spec/**/*.js',
  ]).on('change', reload);

});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

	gulp.src('app/*.html')
    .pipe(wiredep({
//      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['eslint', 'es6', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
