var buf1 = new Buffer('Öé');
var buf2 = new Buffer('·å');
var buf3 = new Buffer('Åà');
Buffer.myconcat = function(list,length){
    if(typeof length == 'undefined'){
        length = 0;
        list.forEach(function(item){
            length += item.length;
        })
    }
    var result = new Buffer(length),
        curOffset = 0;
    list.forEach(function(item){
        item.copy(result,curOffset);
        curOffset += item.length;
    });
    return result.slice(0,curOffset);
};
console.log(Buffer.myConcat([buf1,buf2,buf3],100).toString());