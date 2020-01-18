/**
 * Created by jiachenpan on 16/11/18.
 */

// 手机号验证
export function isValidTelphone(str) {
  var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
  var phone = str.trim()
  if (!phoneReg.test(phone)) {
    return false
  }
  return true
}

export function isValidUsername(str) {
  if (str === '') return false
  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 上传文件类型验证 */
export function validateImg(file) {
  let fileTypes = ['.jpg', '.png', '.jpeg', '.svg', '.gif'];
  let filePath = file;

  // 当括号里面的值为0、空字符、false 、null 、undefined的时候就相当于false
  if (filePath) {
    let isNext = false;
    let fileEnd = filePath.substring(filePath.indexOf('.'));
    for (let i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i] === fileEnd) {
        isNext = true;
        break;
      }
    }

    if (!isNext) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

