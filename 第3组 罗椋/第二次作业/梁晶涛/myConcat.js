
Buffer.myConcat = function(ary,length){
    isNaN(length) ? length = null && ary.forEach(function (item){ length += item.length }) : null;
    var result = new Buffer(length);
    var indexOffset = 0;
    ary.forEach( function (item){ item.copy(result, indexOffset);  indexOffset +=item.length; });

    return  length  >= indexOffset ? result.slice(0,indexOffset):result.slice(0,length);
};
console.log(Buffer.myConcat([buffer10,buffer11,buffer12,buffer13],6));