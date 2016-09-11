var buffer= new Buffer("高山");
console.log(buffer);  //  e9 ab 98 e5 b1 b1
console.log((0xe9).toString(2));  //11101001
console.log((0xab).toString(2));  //10101011
console.log((0x98).toString(2));  //10011000
console.log((0xe5).toString(2));  //11100101
console.log((0xb1).toString(2));  //10110001
console.log((0xb1).toString(2));  //10110001

//  11101001   10101011  10011000  11100101  10110001  10110001

//  00111010    00011010   00101110  00011000   00111001  00011011   00000110    00110001

console.log(parseInt("00111010",2));   //58
console.log(parseInt("00011010",2));   //26
console.log(parseInt("00101110",2));   //46
console.log(parseInt("00011000",2));   //24
console.log(parseInt("00111001",2));   //57
console.log(parseInt("00011011",2));   //27
console.log(parseInt("00000110",2));   //6
console.log(parseInt("00110001",2));   //49

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
str+='0123456789';
str+='+/';

console.log(str[58]+str[26]+str[46]+str[24]+str[57]+str[27]+str[6]+str[49]);   //6auY5bGx