var buf1 = new Buffer('好');
var buf2 = new Buffer('好');
var buf3 = new Buffer('学');
var buf4 = new Buffer('习');
Buffer.myConcat = function (list,length){
    if(typeof length == 'undefined'){
        length = 0;
        list.forEach(function (item){
            length += item.length;
        })
    }
    var res = new Buffer(length),
        curOffset = 0;
    list.forEach(function (item){
        item.copy(res,curOffset);
        curOffset += item.length;
    })
    return res.slice(0,curOffset);
}
console.log(Buffer.myConcat([buf1,buf2,buf3,buf4],100).toString());





