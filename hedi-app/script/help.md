## HEDI helper scripts
-----

### arguments:
'--view'          pulls the latest version and starts a local app
'--refresh'       updates backend, pulls latest app, starts offline version
'--online-cms'    start hedi in online configuration
'--offline-cms'   build & start hedi in offline configuration

### subcommands:
child scripts can be called with additonal parameters
e.g. './hedi.sh --staging restart' or short './hedi.sh -a restart'

'-n or --online-cms'  online.sh: env, dev, build; no attribute: (update, env (switch), yarn view)
'-o or --offline-cms'  offline.sh: env, dev, view; no attribute: (update, env (switch), yarn build, yarn start)

### deploy environment commands:
'--environment [args]' current branch build, upload and restarts remote container. steps can be called individually as arguments

#### available environments:
'-s or --staging'   staging.sh: appstaging.projekt-hedi.de
'--sandbox'         sandbox.sh: sandbox.projekt-hedi.de
'--production'   production.sh: hedi.app