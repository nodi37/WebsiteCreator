
// texts: [{ name: 'text' }, { name: 'text2' }], //Prop name
// images: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //maxSize = Width //keeps aspect ratio //minimal width 512px is recommended //maximal width recommended: 3840 for max 4K monitors, use false to return original image
// booleans: [{ name: 'someBln' }], //Prop name
// colors: [{ name: 'background' }], //Prop name
// json: [{name: 'data'}] //Prop name

const componentsModels = [
    {
        name: 'LogoBar',
        description: 'Just white bar with logo',
        props: {
            texts: [{ name: 'text' }],
            images: [{ name: 'logoImg', maxSize: 512, format: 'png' }],
            booleans: [{ name: 'smallLogo' }, { name: 'withText' }],
            colors: [],
            json: []
        }
    },
    {
        name: 'FullWidthImage',
        description: '100% of window width image',
        props: {
            texts: [{ name: 'primaryText' }, { name: 'secondaryText' }],
            images: [
                { name: 'image', maxSize: 3840, format: 'jpeg' },
            ],
            booleans: [],
            colors: [],
            json: []
        }
    },
    {
        name: 'DarkFooter',
        description: 'Simple dark footer',
        props: {
            texts: [],
            images: [],
            booleans: [],
            colors: [],
            json: []
        }
    },
    {
        name: 'UpToThreeLineList',
        description: 'Up to three line list',
        props: {
            texts: [{ name: 'header' }],
            images: [],
            booleans: [],
            colors: [{ name: 'backgroundColor' }, { name: 'textColor' }],
            json: [{ name: 'data' }]
        }
    },
]


export default componentsModels;