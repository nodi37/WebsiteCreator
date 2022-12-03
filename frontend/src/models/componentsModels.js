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
    name: "Statement",
    visibleName: "Komunikat",
    description: "Wyświetla komunikat z możliwością dodania nagłówka, listy oraz zdjęcia",
    props: {
      text: [{ name: "header" }, { name: "content" }],
      image: [{ name: "image", maxSize: 3840, format: "jpeg" }],
      boolean: [{ name: "bold" }, { name: "textCenter" }],
      color: [],
      array: [
        {
          name: "items",
          values: {
            text: [{ name: "item" }],
            image: [],
            boolean: [],
          },
        },
      ],
      json: [],
    },
  },
  {
    name: "CompetitionComponent",
    visibleName: "Zawody",
    description: "Pokazuje pojedyncze zawody",
    props: {
      text: [{ name: "header" }, { name: "content" }, { name: "date" }],
      image: [],
      boolean: [],
      color: [],
      array: [],
      json: [],
    },
  },
  {
    name: "LogoBar",
    visibleName: "Belka z przyciskami i logo",
    description: "Biała belka z obrazkiem logo i menu nawigacją",
    props: {
      text: [],
      image: [{ name: "logoImg", maxSize: 512, format: "png" }],
      boolean: [{ name: "openInNewTab" }],
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
    name: "PartnersLogos",
    visibleName: "Logo partnerów",
    description: "Wyświetla loga partnerów",
    props: {
      text: [{ name: "header" }],
      image: [],
      boolean: [],
      color: [],
      array: [
        {
          name: "items",
          values: {
            text: [{ name: "href" }],
            image: [{ name: "logo", maxSize: 512, format: "png" }],
            boolean: [],
          },
        },
      ],
      json: [],
    },
  },
  {
    name: "NewArticles",
    visibleName: "Nowe wpisy",
    description: "Pokazuje trzy nowe ostatnie wpisy",
    props: {
      text: [{ name: "header" }, { name: "tag" }],
      image: [],
      boolean: [],
      color: [],
      array: [],
      json: [],
    },
  },
  {
    name: "ArticlesGrid",
    visibleName: "Wszystkie wpisy",
    description: "Pokazuje wszystkie wpisy",
    props: {
      text: [{ name: "header" }, { name: "tag" }],
      image: [],
      boolean: [],
      color: [],
      array: [],
      json: [],
    },
  },
  {
    name: "CompetitionTable",
    visibleName: "Tabela wędkarz roku",
    description: "Pokazuje tabelę wyników wędkarza roku",
    instructions: "Wpisz wagi oraz punkty oddzielone przecinkami, bez spacji, same wartości liczbowe. Daty możesz wpisać w dowolnym formacie, również muszą być oddzielone przecinkami.",
    props: {
      text: [{ name: "year" }],
      image: [],
      boolean: [],
      color: [],
      array: [
        {
          name: "items",
          values: {
            text: [{ name: "name" }, { name: "weights" }, { name: "points" }, { name: "dates" }],
            image: [],
            boolean: [],
          },
        },
      ],
      json: [],
    },
  },

  {
    name: "CompetitionRules",
    visibleName: "Regulamin zawodów",
    description: "Pokazuje regulamin zawodów",
    props: {
      text: [{ name: "header" }, { name: "note" }],
      image: [],
      boolean: [],
      color: [],
      array: [
        {
          name: "items",
          values: {
            text: [{ name: "content" }],
            image: [],
            boolean: [],
          },
        },
      ],
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
  // {
  //   name: "UpToThreeLineList",
  //   visibleName: "Lista trzy stopniowa",
  //   description: "Lista z trzema stopniami tekstu dla każdego punktu oraz ikoną ze zbioru material icons",
  //   props: {
  //     text: [{ name: "header" }],
  //     image: [],
  //     boolean: [],
  //     color: [{ name: "backgroundColor" }, { name: "textColor" }],
  //     array: [
  //       {
  //         name: "items",
  //         values: {
  //           image: [{ name: "image", maxSize: 1080, format: "jpeg" }],
  //           text: [{ name: "icon" }, { name: "lineOne" }, { name: "lineTwo" }, { name: "lineThree" }, { name: "href" }],
  //           boolean: [{ name: "highlighted" }],
  //         },
  //       },
  //     ],
  //     json: [{ name: "data" }],
  //   },
  // },
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
