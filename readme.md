#STAR WARS API
Hello it's my project star wars api, you can change database from Resources in serverless.yml configuration

Steps to run project
1. Install serverless framework
-> npm install -g serverless

2. Install node modules
-> npm install --save-prod

3. Run project locally
-> Install dev dependencies: npm install --only=dev
-> Run project locally: serverless offline or npm run dev

More
1. Deploy project
-> npm run deploy

2. Run tests
First of all, install npx
-> npm install -g npx

Run test
-> npm run test

3. You can prove apis on my deploy ->
    GET - https://iey2gkv75j.execute-api.us-east-2.amazonaws.com/characters
    POST - https://iey2gkv75j.execute-api.us-east-2.amazonaws.com/characters
    GET - https://iey2gkv75j.execute-api.us-east-2.amazonaws.com/characters/{id}
    PUT - https://iey2gkv75j.execute-api.us-east-2.amazonaws.com/characters/{id}
    DELETE - https://iey2gkv75j.execute-api.us-east-2.amazonaws.com/characters/{id}
