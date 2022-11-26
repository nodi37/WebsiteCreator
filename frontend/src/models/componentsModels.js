// text: [{ name: 'text' }, { name: 'text2' }], //Prop name
// image: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //maxSize = Width //keeps aspect ratio //minimal width 512px is recommended //maximal width recommended: 3840 for max 4K monitors, use false to return original image
// boolean: [{ name: 'someBln' }], //Prop name
// color: [{ name: 'background' }], //Prop name
// json: [{name: 'data'}] //Prop name
// array: [
//   {
//     name: "items",
//     values: {
//       text: [{ name: "icon" }, { name: "lineOne" }, { name: "lineTwo" }, { name: "lineThree" }, { name: "href" }],
//       boolean: [{ name: "highlighted" }],
//     },
//   },
// ],

const componentsModels = [
  {
    name: "LogoBar",
    visibleName: "Belka z przyciskami i logo",
    description: "Biała belka z obrazkiem logo i menu nawigacją",
    props: {
      text: [],
      image: [{ name: "logoImg", maxSize: 512, format: "png" }],
      boolean: [],
      color: [],
      array: [
        {
          name: "items",
          values: {
            text: [{ name: "name" }, { name: "href" }],
            image: [],
            boolean: [],
          },
        },
      ],
      json: [],
    },
  },
  {
    name: "FullWidthImage",
    visibleName: "Obrazek z nagłówkami",
    description: "Obrazek o pełnej szerokości okna przykryty gradientem z dwoma nagłówkami",
    props: {
      text: [{ name: "primaryText" }, { name: "secondaryText" }],
      image: [{ name: "image", maxSize: 3840, format: "jpeg" }],
      boolean: [],
      color: [],
      array: [],
      json: [],
    },
  },
  {
    name: "DarkFooter",
    visibleName: "Ciemna stopka",
    description: "Prosta stopka o ciemnym kolorze",
    props: {
      text: [],
      image: [],
      boolean: [],
      color: [],
      array: [],
      json: [],
    },
  },
  {
    name: "UpToThreeLineList",
    visibleName: "Lista trzy stopniowa",
    description: "Lista z trzema stopniami tekstu dla każdego punktu oraz ikoną ze zbioru material icons",
    props: {
      text: [{ name: "header" }],
      image: [],
      boolean: [],
      color: [{ name: "backgroundColor" }, { name: "textColor" }],
      array: [
        {
          name: "items",
          values: {
            image: [{ name: "image", maxSize: 1080, format: "jpeg" }],
            text: [{ name: "icon" }, { name: "lineOne" }, { name: "lineTwo" }, { name: "lineThree" }, { name: "href" }],
            boolean: [{ name: "highlighted" }],
          },
        },
      ],
      json: [{ name: "data" }],
    },
  },
  // {
  //   name: "Navigation",
  //   visibleName: "Menu nawigacyjne",
  //   description: "Menu nawigacyjne",
  //   props: {
  //     text: [],
  //     image: [],
  //     boolean: [],
  //     color: [],
  //     array: [
  //         {
  //           name: "items",
  //           values: {
  //             text: [{ name: "name" }, { name: "href" }],
  //             image: [],
  //             boolean: [],
  //           },
  //         },
  //       ],
  //     json: [],
  //   },
  // },
];

export default componentsModels;
