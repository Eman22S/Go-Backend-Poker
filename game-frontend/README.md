# Poker Webapp

## Start Webapp Client
Start webapp using

* `docker-compose up --build`

This command will
* build and bundle all the required grpc resources with the right configurations
* setup and start grpc-http mapping proxy in appropriate configuration
* setup and start nginx server that serves static webpage and its resources with right configurations

Don't forget to use `--build` flag whenever there is source code change.

#### Make sure bakcend grpc server is running before trying this client

### How to generate necessary client side grpc code from sng.proto file (Optional if your system is linux-based recent system)

* You must install `protoc` on your system and its correspoding `protoc-gen-grpc-web` protoc plugin. For more information, see the oficial grpc-web code-generator section on their README https://github.com/grpc/grpc-web#code-generator-plugin

* Use the below command inside `src/grpc/` folder of the project
  * `protoc -I=. sng.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.`
  * This command will generate two javascript files; `sng_grpc_web_pb.js` and `sng_pb.js`. Note if the project failed to compile after the above command, enter `/* eslint-disable */` comment in the start of the generated files to disable eslint in them.

## Available Scripts for Development Purposes

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.