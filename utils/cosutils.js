/**
 *  腾讯云COS文件上传
 */
const COS = require('cos-js-sdk-v5');

/**
 * 生成UUID
 * @returns {string}
 */
function generateUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export function ossUpload(file,filePath){

    if(!filePath)
    {
        filePath="."
    }
    //先设置个文件名
    let index = file.name.lastIndexOf(".");
    let suffix = file.name.substring(index+1);
    let fileName = generateUUID()+suffix;

    let cos = new COS({
        SecretId: 'AKID430pFraiRjQxaro2ZfMW8CMv1JIOQSCE',
        SecretKey: 'ICLJN4GxWkxeqs4Khk9AB281KCnNcrNV',
    });
    // 分片上传
    cos.sliceUploadFile({
        Bucket: 'test-1250000000', // Bucket 格式：test-1250000000
        Region: 'ap-guangzhou',
        Key: fileName,
        FilePath: filePath+"/"+fileName
    }, function (err, data) {
        console.log(err,data);
        return {
            err:err,
            data:data
        }
    });
}