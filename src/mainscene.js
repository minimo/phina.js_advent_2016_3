/*
 *  MainScene.js
 *  2015/09/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("multi.MainScene", {
    superClass: "phina.display.DisplayScene",

    init: function() {
        this.superInit();

        //オブジェクト管理レイヤ
        this.objLayer = phina.display.DisplayElement().addChildTo(this);

        //Firebase接続
        this.objects = app.firebase.child("objects");

        //プレイヤーID取得
        this.playerFB = this.objects.push({
            type: "player",
            name: "test",
            age: 0,
            x: SC_W*0.5,
            y: SC_H*0.5,
        });
        this.player = multi.Player(this.playerFB, true)
            .addChildTo(this.objLayer)
            .setPosition(Math.randint(SC_W*0.1, SC_W*0.9), SC_H*0.5);

        //セッションキー(プレイヤーのFirebase.key)
        this.sessionKey = this.playerFB.key();

        var that = this;
        this.objects.on("child_added", function(snap) {
            var key = snap.key();
            var val = snap.val();
            if (key != that.sessionKey && val.key != that.sessionKey) {
                var firebase = that.objects.child(key);
                if (val.type == "player") {
                    multi.Player(firebase, false).addChildTo(that.objLayer).setStatus(val);
                }
                if (val.type == "shot") {
                    multi.Shot(firebase, false).addChildTo(that.objLayer).setStatus(val);
                }
            }
        });
        this.objects.on("child_removed", function(snap) {
            var key = snap.key();
            this.objLayer.children.forEach(function(c) {
                if (key == c.key) c.remove();
            });
        }.bind(this));

        this.enemies = [];
        this.shots = [];

        this.time = 0;
    },

    update: function(app) {
        this.controlPlayer();
        this.time++;
    },

    //プレイヤー操作
    controlPlayer: function() {
        var p  = this.player;
        var kb = app.keyboard;
        if (kb.getKey("left")) {
            p.vx = -5;
            p.sprite.scaleX = 2;
        }
        if (kb.getKey("right")) {
            p.vx = 5;
            p.sprite.scaleX = -2;
        }
        if (kb.getKey("up") && !p.jump) {
            p.vy = -20;
            p.jump = true;
        }
        if (kb.getKeyDown("space")) {
            var vx = -3*p.sprite.scaleX;
            var vy = 0;
            var firebase = this.objects.push({
                type: "shot",
                x: p.x,
                y: p.y,
                vx: vx,
                vy: 0,
                key: this.sessionKey,
            });
            var s = multi.Shot(firebase, true).addChildTo(this)
                .setPosition(p.x, p.y)
                .setVelocity(vx, vy);
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.9;
        p.vy += 0.9;
    },

    //タッチorクリック開始処理
    onpointstart: function(e) {
    },

    //タッチorクリック移動処理
    onpointmove: function(e) {
    },

    //タッチorクリック終了処理
    onpointend: function(e) {
    },

    //終了時処理
    unload: function() {
        this.playerFB.remove();
        this.removeChildren();
    },
});
