/**
 * Created by Administrator on 2016/9/11.
 */
var buf1=new Buffer('大');
var buf2=new Buffer('家');
var buf3=new Buffer('好');
Buffer.myConcat=function(list,len){
    if(typeof len=='undefined'){
        len=0;
        list.forEach(function(item){
            len+=item.length;
        })
    };
    var buffer=new Buffer(len),
        curOffset=0;
    list.forEach(function(item){
        item.copy(buffer,curOffset);
        curOffset+=item.length;
    });
    return buffer.slice(0,curOffset);
};

console.log(Buffer.myConcat([buf1,buf2,buf3],9).toString());
