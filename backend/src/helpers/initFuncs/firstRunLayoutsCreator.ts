import Layout from "../../models/Layout";
import { saveNewComponent } from "../../services/componentService";
import { saveNewLayout } from "../../services/layoutService";



async function firstRunLayoutsCreator() {
    try {
        const topLayout = await Layout.countDocuments({ name: "topLayout" });

        if (!topLayout) {
            console.log('[AppInit] Basic layouts data not exists! Creating...');
            await saveNewLayout({
                name: "topLayout",
                components: [],
                isGlobal: true,
                isRequired: true
            });

            await saveNewLayout({
                name: "bottomLayout",
                components: [],
                isGlobal: true,
                isRequired: true
            });

            //Temp
            const homeCompsIds = await createComponents();
            //Temp

            await saveNewLayout({
                name: "homeLayout",
                components: homeCompsIds, //Switch to empty arr
                isGlobal: false,
                isRequired: true
            });

            console.log("[AppInit] Basic layouts data created!");
        }
    } catch (error) {
        console.log("[AppInit] Error saving basic settings");
        console.log(error)
    }
}

export default firstRunLayoutsCreator;


//Temporary thing 
async function createComponents() {
    const components = [
        {
            "name": "UpToThreeLineList",
            "order": 0,
            "props": {
                "header": null,
                "backgroundColor": {
                    "alpha": 1,
                    "hex": "#000000",
                    "hexa": "#000000FF",
                    "hsla": {
                        "h": 180,
                        "s": 0,
                        "l": 0,
                        "a": 1
                    },
                    "hsva": {
                        "h": 180,
                        "s": 0,
                        "v": 0,
                        "a": 1
                    },
                    "hue": 180,
                    "rgba": {
                        "r": 0,
                        "g": 0,
                        "b": 0,
                        "a": 1
                    }
                },
                "textColor": {
                    "alpha": 1,
                    "hex": "#FFFFFF",
                    "hexa": "#FFFFFFFF",
                    "hsla": {
                        "h": 0,
                        "s": 0,
                        "l": 1,
                        "a": 1
                    },
                    "hsva": {
                        "h": 0,
                        "s": 0,
                        "v": 1,
                        "a": 1
                    },
                    "hue": 0,
                    "rgba": {
                        "r": 255,
                        "g": 255,
                        "b": 255,
                        "a": 1
                    }
                },
                "data": "[\n\t{\"lineOne\":\"Norbert Bednarczyk\", \"highlighted\": true},\n\t{\"icon\": \"mdiMapMarker\", \"lineOne\":\"Oslo, Norway\", \"lineTwo\":\"\", \"lineThree\":\"\"},\n\t{\"icon\": \"mdiPhone\", \"lineOne\":\"+47 93950344\"},\n\t{\"icon\": \"mdiEmailFastOutline\", \"lineOne\":\"norbertbednarczyk@icloud.com\", \"href\": \"mailto:norbertbednarczyk@icloud.com\", \"lineTwo\":\"\", \"lineThree\":\"\"},\n\t{\"icon\": \"mdiGithub\", \"lineOne\":\"GitHub\", \"href\": \"https://github.com/nodi37\"},\n\t{\"icon\": \"mdiLinkedin\", \"lineOne\":\"LinkedIn\", \"href\": \"https://www.linkedin.com/in/norbert-bednarczyk-931692227\"},\n\t{\"icon\": \"mdiStackOverflow\", \"lineOne\":\"StackOverflow\", \"href\": \"https://stackoverflow.com/users/17151859/norbert\"}\n]"
            },
        },
        {
            "name": "UpToThreeLineList",
            "order": 1,
            "props": {
                "header": "Skills",
                "backgroundColor": {
                    "alpha": 1,
                    "hex": "#395B64",
                    "hexa": "#395B64FF",
                    "hsla": {
                        "h": 192.5581395348837,
                        "s": 0.2738853503184713,
                        "l": 0.307843137254902,
                        "a": 1
                    },
                    "hsva": {
                        "h": 192.5581395348837,
                        "s": 0.42999999999999994,
                        "v": 0.39215686274509803,
                        "a": 1
                    },
                    "hue": 192.5581395348837,
                    "rgba": {
                        "r": 57,
                        "g": 91,
                        "b": 100,
                        "a": 1
                    }
                },
                "textColor": {
                    "alpha": 1,
                    "hex": "#FFFFFF",
                    "hexa": "#FFFFFFFF",
                    "hsla": {
                        "h": 257.6470588235294,
                        "s": 0,
                        "l": 1,
                        "a": 1
                    },
                    "hsva": {
                        "h": 257.6470588235294,
                        "s": 0,
                        "v": 1,
                        "a": 1
                    },
                    "hue": 257.6470588235294,
                    "rgba": {
                        "r": 255,
                        "g": 255,
                        "b": 255,
                        "a": 1
                    }
                },
                "data": "[\n{\"lineOne\":\"Frontend\", \"lineTwo\":\"HTML5, CSS, SCSS, Tailwind CSS, Vue, Vuetify\", \"icon\":\"mdiMonitor\"},\n{\"lineOne\":\"Backend\", \"lineTwo\":\"Node.js, Express\", \"icon\":\"mdiServer\"},\n{\"lineOne\":\"Databases\", \"lineTwo\":\"MongoDB, PostgreSQL\", \"icon\":\"mdiDatabase\"},\n{\"lineOne\":\"Tools\", \"lineTwo\":\"VSCode, Postman, Git, NPM\", \"icon\":\"mdiHammer\"},\n{\"lineOne\":\"Operating systems\", \"lineTwo\":\"Linux, Windows, macOS\", \"icon\":\"mdiLinux\"}\n]"
            }
        },
        {
            "name": "UpToThreeLineList",
            "order": 2,
            "props": {
                "header": "Education",
                "backgroundColor": {
                    "alpha": 1,
                    "hex": "#0F3460",
                    "hexa": "#0F3460FF",
                    "hsla": {
                        "h": 212.5925925925926,
                        "s": 0.7297297297297297,
                        "l": 0.21764705882352942,
                        "a": 1
                    },
                    "hsva": {
                        "h": 212.5925925925926,
                        "s": 0.84375,
                        "v": 0.3764705882352941,
                        "a": 1
                    },
                    "hue": 212.5925925925926,
                    "rgba": {
                        "r": 15,
                        "g": 52,
                        "b": 96,
                        "a": 1
                    }
                },
                "textColor": {
                    "alpha": 1,
                    "hex": "#FFFFFF",
                    "hexa": "#FFFFFFFF",
                    "hsla": {
                        "h": 0,
                        "s": 0,
                        "l": 1,
                        "a": 1
                    },
                    "hsva": {
                        "h": 0,
                        "s": 0,
                        "v": 1,
                        "a": 1
                    },
                    "hue": 0,
                    "rgba": {
                        "r": 255,
                        "g": 255,
                        "b": 255,
                        "a": 1
                    }
                },
                "data": "[\n{\"lineOne\":\"IT Technician\", \"lineTwo\":\"Zespół Szkół Elektronicznych im. Bohaterów Westerplatte\", \"lineThree\":\"2012/09 – 2016/06 Radom, Poland\", \"icon\":\"mdiSchool\"}\n]"
            }
        },
        {
            "name": "UpToThreeLineList",
            "order": 3,
            "props": {
                "header": "languages",
                "backgroundColor": {
                    "alpha": 1,
                    "hex": "#16213E",
                    "hexa": "#16213EFF",
                    "hsla": {
                        "h": 223.5,
                        "s": 0.47619047619047616,
                        "l": 0.16470588235294117,
                        "a": 1
                    },
                    "hsva": {
                        "h": 223.5,
                        "s": 0.6451612903225806,
                        "v": 0.24313725490196078,
                        "a": 1
                    },
                    "hue": 223.5,
                    "rgba": {
                        "r": 22,
                        "g": 33,
                        "b": 62,
                        "a": 1
                    }
                },
                "textColor": {
                    "alpha": 1,
                    "hex": "#FFFFFF",
                    "hexa": "#FFFFFFFF",
                    "hsla": {
                        "h": 0,
                        "s": 0,
                        "l": 1,
                        "a": 1
                    },
                    "hsva": {
                        "h": 0,
                        "s": 0,
                        "v": 1,
                        "a": 1
                    },
                    "hue": 0,
                    "rgba": {
                        "r": 255,
                        "g": 255,
                        "b": 255,
                        "a": 1
                    }
                },
                "data": "[\n{\"lineOne\":\"Norwegian, English, Polish\", \"icon\":\"mdiWeb\"}\n]"
            }
        },
    
        {
            "name": "UpToThreeLineList",
            "order": 4,
            "props": {
                "header": "Projects",
                "backgroundColor": {
                    "alpha": 1,
                    "hex": "#2C3333",
                    "hexa": "#2C3333FF",
                    "hsla": {
                        "h": 180,
                        "s": 0.07368421052631582,
                        "l": 0.18627450980392157,
                        "a": 1
                    },
                    "hsva": {
                        "h": 180,
                        "s": 0.13725490196078438,
                        "v": 0.2,
                        "a": 1
                    },
                    "hue": 180,
                    "rgba": {
                        "r": 44,
                        "g": 51,
                        "b": 51,
                        "a": 1
                    }
                },
                "textColor": {
                    "alpha": 1,
                    "hex": "#FFFFFF",
                    "hexa": "#FFFFFFFF",
                    "hsla": {
                        "h": 0,
                        "s": 0,
                        "l": 1,
                        "a": 1
                    },
                    "hsva": {
                        "h": 0,
                        "s": 0,
                        "v": 1,
                        "a": 1
                    },
                    "hue": 0,
                    "rgba": {
                        "r": 255,
                        "g": 255,
                        "b": 255,
                        "a": 1
                    }
                },
                "data": "[\n  { \"lineOne\": \"Website Creator\", \"lineTwo\": \"My proprietary cms\", \"lineThree\": \"Stack: TypeScript, Node.js, Express, MongoDB, Vue, Vuetify, Vuex\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/WebsiteCreator\" },\n  { \"lineOne\": \"Porfolio website\", \"lineTwo\": \"My old portfolio website\", \"lineThree\": \"Stack: Node.js, HTML, SCSS\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/mainWebsite\" },\n  { \"lineOne\": \"Delator\", \"lineTwo\": \"In progress, Employee management app for small businesses\", \"lineThree\": \"Stack: TypeScript, Node.js, Express, MongoDB, Vue, Vuetify, Vuex\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/Delator\" },\n  { \"lineOne\": \"Koło 22 Energeryk Radom\", \"lineTwo\": \"Fishing association page\", \"lineThree\": \"Stack: Node.js, SCSS, Express, MongoDB.\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/kolo22energetykradompl\" },\n  { \"lineOne\": \"E2EEChat\", \"lineTwo\": \"End to end encrypted chat\", \"lineThree\": \"Stack: Node.js, OpenPGP.js, WebSockets, Vue3, PostgreSQL\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/chat\" },\n  { \"lineOne\": \"React Blog\", \"lineTwo\": \"Blog app\", \"lineThree\": \"Stack: React, Node.js, MongoDB.\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/reactBlog\" },\n  { \"lineOne\": \"Blacklist browser extension for wykop.pl, \", \"lineTwo\": \"Uses DOM Manipulation to filter content from blacklisted users\", \"lineThree\": \"Stack: VanillaJS\", \"icon\":\"mdiArrowRightCircleOutline\", \"href\": \"https://github.com/nodi37/WykopCzarnolisto\" }\n]"
            }
        }
    
    ];

    let homeCompsIds = [];

    for (const comp of components) {
        const data = await saveNewComponent(comp);
        homeCompsIds.push(data._id);
    }

    return homeCompsIds;
}

