var gulp = require('gulp')

//var request = require('request')

var clean = require('gulp-clean')
var tap = require('gulp-tap')

gulp.task('clean', function () {
    //This cleans out all the contents of the dist folder
    return gulp.src(['dist'], {read: false})
        //.pipe(tap(function(file,t) { console.log(file.path) }))
        .pipe(clean());
});
gulp.task('copyComponents',['clean'],function(){
    //This will copy anything in the src folder except for the components folder
    //The custom components will be built by Babel
    return gulp.src(['src/**/*', '!src/components/**/*'])
        .pipe(tap(function(file,t) { console.log(file.path) }))
        .pipe(gulp.dest('dist'));
})

gulp.task('copyBower',['clean'],function(){
    return gulp.src(['bower_components/**/*'])
        .pipe(gulp.dest('dist/bower_components'));
})

gulp.task('crisper',['copyComponents','copyBower'], function() {
    var crisper = require('gulp-crisper')
    return gulp.src('src/components/*.html')
        .pipe(tap(function(file,t) { console.log(file.path) }))
        .pipe(crisper({
            scriptInHead: false, // true is default 
            onlySplit: false
        }))
        .pipe(gulp.dest('dist/components'));
});

gulp.task('babelify',['crisper'], function() {
    var babel = require('gulp-babel')
    return gulp.src('dist/components/*.js')
        .pipe(tap(function(file,t) { console.log(file.path) }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/components'));
});

gulp.task('vulcanize',['crisper','babelify','copyBower'], function() {
    //Vulcanize selected files for optimization
    var vulcanize = require('gulp-vulcanize')
    return gulp.src(['dist/components/icon-toggle.html'])
        .pipe(vulcanize({
            excludes: ['dist/bower_components/polymer/polymer.html'],
            stripExcludes: false,
            stripComments : true,
            inlineScripts: true
            //abspath: '',
            //excludes: [],
            //stripExcludes: false,
            //inlineScripts: false
        }))
        .pipe(gulp.dest('dist/components'))
        .pipe(tap(function(file,t) {
            //Remove associating javascript file
            var javascriptPath = file.path.replace('.html','.js')
            console.log(javascriptPath)
            return gulp.src(javascriptPath, {read: false}).pipe(clean())
        }));
});


gulp.task('app-get-bower', function(){
    var bower = require('gulp-bower')
    return gulp.src([
        'bower_components/app-layout/bower.json',
        'bower_components/app-layout/*/*/bower.json',
        '!bower_components/app-layout/**/bower_components/*/bower.json'])
        .pipe(tap(function(file,t) { 
            var directory = file.path.replace('\\bower.json','')            
            process.chdir(directory)
            
            if (file.path.endsWith('bower_components\\app-layout\\bower.json'))
                return bower('../')
            else {
                return bower()
            }
        }))
})
gulp.task('app',['app-get-bower'])

gulp.task('build', ['crisper','babelify','vulcanize']);
gulp.task('serve', require('gulp-serve')({
    root: ['dist'],
    middleware : function(req,res,next) {
        
        var url = require("url")
        var fs = require("fs")
        var path = require("path")
        var folder = path.resolve(__dirname + '/dist')
        var fileName = url.parse(req.url)
        fileName = fileName.href.split(fileName.search).join("");
        var fileExists = fs.existsSync(folder + fileName)
        if ( !fileExists && ( !req.url.endsWith('.js') && !req.url.endsWith('.css') && !req.url.endsWith('.html') ))  {
            console.log(folder + fileName + " exists : " + fileExists)
            req.url = '/index.html'
            next()
        } else {
            next()
        }
        
    }
}));
