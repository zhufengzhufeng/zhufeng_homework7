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
