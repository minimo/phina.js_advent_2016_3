/*
 *  player.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.Player", {
    superClass: "phina.display.DisplayElement",

    firebase: null,
    key: null,

    labelParam: {
        fill: "white",
        stroke: "blue",
        strokeWidth: 2,

        fontFamily: "azuki",
        align: "center",
        baseline: "middle",
        fontSize: 32,
        fontWeight: ''
    },

    init: function(firebase, host) {
        this.superInit();
        this.host = host || false;

        //Firebaseと同期する為のアクセサリ
        if (host) {
            this.firebase = phina.Firebase.Sender(firebase).attachTo(this);
        } else {
            this.firebase = phina.Firebase.Receiver(firebase).attachTo(this);
        }
        this.key = this.firebase.key();

        this.sprite = phina.display.Sprite("player", 32, 32)
            .addChildTo(this)
            .setFrameIndex(0)
            .setScale(2.0);
        this.name = phina.display.Label({text: (this.host?"You": " ")}.$safe(this.labelParam))
            .addChildTo(this)
            .setPosition(0, -32);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 32;

        this.vx = 0;
        this.vy = 0;
        this.jump = false;

        this.tweener.setUpdateType('fps');
        this.time = 0;
    },

    update: function(app) {
        if (this.time % 5 == 0) {
            this.sprite.frameIndex += 1;
            this.sprite.frameIndex = this.sprite.frameIndex%3+1
        }

        if (this.host) {
            this.firebase.setSendData({
                x: this.x,
                y: this.y,
                scaleX: this.sprite.scaleX,
                key: this.firebase.key(),
            });
        } else {
            var v = this.firebase.val();
            this.setStatus(v);
        }

        //移動範囲の制限
        this.x = Math.clamp(this.x, 16, SC_W-16);
        if (this.y > SC_H*0.7) {
            this.jump = false;
            this.y = SC_H*0.7;
        }

        this.time++;
    },

    damage: function() {
    },

    setStatus: function(val) {
        this.x = val.x;
        this.y = val.y;
        this.sprite.scaleX = val.scaleX;
    },

    onremoved: function() {
        this.firebase.remove();
    },
});
