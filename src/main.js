/*
 *  main.js
 *  2016/02/26
 *  @auther minimo  
 *  This Program is MIT license.
 */

//phina.globalize();

//定数
SC_W = 640;
SC_H = 640;



//インスタンス
var app;

window.onload = function() {
    app = multi.Application();
    app.run();
    app.enableStats();
};

window.onbeforeunload = function() {
    app.unload();
};

//エレメント同士の接触判定
phina.display.DisplayElement.prototype.isHitElement = function(elm) {
    if (this.boundingType == 'rect') {
        if (elm.boundingType == 'rect') {
            return phina.collision.testRectRect(this, elm);
        } else {
            return phina.collision.testRectCircle(this, elm);
        }
    } else {
        if (elm.boundingType == 'rect') {
            return phina.collision.testCiecleRect(this, elm);
        } else {
            return phina.collision.testCircleCircle(this, elm);
        }
    }
}

//子要素全て切り離し
phina.app.Element.prototype.removeChildren = function(beginIndex) {
    beginIndex = beginIndex || 0;
    var tempChildren = this.children.slice();
    var len = len = tempChildren.length;
    for (var i = beginIndex; i < len; ++i) {
        tempChildren[i].remove();
    }
    this.children = [];
}
