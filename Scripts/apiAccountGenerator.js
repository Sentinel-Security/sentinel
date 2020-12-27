module.exports = {

acct: function (length) {
 var result           = '';
 var characters       = '1234567890';
 var charactersLength = characters.length;
 for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}}