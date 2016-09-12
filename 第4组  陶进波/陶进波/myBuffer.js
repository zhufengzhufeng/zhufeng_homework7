var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');

Buffer.myConcat = function(list,length){
    if(typeof length == 'undefined'){
        length = 0;
        list.forEach(function(item){
            length += item.length;
        })
    }
    var result = new Buffer(length);
    var curOffset = 0;
    list.forEach(function(item){
        item.copy(result,curOffset);
        curOffset += item.length;
    });
    return result.slice(0,curOffset);
};
console.log(Buffer.myConcat([buf1,buf2,buf3,buf4],200).toString());