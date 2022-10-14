module.exports = {
  apps: [
    {
      name: 'NFT Launchpad',
      exec_mode: 'cluster',
      instances: 1, // max Or a number of instances
      script: './node_modules/.bin/next',
      args: 'start -p 4400'
    }
  ]
}