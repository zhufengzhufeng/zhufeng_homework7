var buf1= new Buffer("高山");
var buf2= new Buffer("流水");
var buf3= new Buffer("竹子");

Buffer.myWay=function(list,length){
    if(typeof length=="undefined"){
        length=0;
        list.forEach(function(item){
            length+=item.length;
        })
    }
    var buffer= new Buffer(length);
    var num=0;
    list.forEach(function(item){
        item.copy(buffer,num,0,item.length);
        num+=item.length;
    });
    return buffer.slice(0,num);
};

var result=Buffer.myWay([buf1,buf2,buf3],50);
console.log(result.toString());
