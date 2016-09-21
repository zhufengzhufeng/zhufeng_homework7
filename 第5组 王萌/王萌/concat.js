
//作业 写一个concat方法
//首先判断是否传入length，没有传入length 获取总长度
    //通过长度构建一个大buffer
    //将每一个小buffer拷贝到大buffer中
    //每次拷贝后重新计算索引
    //将组成的大buffer返回，并且截取有效内容
Buffer.myconcat = function (list ,length) {
    if(!length){
        length=0;
         list.forEach(function(item){
              length += item.length;
         });
        //console.log(length);
    }
    var buffer = new Buffer(length);
    var len = 0;
    list.forEach(function (item) {
        new Buffer(item).copy(buffer,len);
        len += item.length;
    });
    return  buffer.slice(0,len);
};
var buf1 = new Buffer('珠');
var buf2 = new Buffer('峰');
var buf3 = new Buffer('培');
var buf4 = new Buffer('训');
console.log(Buffer.myconcat([buf1,buf2,buf3,buf4],0).toString());
console.log(Buffer.myconcat([buf1,buf2,buf3,buf4],3).toString());
console.log(Buffer.myconcat([buf1,buf2,buf3,buf4],10000).toString());