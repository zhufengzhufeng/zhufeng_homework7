var http = require('http'),
    fs= require('fs'),
    url = require('url'),
    path = require('path');
var mime = {
        '.js':'application/javascript',
        '.css': 'text/css'
    };
var books = [
    {name:'nodejs',price:'60.00',count:10,id:1},
    {name:'nodejs1',price:'50.00',count:20,id:2},
    {name:'nodejs2',price:'40.00',count:30,id:3},
    {name:'nodejs3',price:'30.00',count:40,id:4},
    {name:'nodejs4',price:'20.00',count:50,id:5},
    {name:'nodejs5',price:'10.00',count:60,id:6}
];

http.createServer(function(req,res){
    //将url解析成对象
    var urlObj = url.parse(req.url,true);
    //获取请求路径
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./bookstore.html').pipe(res);
    }else if(/^\/book(\/\d+)?/.test(pathname)){
        // 正则 判断传进来的路径
        var method =  req.method;
        //console.log(method);
        var matcher = pathname.match(/^\/book\/(\w+)?/);
        //如果匹配成功 判断有没有id

        switch (method){
            case 'GET':
                if(matcher){
                    var id = matcher[1];
                    // 如果找到为true的则返回
                    var book = books.find(function (item) {
                        if(item.id == id){ //当id相同的时候 返回当前查到的哪项
                            return item;
                        }
                    });//如果查到返回 查到的哪项
                    res.end(JSON.stringify(book));
                }else {
                    res.end(JSON.stringify(books));
                }
                break;
            case 'DELETE':
                if(matcher){
                    var id = matcher[1];
                    books = books.filter(function (item) {
                       return item.id != id;
                    });
                    //console.log(books);
                    res.end(JSON.stringify({})); //删除后返回一个空对象；必须有返回内容
                }else {
                    books = [];
                    res.end(JSON.stringify({}));
                }
                break;
            case 'PUT':
                if(matcher) {
                    var id = matcher[1];
                    //获取请求体中的内容
                    var result = '';
                    req.on('data', function (data) {
                        result += data;
                    });
                    req.on('end', function () {
                        var newBook = JSON.parse(result);
                        //用新书替换旧书
                        books = books.map(function (item) {
                            if(item.id == id){
                                return newBook;
                            }
                            return item;
                        });
                        //修改后返回修改后的对象；
                        res.end(JSON.stringify(newBook));
                    });
                }
                break;

            case 'POST':
                var result = '';
                req.on('data', function (data) {
                    result += data;
                });
                req.on('end', function () {
                    result =JSON.parse(result);
                    result.id= Math.random();
                    books.push(result);
                    //修改后返回修改后的对象；
                    res.end(JSON.stringify(result));
                });
                break;
        }

        //res.end(JSON.stringify(books));
    }else{
        //先判断文件是否存在，如果存在则返回文件，不存在则返回404
        var flag = fs.existsSync('.'+pathname);
        if(flag){
            res.setHeader('Content-Type',mime[path.extname(pathname)]+';charset=utf8')
            fs.createReadStream('.'+pathname).pipe(res);
        }else {
            res.statusCode = 404;
            res.end('404');
        }
    }
}).listen(3000, function () {
    console.log('port 3000');
})
