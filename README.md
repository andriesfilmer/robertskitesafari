# Robert's kitesafari 

## Install 

    sudo apt-get install nodejs
    sudo npm install -g grunt-cli

## Run node

Install all the packages from `packages.json`.

    npm install

## Run grunt for development

Run Grunt `once` to copy all the static files.

    grunt once

Run the server on `localhost:3000` for development.

    grunt

Browse to `localhost:3000` 

## Run grunt for production

Create the production myApp and clean up develoment files.

    grunt once
    grunt prod

Publish the `public` directory on a webserer


