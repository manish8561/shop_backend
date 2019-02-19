/* 
Common file for common function in express
*/
const md5 = require('md5');

const encodeMD5 = string => {
    return md5(string);
}




module.exports = {   
    encodeMD5
};