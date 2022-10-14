module.exports = {
  apps: [
    {
      name: 'VCG-DEV-v3',
      exec_mode: 'cluster',
      instances: 1, // max Or a number of instances
      script: './node_modules/.bin/next',
      args: 'start -p 4400'
    }
  ]
}