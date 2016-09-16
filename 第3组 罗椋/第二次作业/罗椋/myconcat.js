/**
 * Created by apple on 16/9/12.
 */

//取消第二个参数,计算获取长度,则所得结果长度没有问题且无需进行截取（无法指定所得buffer长度）

//可能用户需要自行指定buffer长度,不要截取,以便下一次修改或新增

Buffer.myconcat = function (list, length) {
    if (length == undefined) {
        var tempLength = 0;
        list.forEach(function (item) {
            if (item.constructor == Buffer) {
                tempLength += item.length;
            }
        });
        length = tempLength;
    }

    var buffer = new Buffer(length),
        offset = 0;
    list.forEach(function (item) {
        if (item.constructor == Buffer) {
            item.copy(buffer, offset, 0, item.length);
            offset += item.length;
        }
    });
    return buffer.slice(0,length);
};


var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');

var list = [buf1,buf2,buf3,buf4];

var buf = Buffer.myconcat(list,12);
console.log(buf.toString());