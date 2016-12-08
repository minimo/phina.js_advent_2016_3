/*
 *  FireBaseLinker.js
 *  2014/09/05
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.Firebase = phina.Firebase || {};

phina.define("phina.Firebase.Receiver", {
    superClass: "phina.accessory.Accessory",

    _stop: false,
    _val: null,

    init: function(firebaseObject) {
        this.superInit();
        this.firebase = firebaseObject;

        this._val = {};

        //firebaseと情報を同期
        this.firebase.on('value', function(snap) {
            if (this._stop) return;
            var v = snap.val();
            this._val.$safe(v);
        }.bind(this));
        this.firebase.on('child_changed', function(snap) {
            if (this._stop) return;
            this._val[snap.key()] = snap.val();
        }.bind(this));
    },

    start: function() {
        this._stop = true;
        return this;
    },

    stop: function() {
        this._stop = false;
        return this;
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

    _stop: false,
    _data: null,

    init: function(firebaseObject) {
        this.superInit();
        this.firebase = firebaseObject;
        this._data = {};
    },

    start: function() {
        this._stop = true;
        return this;
    },

    stop: function() {
        this._stop = false;
        return this;
    },

    update: function() {
        if (this._stop) return;
        this.firebase.update(this._data);
    },

    setSendData: function(data) {
        this._data = data || {};
        return this;
    },

    remove: function() {
        this.target.detach(this);
        this.target = null;
        this.firebase.remove();
        return this;
    },

    key: function() {
        return this.firebase.key();
    },

    val: function() {
        return this._data;
    },
});
