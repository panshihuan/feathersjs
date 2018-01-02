module.exports = {
  apps: [ //数组，可以指定多个服务
    {
      name: 'movies-be',
      script: 'src',
      watch: true,
      env: {
        PORT: 9000, //node服务端口
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 9000,
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    "production": {
      user: "root",
      host: ['119.29.120.158'],
      ref: "origin/master",
      repo: "https://github.com/panshihuan/feathersjs.git",
      path: "/home/service",
      "post-setup": "ls -la",
      "post-deploy": "cd be && npm install && pm2 kill && pm2 start ecosystem.config.js --env production",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }

};