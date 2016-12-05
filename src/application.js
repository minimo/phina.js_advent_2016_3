/*
 *  Application.js
 *  2015/09/09
 *  @auther minimo  
 *  This Program is MIT license.
 */

multi = {};

phina.define("multi.Application", {
    superClass: "phina.display.CanvasApp",

	_static: {
        assets: {
            image: {
                "player": "assets/hiyocos.png",
                "shot":   "assets/shot.png",
            },
            font: {
                "azuki": "fonts/azuki.ttf",
            },
        },
    },

    //バックグラウンドカラー
    backgroundColor: 'rgba(0, 0, 0, 1)',

    init: function() {
        this.superInit({
            query: '#world',
            width: SC_W,
            height: SC_H,
        });
        this.firebase = new Firebase("https://multiplaytest.firebaseio.com/");
        this.fps = 60;
        var options = {
            assets: multi.Application.assets,
        };
        this.replaceScene(phina.game.LoadingScene(options));
    },

    update: function() {
        this.mouse.update();
        this.touch.update();
        this.touchList.update();
        this.keyboard.update();
    },
});
