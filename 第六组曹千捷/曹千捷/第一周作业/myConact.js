/**
 * Created by Administrator on 2016/9/11.
 */
Buffer.myConcat = function (list,len) {
  if (typeof len === 'undefined') {
      len=0;
      list.forEach(function (item) {
          len += item.length;
      })
  }
  var buffer = new Buffer(len),
      offset = 0;
  list.forEach(function (item) {
      item.copy(buffer,offset);
      offset += item.length;
  });
    return buffer.slice(0,offset);
};
var  buff1 = new Buffer('珠');
var  buff2 = new Buffer('峰');
var  buff3 = new Buffer('培');
var  buff4 = new Buffer('训');
console.log(Buffer.myConcat([buff1,buff2,buff3,buff4],10000).toString());