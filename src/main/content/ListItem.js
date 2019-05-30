import App from "../../App.js";

export default class ListItem extends lng.Component {
    static _template() {
        return {
            rect: true, w: 460, h: 260,
            colorBottom: 0xff101010,
            colorTop: 0xFF101010,
            colorLeft:  0xFF101010,
            colorRight:  0xFF101010,
            Image:{},
            Title:{
                w: 420, h: 66, x: 20, y: 178, zIndex: 10,
                text: {color: 0xFF808080, fontFamily: 'Roboto', fontSize: 28, lineHeight: 33}
            },
            Shadow:{x: 0, y: 150, w: 460, h: 110, src: App.getPath("images/shadow.png")},
            BlackBorder: {
                alpha: 1, w: 460, h: 260,
                Border: {type: lng.components.BorderComponent, borderWidth: 3, colorBorder: 0xFF101010, w: 460 - 6, h: 260 - 6, x: 3, y: 3}
            },
            Border: {
                alpha: 0, w: 460, h: 260,
                PlayBtn:{
                    rect: true,
                    y: 224, x: 22,
                    w: 31, h: 31,
                    color: 0xff303030,
                    Img:{
                        x: 10, y: 8,
                        w: 11, h: 15,
                        src: App.getPath("./images/play_small.png")
                    }
                },
                Time: {
                    rect: true, color: 0xffCB0000,  w: 199, h: 36, x: 53, y: 224, alpha: 1, transitions: {y: {duration: 0.3}},
                    Label: {
                        h: 21, w: 179, x: 10, y: 6,
                        text: {
                            text: {}, color: 0xffF1F1F1, fontSize: 18, fontWeight: "bold",
                            lineHeight: 21, fontFamily: 'Roboto',
                        }
                    }
                },
                Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xff101010, w: 460 - 6, h: 260 - 6, x: 3, y: 3}
            }
        }
    }

    _init(){
        this._setState('Items');
    }

    set item(v) {
        this._title =  v.title;
        this._date = v.date;
        this.tag('Title').patch({text: {text: this._title}, color: 0xff808080});
        this.tag('Image').patch({texture: App.cropImage({url: v.getPicture({w: 1100}).url, w: 460, h: 260}), alpha: 0.8});
        this.patch({
            Border: {
                Time: {
                    Label: {
                        text: {
                            text: this._date, color: 0xffF1F1F1, fontSize: 18, fontWeight: "bold",
                            lineHeight: 21,fontFamily: 'Roboto'
                        }
                    }
                },
                Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xff101010, w: 460 - 6, h: 260 - 6, x: 3, y: 3}
            },
        });
    }

    set index(index) {
        this._index = index;
    }

    get item() {
        return this._item;
    }

    _focus() {
        let y = this.tag('Title').getSmooth('y');
        this.tag('Image').patch({alpha:1})
        this.patch({
            Border: { alpha: 1,
                Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xffCB0000, w: 460 - 10, h: 260 - 10, x: 5, y: 5}
                },
        })
        this.tag('Title').patch({smooth:{y:[(y-30), { duration: 0.6} ], color: 0xfff1f1f1}});
    }

    _unfocus() {
        let y = this.tag('Title').getSmooth('y');
        this.tag('Image').patch({alpha:0.8})
        this.patch({
            Border: { alpha: 0,
                Border: {type: lng.components.BorderComponent, borderWidth: 5, colorBorder: 0xff101010, w: 460 - 6, h: 260 - 6, x: 3, y: 3}
                },
        })
        this.tag('Title').patch({smooth:{y: [(y+30), { duration: 0.6} ], color: 0xff808080}});
    }
}