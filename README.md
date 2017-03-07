# Create-Read-Update-Delete Demo w/ React-Starter-Kit
A simple demo of how to use the two primary kriasoft packages together to make a single App.

## File Structure
```
/counterApi/ - REST API for database using kriasoft/nodejs-api-starter
/counterApp/ - Simple Counter App that uses the counterApi rest API and GraphQL
```

## Running the Demo
Make sure you have upgraded Docker and installed Yarn.

1. start counter api:
`cd counterApi/ && docker-compose up`

1. install counter app:
`cd ../counterApp && yarn `

1. start counter app:
`yarn start`

1. goto counter app
`localhost:4000`
