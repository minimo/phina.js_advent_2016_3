/*
 *  FireBaseLinker.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.Firebase = phina.Firebase || {};

phina.define("phina.Firebase.Receiver", {
    superClass: "phina.accessory.Accessory",

    _val: null,

    init: function(firebaseObject) {
        this.superInit();
        this.firebase = firebaseObject;

        this._val = {};

        //firebaseと情報を同期
        this.firebase.on('value', function(snap) {
            var v = snap.val();
            this._val.$safe(v);
        }.bind(this));
        this.firebase.on('child_changed', function(snap) {
            this._val[snap.key()] = snap.val();
        }.bind(this));
    },

    key: function() {
        return this.firebase.key();
    },

    val: function() {
        return this._val;
    },
});

phina.define("phina.Firebase.Sender", {
    superClass: "phina.accessory.Accessory",

    data: null,

    init: function(firebaseObject) {
        this.superInit();
        this.firebase = firebaseObject;
        this.data = {};
    },

    update: function() {
        this.firebase.update(this.data);
    },

    setSendData: function(data) {
        this.data = data || {};
    },

    remove: function() {
        this.target.detach(this);
        this.target = null;
        this.firebase.remove();
    },

    key: function() {
        return this.firebase.key();
    },

    val: function() {
        return this.data;
    },
});
