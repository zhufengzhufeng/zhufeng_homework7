Buffer.myConcat=function (list,length){
    if(typeof length=='undefined'){
        length =0;
        list.forEach(function (item){
            length+=item.length;
        });
    }
    var result=new Buffer(length),
        curOffset=0;
    list.forEach(function (item){
        item.copy(result,curOffset);
        curOffset+=item.length;
    });
    return result.slice(0,curOffset);
};
