const server = require('nuxt-cluster')
server.start({ srcDir: process.cwd(), port: 3000 })
