/**
 * Created by 宋翠平 on 2016/9/12.
 */
var buf1=new Buffer('加');
var buf2=new Buffer('油');
var buf3=new Buffer('吧');

Buffer.myConcat = function (list, length) {

    if (typeof length == "undefined") {
        length = 0;
        list.forEach(function (item) {
            length += item.length;
        });
    }
   
    var res = new Buffer(length),
        curOffset = 0;
    list.forEach(function (item) { 
        item.copy(res, curOffset);
        curOffset += item.length; 
    });
    return res.slice(0,curOffset);
};
console.log(Buffer.myConcat([buf1,buf2,buf3],100).toString());
