# To install: 
Copy content of env_template file to .env file.
Set at least:
- PORT - port api will be working
- COOKIE_SECRET - secret phrase to use signed cookies
- JWT_SECRET - secret phrase for jwt 
- DB_SERVER - database server link
- CORS_ORIGIN - frontend adress, http://localhost:8080 should work

Optional(Will be created automatically if not set): 
- SU_NAME - Admin username
- SU_PASSWORD - Admin password

After that run:
```
npm i
npm run build
npm run nodemon
```

App will start, create required data. Username and password to login will be shown in console.
`[AdminCreator] Admin has been created! [Username: admin], [Password: somePassword]`