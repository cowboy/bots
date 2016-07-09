import {spawn} from 'child_process';
import {grunt} from './Gruntfile';

const eslint = {
  src: {
    options: {
      configFile: '.eslintrc-es2015.yaml',
    },
    src: 'src/**/*.js',
  },
  gruntfile: {
    options: {
      configFile: '.eslintrc-es2015.yaml',
    },
    src: 'Gruntfile.babel.js',
  },
  root: {
    options: {
      configFile: '.eslintrc-node.yaml',
    },
    src: [
      '*.js',
      '!Gruntfile.babel.js',
    ],
  },
};

const watch = {
  options: {
    spawn: false,
  },
  config: {
    files: ['.env', 'config.js'],
    tasks: ['kill', 'start'],
  },
  src: {
    files: ['<%= eslint.src.src %>'],
    tasks: ['eslint:src', 'kill', 'start'],
  },
  gruntfile: {
    files: ['<%= eslint.gruntfile.src %>'],
    tasks: ['eslint:gruntfile'],
  },
  root: {
    files: ['<%= eslint.root.src %>'],
    tasks: ['eslint:root'],
  },
  lint: {
    options: {
      reload: true,
    },
    files: ['.eslintrc*', 'eslint/*'],
    tasks: ['eslint'],
  },
  // Reload the bot if chatter files change. This makes dev MUCH easier!
  chatter: {
    files: ['node_modules/chatter/dist/**/*'],
    tasks: ['kill', 'start'],
  },
};

grunt.initConfig({
  eslint,
  watch,
});

grunt.registerTask('start', function() {
  global._BOT = spawn('node', ['--require', 'babel-register', 'src/index'], {stdio: 'inherit'});
});

grunt.registerTask('kill', function() {
  global._BOT.kill('SIGKILL');
});

grunt.registerTask('test', ['eslint']);
grunt.registerTask('default', ['start', 'watch']);

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-eslint');
