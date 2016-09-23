var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var querystring = require('querystring');
var books = [
    {name:'nodeJs',price:22,id:1,count:1},
    {name:'angularJs',price:45,id:2,count:3},
    {name:'reactJs',price:65,id:3,count:2},
    {name:'vueJs',price:165,id:4,count:1},
];
var app = http.createServer(function (req,res) {
    var urlObj = require('url').parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname=='/book'){
        //判断是增删改查的哪一个
        var method = req.method; //获取请求的方法(method大小为大写)
        switch (method){
            case 'GET':
                var id= urlObj.query.id;
                var onebook;
                if(id) {
                    books.forEach(function (item,index) {
                        if(item.id == id) {
                            onebook = books.slice(index,index+1);
                        }
                    });
                    res.end(JSON.stringify(onebook));
                }
                res.end(JSON.stringify(books));
                break;
            case 'PUT':
                var str = '';
                req.on('data',function (data) {
                    str += data;
                });
                req.on('end',function () {
                    var id = urlObj.query.id;
                    var newBook = querystring.parse(str);
                    books = books.map(function (item) {
                        if(item.id == id) {
                            newBook.id = item.id;
                            newBook.count = item.count;
                            return newBook;
                        }
                        return item;
                    });
                    res.end(JSON.stringify({msg:'success',data:newBook}));
                });
                break;
            case 'POST':
                //增加注册的用户
                //获取请求体中的数据,需要监听data事件
                var str = '';
                req.on('data',function (data) {
                    str+=data;
                });
                req.on('end',function () {
                    //查询字符串a=1&b=2  {a:1,b:2}
                    var obj = querystring.parse(str);
                    obj.id = books[books.length-1].id+1;
                    obj.count = Math.round(Math.random()*10);
                    books.push(obj);
                    //注册成功后将所有用户返回给客户端
                    res.end(JSON.stringify(books));
                });
                break;
            case 'DELETE':
                //找到要删除的某一个通过索引进行删除
                var id = urlObj.query.id;
                //返回过滤后的内容
                books=books.filter(function (item) {
                    console.log(item.id,id);
                    return item.id!=id;
                });
                res.end(JSON.stringify({success:'done'}));
                break;
        }
    }else{
        var flag = fs.existsSync('.'+pathname);
        if(flag){
            res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
            fs.createReadStream('.'+pathname).pipe(res);
        }else{
            var _http_server  = require('_http_server').STATUS_CODES;
            var status = 404;
            res.statusCode = status;
            res.end(_http_server[status]);
        }
    }
});
app.listen(3000);
