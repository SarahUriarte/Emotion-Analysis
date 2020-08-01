// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_ROOT: 'http://34.72.57.203:8080',
  SUBSCRIPTION_KEY: 'b11663ca7b4640b68d85ccca56bb2252',
  FACE_URL: 'https://face-recognition-tec.cognitiveservices.azure.com/face/v1.0/detect?returnFaceAttributes=emotion'
};
  