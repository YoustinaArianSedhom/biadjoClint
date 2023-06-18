var CryptoJS = require("crypto-js");
import JsonFile from "./JsonFile.json";
/* eslint-disable */
export default {
  async encrypt(input) {
    return new Promise((resolve, reject) => {
      var file = input;
      var reader = new FileReader();
      reader.onload = input => {
        var iv = CryptoJS.lib.WordArray.random(16);

        var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);

        var salt = CryptoJS.lib.WordArray.random(16);

        var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), salt, {
          keySize: JsonFile.keySize,
          iterations: JsonFile.Iterations
        });

        var wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray

        // var Base64 = CryptoJS.enc.Base64.parse();
        var Base64 = CryptoJS.enc.Base64.stringify(wordArray);

        // var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
        var encrypted = CryptoJS.AES.encrypt(Base64, key, {
          mode: CryptoJS.mode.CBC,
          iv: iv,
          padding: CryptoJS.pad.Pkcs7
        });

        encrypted.toString();
        var Jsonvalue = {};
        Jsonvalue.salt = salt.toString(CryptoJS.enc.Base64);
        Jsonvalue.iv = iv.toString(CryptoJS.enc.Base64);
        Jsonvalue.cipherText = encrypted.toString();

        var request = Jsonvalue;

        var filename = file.name + ".txt";

        Object.defineProperty(file, "name", {
          writable: true,
          value: filename
        });

        var fileEnc = new Blob([JSON.stringify(request)], {
          type: "text/plain"
        }); // Create blob from string

        // var a = document.createElement("a");
        // var url = window.URL.createObjectURL(fileEnc);
        // a.href = url;
        // a.download = filename;
        // a.click();
        // window.URL.revokeObjectURL(url);
        var newFile = new File([JSON.stringify(request)], filename);
        resolve(newFile);
      };
      reader.readAsArrayBuffer(file);
    });
  },
  decrypt(input) {
    let fileExtension = input.personalPictureName.substr(
      0,
      input.personalPictureName.length - 4
    );
    input = JSON.parse(input.picData);

    var iv = CryptoJS.enc.Base64.parse(input.iv).toString(CryptoJS.enc.Hex);
    iv = CryptoJS.enc.Hex.parse(iv);

    var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);

    var Salt = CryptoJS.enc.Base64.parse(input.salt);

    var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
      keySize: JsonFile.keySize,
      iterations: JsonFile.Iterations
    });

    var decrypted = CryptoJS.AES.decrypt(input.cipherText, key, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    });
    fileExtension = fileExtension.split(".").pop();

    var XX = decrypted.toString(CryptoJS.enc.Utf8);

    var Image = `data:image/${fileExtension};base64,` + XX;
    return Image;
  }
  // convertWordArrayToUint8Array(wordArray) {
  //   var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
  //   var length = wordArray.hasOwnProperty("sigBytes")
  //     ? wordArray.sigBytes
  //     : arrayOfWords.length * 4;
  //   var uInt8Array = new Uint8Array(length),
  //     index = 0,
  //     word,
  //     i;
  //   for (i = 0; i < length; i++) {
  //     word = arrayOfWords[i];
  //     uInt8Array[index++] = word >> 24;
  //     uInt8Array[index++] = (word >> 16) & 0xff;
  //     uInt8Array[index++] = (word >> 8) & 0xff;
  //     uInt8Array[index++] = word & 0xff;
  //   }
  //   return uInt8Array;
  // }
};
