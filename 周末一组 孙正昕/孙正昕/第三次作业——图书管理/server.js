/**
 * Created by sunzhengxin on 16/9/19.
 */
var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var querystring=require('querystring');
var books=[{ bookname: 'js', bookprice: '55', id: 0.2869526885303413 },{ bookname: 'node.js',
    bookprice: '60',
    id: 0.17699818335436657 }];
var server1=http.createServer(function(req,res){
    var urlObj=require('url').parse(req.url,true);//以键值对的方式存储
    var pathname=urlObj.pathname;
    if(pathname=='/'){
        res.setHeader('Content-type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname=='/book'){
        var method=req.method;
        var id=urlObj.query.id;
        var data=null;
        switch(method){
            case 'GET':
                if(id){
                    books.forEach(function(item,index){
                        if(item.id==id){
                            console.log(item);
                            data=item;
                        }
                    });
                    var result={
                        success:'done',
                        data:data
                    };
                    res.end(JSON.stringify(result));
                }else{
                    res.end(JSON.stringify(books));
                }
                break;
            case 'PUT':
                //修改书名信息
                var str='';
                req.on('data',function(data){
                    str+=data;
                });
                req.on('end',function(){
                    console.log(str);
                    var obj=querystring.parse(str);
                    console.log(obj);
                    books.forEach(function(item,index){
                        if(item.id==obj.bookid){
                            console.log(item);
                            item.bookname=obj.bookname2;
                            item.bookprice=obj.bookprice2;
                        }
                    });
                });
                console.log(books);
                res.end(JSON.stringify(books));
                break;
            case 'POST':
                //增加书
                var str='';
                req.on('data',function(data){
                    str+=data;
                });
                console.log('str'+str);
                req.on('end',function(){
                    var obj=querystring.parse(str);
                    obj.id=Math.random();
                    books.push(obj);
                });
                console.log(books);
                res.end(JSON.stringify(books));
                break;
            case 'DELETE':
                console.log(books);
                books=books.filter(function(item,index){
                    return item.id!=id;
                });
                console.log(books);
                res.end(JSON.stringify({success:'done'}));
                break;
        }
    }else{
        var flag=fs.existsSync('.'+pathname);
        if(flag){
            res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
            fs.createReadStream('.'+pathname).pipe(res);
        }else{
            var _http_server=require('_http_server').STATUS_CODES;
            var status=404;
            res.statusCode=status;
            res.end(_http_server[status]);
        }
    }
});
server1.listen(12345);