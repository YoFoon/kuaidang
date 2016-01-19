var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect=require('gulp-connect'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['sass','style', 'scripts','images','browser-sync','watcher']);

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss') //匹配文件
	    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer({               //进行浏览器兼容
	        browsers: ['last 10 versions']
	    }))
        .pipe(sourcemaps.write('./'))
	    // .pipe(minifycss())                 //继续压缩一份
	    .pipe(gulp.dest('./dist/css'));    //输出压缩好的新css文件
});

gulp.task('style',function(){
    return gulp.src('./src/css/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src([
	        './src/js/**.js'
	    ])
	    //.pipe(concat('app.js'))         // 合并为一个文件
	    //.pipe(gulp.dest('./dist/js'))   // 写入一份到指定目录
	    .pipe(uglify())                 // 压缩一份
	    //.pipe(rename("app.min.js"))  // 并重命名以防覆盖上次写入的文件
	    .pipe(gulp.dest('./dist/js'));  // 写入到指定目录
});


gulp.task('images',function(){
   return gulp.src('./src/images/**/*.+(jpeg|jpg|png|gif)')
   .pipe(gulp.dest('./dist/images'));
})

gulp.task('watcher', function() {
    gulp.watch("src/scss/**/*.scss", ['sass']).on('change', reload);
    gulp.watch('src/css/**/*.css',['style']).on('change',reload);
    gulp.watch("src/js/**/*.js", ['scripts']).on('change', reload);
    gulp.watch("view/**/*.html").on('change', reload);
    gulp.watch("index.html").on('change', reload);
    gulp.watch("src/images/**/*.+(jpeg|jpg|png|gif)",['images']).on('change',reload);
});

/*gulp.task('server',function(){
    connect.server({
        root:'src/view',
        livereload:true
    })
});
*/
// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理
/*gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "kd.me"
  });
});*/