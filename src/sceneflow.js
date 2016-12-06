/*
 *  SceneFlow.js
 *  2014/11/28
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

phina.define("multi.SceneFlow", {
    superClass: "phina.game.ManagerScene",

    init: function() {
        this.superInit({
            startLabel: "splash",
            scenes: [{
                label: "splash",
                className: "multi.SplashScene",
                nextLabel: "title",
            },{
                label: "load",
                className: "multi.LoadingScene",
                arguments: {
                    assetType: "common"
                },
                nextLabel: "title",
            },{
                label: "title",
                className: "multi.TitleScene",
                nextLabel: "main",
            },{
                label: "main",
                className: "multi.MainScene",
            }],
        });
    }
});
