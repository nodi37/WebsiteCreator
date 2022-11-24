// texts: [{ name: 'text' }, { name: 'text2' }], //Prop name
// images: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //maxSize = Width //keeps aspect ratio //minimal width 512px is recommended //maximal width recommended: 3840 for max 4K monitors, use false to return original image
// booleans: [{ name: 'someBln' }], //Prop name
// colors: [{ name: 'background' }], //Prop name
// json: [{name: 'data'}] //Prop name
// array: [
//   {
//     name: "items",
//     values: {
//       texts: [{ name: "icon" }, { name: "lineOne" }, { name: "lineTwo" }, { name: "lineThree" }, { name: "href" }],
//       images: [{ name: "photo", maxSize: 512, format: "jpeg" }],
//       booleans: [{ name: "highlighted" }],
//     },
//   },
// ],

const componentsModels = [
  {
    name: "LogoBar",
    visibleName: "Belka z logo",
    description: "Biała belka z obrazkiem logo",
    props: {
      texts: [{ name: "text" }],
      images: [{ name: "logoImg", maxSize: 512, format: "png" }],
      booleans: [{ name: "smallLogo" }, { name: "withText" }],
      colors: [],
      arrays: [],
      json: [],
    },
  },
  {
    name: "FullWidthImage",
    visibleName: "Obrazek z nagłówkami",
    description: "Obrazek o pełnej szerokości okna przykryty gradientem z dwoma nagłówkami",
    props: {
      texts: [{ name: "primaryText" }, { name: "secondaryText" }],
      images: [{ name: "image", maxSize: 3840, format: "jpeg" }],
      booleans: [],
      colors: [],
      arrays: [],
      json: [],
    },
  },
  {
    name: "DarkFooter",
    visibleName: "Ciemna stopka",
    description: "Prosta stopka o ciemnym kolorze",
    props: {
      texts: [],
      images: [],
      booleans: [],
      colors: [],
      arrays: [],
      json: [],
    },
  },
  {
    name: "UpToThreeLineList",
    visibleName: "Lista trzy stopniowa",
    description: "Lista z trzema stopniami tekstu dla każdego punktu oraz ikoną ze zbioru material icons",
    props: {
      texts: [{ name: "header" }],
      images: [],
      booleans: [],
      colors: [{ name: "backgroundColor" }, { name: "textColor" }],
      array: [
        {
          name: "items",
          values: {
            texts: [{ name: "icon" }, { name: "lineOne" }, { name: "lineTwo" }, { name: "lineThree" }, { name: "href" }],
            images: [{ name: "photo", maxSize: 512, format: "jpeg" }],
            booleans: [{ name: "highlighted" }],
          },
        },
      ],
      json: [{ name: "data" }],
    },
  },
  {
    name: "Navigation",
    visibleName: "Menu nawigacyjne",
    description: "Menu nawigacyjne",
    props: {
      texts: [],
      images: [],
      booleans: [],
      colors: [],
      arrays: [],
      json: [{ name: "data" }],
    },
  },
];

export default componentsModels;
