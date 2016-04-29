'use strict';
 
var gulp = require('gulp'),
    template = require('gulp-template'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*', 'del'],
        replaceString: /\bgulp[\-.]/
    }),
    flags = { release: false },
    paths = {
        sass: '../src/scss/style.scss',
        styles: '../src/scss/**/*.scss',
        scripts: '../src/js/*.js',
        statickinect: '../src/js/static/kinect.js',
        libs: [
            'node_modules/jquery/dist/jquery.min.js',
            '../src/libs/jquery.collision.js',
            '../src/libs/timeout.js',
            'node_modules/gsap/src/minified/TweenMax.min.js'
        ],
        images:  '../src/images/*.+(jpg|png|gif)',
        svg:     {
            inline: '../src/images/svg/inline/*.svg',
            sprite: '../src/images/svg/sprite/*.svg',
            nomin:  '../src/images/svg/nomin/*.svg'
        },
        html:    '../public/*.html',
        src:     '../src',
        dest:    '../public',
        destImages:    '../images'
    };


gulp.task('template', function () {

    var 
    handOpenSvg = fs.readFileSync(paths.dest+'/images/hand01.svg', "utf8"),
    handClosedSvg = fs.readFileSync(paths.dest+'/images/hand02.svg', "utf8");

    return gulp.src(paths.src+'/index.html')

        .pipe(template({
            handOpenSvg: handOpenSvg,
            handClosedSvg: handClosedSvg
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(plugins.notify('template compiled!'));
});


gulp.task('styles', function() {
    return gulp.src(paths.sass)
        .pipe(plugins.if(!flags.release, plugins.sourcemaps.init()))
        .pipe(plugins.sass({ outputStyle: 'compressed' }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.if(!flags.release, plugins.sourcemaps.write()))
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.dest+'/css'))
        .pipe(plugins.notify('Styles ready!'));
});


gulp.task('libs', function() {
    return gulp.src(paths.libs)
        .pipe(plugins.concat('libs.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(plugins.notify('Libs ready!'));
});


gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.if(!flags.release, plugins.sourcemaps.init()))
        .pipe(plugins.concat('scripts.js'))
        .pipe(plugins.if(flags.release, plugins.stripDebug()))
        .pipe(plugins.uglify())
        .pipe(plugins.if(!flags.release, plugins.sourcemaps.write()))
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(plugins.notify('Scripts compiled!'));
});



gulp.task('statickinect', function() {
    return gulp.src(paths.statickinect)
        //.pipe(plugins.uglify())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.dest+'/js'))
        .pipe(plugins.notify('Kinect compiled!'));
});



gulp.task('imagemin', function() {
    return gulp.src(paths.images)
        .pipe(plugins.newer(paths.dest+'/images/'))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(paths.dest+'/images/'))
        .pipe(plugins.notify({ message: 'Images minified successfuly!', onLast: true }));
});


gulp.task('svgmin', function() {
    return gulp.src(paths.svg.inline)
        .pipe(plugins.newer(paths.dest+'/images'))
        .pipe(plugins.svgmin({ plugins:
        [
            { removeAttrs: { attrs: []  }  },
            { removeEmptyAttrs: false },
            { removeUselessStrokeAndFill: {
                    stroke: false,
                    fill: false
                }
            }, 
            { convertColors: {
                    names2hex: false,
                    rgb2hex: false,
                    shorthex: false,
                    shortname: false
                }
            }
            ]
        }))
        .pipe(gulp.dest(paths.dest+'/images/'))
        .pipe(plugins.notify({ message: 'SVG minified successfuly!', onLast: true }));
});


gulp.task('svgnomin', function() {
    return gulp.src(paths.svg.nomin)
        .pipe(plugins.newer(paths.dest+'/images'))
        .pipe(gulp.dest(paths.dest+'/images/'))
        .pipe(plugins.notify({ message: 'SVG no-min copied successfuly!', onLast: true }));
});


gulp.task('svgstore', function () {
    return gulp
        .src(paths.svg.sprite)
        .pipe(plugins.svgmin())
        .pipe(plugins.rename({prefix: 'sprite-'}))
        .pipe(plugins.svgstore({ fileName: 'sprite.svg', inlineSvg: true}))
        .pipe(gulp.dest(paths.dest+'/images/'))
        .pipe(plugins.notify({ message: 'SVG sprite created!', onLast: true }));
});


gulp.task('svginline', function() {
    plugins.util.log('svginline!');
    gulp.start('svgmin', 'svgnomin');
});

gulp.task('svgsprite', function() {
    gulp.start('svgstore');
});


gulp.task('images', function(callback) {
    runSequence('cleanImages', 'imagemin', 'svgnomin', 'svgmin', 'svgstore', 'template', callback);
});


gulp.task('cleanImages', function() {
    plugins.del([paths.dest+'/images'], {
        force: true
    });
});

gulp.task('clean', function() {
    return plugins.del([
        paths.dest+'/css',
        paths.dest+'/js',
        paths.dest+'/fonts',
        paths.dest+'/images'
    ], {
        force: true
    });
});


gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.statickinect, ['statickinect']);
    gulp.watch(paths.images, ['imagemin']);
    gulp.watch(paths.svg.inline, ['svginline']);
    gulp.watch(paths.svg.sprite, ['svgsprite']);
    gulp.watch(paths.svg.nomin, ['svgnomin']);
    gulp.watch(paths.src+'/*', ['template']);
});


gulp.task('reset', function() {
    flags.release = false;
});


gulp.task('release', function() {
    flags.release = true;
    gulp.run('default');
});


gulp.task('default', function() {
    runSequence('styles', 'libs', 'scripts', 'statickinect', 'images', 'reset', 'template');
});
