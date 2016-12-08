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
            }
        },
    },

    init: function() {
        this.superInit({
            query: '#world',
            width: SC_W,
            height: SC_H,
            backgroundColor: 'rgba(0, 0, 0, 1)',
        });
        this.firebase = new Firebase("https://multiplaytest.firebaseio.com/");

        this.fps = 60;

        this.replaceScene(multi.SceneFlow());
    },

    update: function() {
        this.mouse.update();
        this.touch.update();
        this.touchList.update();
        this.keyboard.update();
    },

    unload: function() {
        this.currentScene.unload();
    },
});

phina.define("multi.SceneFlow", {
    superClass: "phina.game.ManagerScene",

    init: function() {
        this.superInit({
            startLabel: "load",
            scenes: [{
                label: "load",
                className: "phina.game.LoadingScene",
                arguments: {
                    assets: multi.Application.assets
                },
                nextLabel: "main",
            },{
                label: "main",
                className: "multi.MainScene",
            }],
        });
    }
});
