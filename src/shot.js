/*
 *  shot.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.Shot", {
    superClass: "phina.display.DisplayElement",

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

        //自分が撃った弾か
        this.host = host;

        //Firebaseと同期する為のアクセサリ
        if (host) {
            this.firebase = multi.FireBaseSender(firebase).attachTo(this);
        } else {
            this.firebase = multi.FireBaseReceiver(firebase).attachTo(this);
        }
        this.key = this.firebase.key();

        this.sprite = phina.display.Sprite("shot", 16, 32)
            .addChildTo(this)
            .setFrameIndex(1)
            .setScale(2.0)
            .setRotation(90);

        //当り判定設定
        this.boundingType = "circle";
        this.radius = 16;

        this.vx = 0;
        this.vy = 0;

        this.tweener.setUpdateType('fps');
        this.time = 0;
    },

    update: function(app) {
        if (this.vx < 0) this.sprite.scaleY = -2;

        this.x += this.vx;
        this.y += this.vy;

        if (this.host) {
            this.firebase.setSendData({
                x: this.x,
                y: this.y,
                vx: this.vx,
                vy: this.vy,
                key: this.firebase.key(),
            });
        }

        if (this.x < -32 || this.x > SC_W+32) {
            this.remove();
        }

        this.time++;
    },

    damage: function() {
        return this;
    },

    setStatus: function(val) {
        this.x = val.x;
        this.y = val.y;
        this.vx = val.vx;
        this.vy = val.vy;
        return this;
    },

    setVelocity: function(x, y) {
        this.vx = x;
        this.vy = y;
        return this;
    },

    onremoved: function() {
        this.firebase.remove();
    }
});
