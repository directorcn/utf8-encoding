module.exports = function(string){
    var UTF8 = [];
    var byte = 1;
    var flag = true;
    var chars = string.split('');
    for (var i = 0; i < chars.length; i++) {
        var bit = chars[i].codePointAt().toString(2);
        if (bit.length <= 7) {
            byte = 1;
            if (!flag) flag = true;  
            var len = 7 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }  
        }
        if (bit.length >= 8 && bit.length <= 11) {
            byte = 2;
            var len = 11 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }
        }  
        if (bit.length >= 12 && bit.length <= 16) {
            byte = 3;
            var len = 16 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }
        }
        if (bit.length >= 17 && bit.length <= 21) {
            byte = 4;
            var len = 21 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }
        }
        if (bit.length >= 22 && bit.length <= 26) {
            byte = 5;
            var len = 26 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }
        }
        if (bit.length >= 27 && bit.length <= 31) {
            byte = 6;
            var len = 31 - bit.length;
            while (len > 0) {
                bit = '0' + bit;
                len--;
            }
        }
        var base = 5 * (byte - 1);
        while (byte > 0) {
            var binary = '0b';
            var index = base;
            if (flag) {
                var byteNum = byte;
                var value = '';
                var isHighest = true; // 最高位0
                while (byteNum > 0) {
                    if (isHighest) {
                        value = '0' + value;
                        isHighest = false;
                    }
                    if (byte > 1) value = '1' + value;
                    byteNum--;   
                }
                UTF8.push(binary + value + bit.slice(0, 8 - value.length));
                flag = false;
                byte--;
                continue;
            }  
            if (byte > 0) {
                var temp = index - 6 > 0 ? bit.slice(index - 6, index) : bit.slice(-6);
                UTF8.push(binary + '10' + temp);
            }
            base -= 6;
            byte--;
            if (!byte) flag = true;
        }
    }
    return UTF8;
}
