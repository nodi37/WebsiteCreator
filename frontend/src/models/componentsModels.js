
// texts: [],
// images: [],
// booleans: [{ name: 'someBln' }],
// colors: [],
// jsons: []

const componentsModels = [
    {
        name: 'LogoBar',
        description: 'Just white bar with logo',
        props: {
            texts: [{ name: 'text' }],
            images: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //Width - minimal width 512px is recommended
            booleans: [{ name: 'smallLogo' }, { name: 'withText' }],
            colors: [],
            jsons: []
        }
    },
    {
        name: 'FullWidthImage',
        description: '100% of window width image',
        props: {
            texts: [{ name: 'primaryText' }, { name: 'secondaryText' }],
            images: [
                { name: 'image', maxSize: 3840, format: 'jpeg' },
            ], //3840 for max 4K monitors, use false to return original image
            booleans: [],
            colors: [],
            jsons: []
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
            jsons: []
        }
    },
    {
        name: 'OneLineList',
        description: 'List with one line items',
        props: {
            texts: [],
            images: [],
            booleans: [],
            colors: [{name: 'backgroundColor'}, {name: 'textColor'}],
            json: [{name: 'data', default: ''}]
        }
    },
]


export default componentsModels;