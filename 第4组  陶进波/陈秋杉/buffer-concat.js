/**
 * Created by Administrator on 2016/9/12.
 */
//多个buffer拼接到一起
Buffer.myConcat = function (list,length) {
    if(length == 0){
        list.forEach(function (item) {
            length += item.length;
        })
    }
    var newBuffer = new Buffer(length);
    var curOffset = 0;
    list.forEach(function (item) {
        item.copy(newBuffer,curOffset);
        curOffset += item.length;
    });
    return newBuffer.slice(0,curOffset);
};
var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');
console.log(Buffer.myConcat([buf1,buf2,buf3,buf4],0).toString());





