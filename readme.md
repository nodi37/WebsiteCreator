# Description
This is alpha version of my proprietary cms built using Vue v2. 
I wanted to build something that would let me to modify and expand websites quickly, so i build component based system.
Control panel allows to assign components to layouts and modify props.

Currently supports: 
- Setting global and home templates
- Adding subpages and defining templates for them.

# Tech

This app is build using:

- Vue2/Vuex
- Vuetify/TailwindCSS
- node.js/Express/TypeScript
- MongoDB

# Installation

This app requires [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community).

##### Backend installation: 
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

##### Frontend installation: 
Copy content of env_template file to .env file.
Set:
- VUE_APP_API_PATH - API adress, 

Leave other values as they are. This are language settings, not ready yet, i will work on it.

Run following commands:
```
npm i
npm run serve
```

App should open in web browser.

# How to use
Currently there are serval predefined templates created by me for presentation purposes.
Go to /panel subpage.
Use login and password from console to login.
There are three main positions in drawer. Global template, home template and add subpage.
Other positions are templates/subpages created by user.
In global template you can set components that will be displayed on every subpage.
In home template you can set components that will be displayed on home page, so under '/';
To add components just click on plus button. Select component, set props and click save. To delete click delete, to change order just click move up. Props are divided into categories. They are:

- texts - inputs for simple text values
- images - inputs for images
- booleans - switches for boolean values
- colors - color pickers for colors
- json - json for other types of data


In add subpage is there only small form where you can write new layout name. It should be longer than 4 signs, without special chars or spaces, spaces will be replaced with dash.
If name will be free and correct, save button will be enabled. After saving template user is automatically redirected to it.
To delete template click delete button on the top. This will also delete all assigned components. 

# For development
To create new component define model in `fronted/src/models/componentsModels`. Example:
```js
  {
        name: 'Component name
        description: 'Description'
        props: { //Props
            texts: [{ name: 'text' }], //Text values
            images: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //Images
            booleans: [{ name: 'smallLogo' }, { name: 'withText' }], //Booleans
            colors: [], //Colors
            json: [] //Json data
        }
    },
```
Every prop definition is object with property name:
```js
 { name: 'text' }
```

Images have different values
- name - prop name
- maxSize - maximum image width, 
- format - image file format

```js
 { name: 'logoImg', maxSize: 512, format: 'png' }
```
Images will be automatically converted to given format and scaled to given size. Use false in maxSize to return original image.


Props object need to contain all arrays, even if they are empty. 
Now build standard vue component with given props. You can use TailwindCSS for styling.
Import component in file: `frontend/src/helpers/inAppCompsImporter.js`.
Now component shoud render propertly after adding it to template.

 Images are sent to server, chunked if needed. Images data are stored in db. Images from components in global templates are saved as files to avoid loading them on every page load. Other images are stored in db as base64 string. You can use `getImageById` function from `image.controller.js.` You can check how to load images in `frontend/src/components/inAppComponents/Misc/ImageLoader.vue`. 
 
 The components currently added were built for development purposes. 
 
This is just short description because it is alpha version, there is still many things to do.
First of all i will add posts/galleries/files api to hanlde many types of data.
After that i need to improve many things like authentication etc, i want to add multi language support, some basic loaders like image loader. I will do something to scale images to screen size before loading them from server for better UX. Something like `srcset`. Maybe dark mode in panel. Many things to improve SEO like for example SSR.

No build instructions yet because its not ready yet. 



