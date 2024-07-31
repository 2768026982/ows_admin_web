// import $http from './httpRequest'
import i18n from './lang'
let langList = '';
//用戶狀態
let userIsValid = [{
  name: '啓用',
  value: 1
}, {
  name: '禁用',
  value: 0
}];
//問題類型
let questionState = [
//     {
//   name: i18n.t('modules.accredit.list.license'),
//   //'未處理',
//   value: 0,
//   color: 'danger'
// },
  {
  name: '待追蹤',
  value: 1,
  color: ''
}, {
  name: '待回覆',
  value: 2,
  color: ''
}, {
  name: '已接案',
  value: 3,
  color: 'success'
}, {
  name: '已指派',
  value: 4,
  color: 'success'
}, {
  name: '結案',
  value: 5,
  color: 'info'
}];
//優先度
let priorityList = [{
  name: '高',
  value: 0,
  color: 'danger'
}, {
  name: '中',
  value: 1,
  color: ''
}, {
  name: '低',
  value: 2,
  color: 'success'
}];

//排序方式
var sortList = [{
  name: '建立時間：由新到舊',
  value: 0,
}, {
  name: '建立時間：由舊到新',
  value: 1,
}, {
  name: '優先度：由高到低',
  value: 2,
}, {
  name: '優先度：由低到高',
  value: 3,
}, {
  name: '更新時間：由新到舊',
  value: 4,
}, {
  name: '更新時間：由舊到新',
  value: 5,
}];
//帳號狀態
var statusList = [{
  name: '正式帳號',
  code: '0',
}, {
  name: '測試帳號',
  code: '1',
}];
//性别
var sexList = [{
    name: '男',
    value: '10',
  },
  {
    name: '女',
    value: '20',
  },
  {
    name: '其它',
    value: '30',
  }
];
//分公司可見
var visibleBranches = [{
  name: '不可見',
  value: '0',
}, {
  name: '可見',
  value: '1',
}];


//-----------------------數位教程 start---------------------------
// 課程下拉列表數據
let lessonList = [{
    key: '1',
    value: 'Lesson 1'
  },
  {
    key: '2',
    value: 'Lesson 2'
  },
  {
    key: '3',
    value: 'Lesson 3'
  },
  {
    key: '4',
    value: 'Lesson 4'
  },
  {
    key: '5',
    value: 'Lesson 5'
  },
  {
    key: '6',
    value: 'Lesson 6'
  },
  {
    key: '7',
    value: 'Lesson 7'
  },
  {
    key: '8',
    value: 'Lesson 8'
  },
  {
    key: '9',
    value: 'Lesson 9'
  },
  {
    key: '10',
    value: 'Lesson 10'
  },
  {
    key: '11',
    value: 'Lesson 11'
  },
  {
    key: '12',
    value: 'Lesson 12'
  },
  {
    key: '13',
    value: 'Lesson 13'
  },
  {
    key: '14',
    value: 'Lesson 14'
  },
  {
    key: '15',
    value: 'Lesson 15'
  },
  {
    key: '16',
    value: 'Lesson 16'
  },
  {
    key: '17',
    value: 'Lesson 17'
  },
  {
    key: '18',
    value: 'Lesson 18'
  },
  {
    key: '19',
    value: 'Lesson 19'
  },
  {
    key: '20',
    value: 'Lesson 20'
  },
  {
    key: '21',
    value: 'Lesson 21'
  },
  {
    key: '22',
    value: 'Lesson 22'
  },
  {
    key: '23',
    value: 'Lesson 23'
  },
  {
    key: '24',
    value: 'Lesson 24'
  },
  {
    key: '25',
    value: 'Lesson 25'
  },
  {
    key: '26',
    value: 'Lesson 26'
  },
  {
    key: '27',
    value: 'Lesson 27'
  },
  {
    key: '28',
    value: 'Lesson 28'
  },
  {
    key: '29',
    value: 'Lesson 29'
  },
  {
    key: '30',
    value: 'Lesson 30'
  },
  {
    key: '31',
    value: 'Lesson 31'
  },
  {
    key: '32',
    value: 'Lesson 32'
  },
  {
    key: '33',
    value: 'Lesson 33'
  },
  {
    key: '34',
    value: 'Lesson 34'
  },
  {
    key: '35',
    value: 'Lesson 35'
  }
];
// 等級下拉列表數據
let levelList = [{
    key: '1',
    value: 'Level 1'
  },
  {
    key: '2',
    value: 'Level 2'
  },
  {
    key: '3',
    value: 'Level 3'
  },
  {
    key: '4',
    value: 'Level 4'
  },
  {
    key: '5',
    value: 'Level 5'
  },
  {
    key: '6',
    value: 'Level 6'
  },
  {
    key: '7',
    value: 'Level 7'
  },
  {
    key: '8',
    value: 'Level 8'
  },
  {
    key: '9',
    value: 'Level 9'
  }
];
/**
 * 確認狀態
 */
let confirmStatusList = [{
    key: '0',
    value: '停用'
  },
  {
    key: '1',
    value: '啟用'
  },
];


/**
 * 審核狀態
 */
let auditStatusList = [{
    key: '0',
    value: '未審核'
  },
  {
    key: '2',
    value: '審核通過'
  },
  {
    key: '3',
    value: '審核不通過'
  }
];

let structureTypeList = [{
    key: '1',
    value: '固定詞組'
  },
  {
    key: '2',
    value: '句型結構'
  }
];
/**
 * 語係
 */
let languageList = [{
    key: 'eng',
    value: '英文'
  },
  {
    key: 'jpn',
    value: '日文'
  },
  {
    key: 'th',
    value: '泰文'
  },
  {
    key: 'deu',
    value: '德文'
  },
  {
    key: 'esp',
    value: '西班牙文'
  },
  {
    key: 'kor',
    value: '韓文'
  },
  {
    key: 'fra',
    value: '法文'
  },
  {
    key: 'rus',
    value: '俄文'
  },
  {
    key: 'ptb',
    value: '葡萄牙語'
  },
  {
    key: 'ita',
    value: '義大利語'
  },
  {
    key: 'csy',
    value: '捷克文'
  },
  {
    key: 'plk',
    value: '波蘭語'
  },
  {
    key: 'trk',
    value: '土耳其文'
  },
  {
    key: 'hun',
    value: '匈牙利文'
  },
  {
    key: 'cn',
    value: '中文'
  }
];



/**
 * 教程下拉列表
 */
let levelTypeList = [{
    key: 'NPC I',
    value: 'NPC I'
  },
  {
    key: 'NPC II',
    value: 'NPC II'
  },
  {
    key: 'NPC III',
    value: 'NPC III'
  },
  {
    key: 'NPC IV',
    value: 'NPC IV'
  },
  {
    key: 'NICD II',
    value: 'NICD II'
  },
  {
    key: 'NICD II',
    value: 'NICD II'
  },
  {
    key: 'NICD III',
    value: 'NICD III'
  },
  {
    key: 'NICD IV',
    value: 'NICD IV'
  }
];
/**
 * 生字課程
 */
let wordLevelTypeList = [{
    key: 'NPC',
    value: 'NPC'
  },
  {
    key: 'NICD',
    value: 'NICD'
  }
];
/**
 * 語法點詞性內容
 */
let partTypeList = [{
    key: '1',
    value: '必要生詞必要生词'
  },
  {
    key: '2',
    value: '必要生字'
  },
  {
    key: '3',
    value: '必要句子'
  },
  {
    key: '4',
    value: '必要詞性'
  },
  {
    key: '5',
    value: '非必要生詞'
  },
  {
    key: '6',
    value: '非必要生字'
  },
  {
    key: '7',
    value: '非必要句子'
  },
  {
    key: '8',
    value: '非必要詞性'
  },
  {
    key: '9',
    value: '標點符號'
  },
  {
    key: '10',
    value: '任意字'
  },
];
/**
 * 標點符號
 */
let punctuationList = [{
    key: '。',
    value: '。'
  },
  {
    key: '?',
    value: '?'
  },
  {
    key: '!',
    value: '!'
  },
  {
    key: ',',
    value: ','
  },
  {
    key: '、',
    value: '、'
  },
  {
    key: ';',
    value: ';'
  },
  {
    key: ':',
    value: ':'
  },
  {
    key: '......',
    value: '......'
  },

];

/**
 * 是否展示
 */
let showStatusList = [{
    key: '0',
    value: '否'
  },
  {
    key: '1',
    value: '是'
  }
];

/**
 * @description value值拼接成 value1（value2）
 * @param value1 value2
 * */
export function valueConcat(value1: string | undefined, value2: string | undefined) {
  if ((value1 == '' || value1 == undefined) && value2 == '' || value2 == undefined) {
    return '';
  }
  return value1 + '(' + value2 + ')';
}

/**
 * @description 通過key值篩選得到對應的對象
 * @param ary 要篩選的數組
 * @param key 篩選數組中藥對應的key值
 *
 * */
export function filterValue(ary: any[] | null, key: any) {
  var value = "";
  if (ary != null && ary.length > 0) {
    ary.forEach((item, index) => {
      if (item.key == key) {
        value = item.value;
        return false;
      }
    });
  }

  return value
}

//-----------------------數位教程 end---------------------------

/**
 * @description 取得第一個字符
 * @param text
 * */
export function getFirstText(text: string | null) {
  if (text != null && text !== '') {
    return text.substr(0, 1);
  }
}

/**
 * @description 對象格式化 防止修改一個對象，另一個賦值的對象被修改；
 * @param obj 要格式化的對象
 * */
export function formatObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @description 通過key值篩選得到對應的對象值筛选得到对应的对象
 * @param ary 要篩選的數組
 * @param key 篩選數組中要對應的key值
 * @param value 篩選條件 如果key的value值與 入參value相等 則返回該對象
 * */
export function filterObj(ary: any[], key: string | number, value:any) {
  var obj = {field1: '',
    langTypeId: '',
    langTypeName: '',
    primeLanguage: ''};
  if (ary != null && ary.length > 0 && value != '') {
    ary.forEach((item:any) => {
      if (item[key] == value) {
        obj = item;
        return false;
      }
    });
  }
  return obj
}

export function filterObjGetIndex(ary: any[] | null, key: string | number, value: string) {
  var obj = "";
  if (ary != null && ary.length > 0 && value != '') {
    ary.forEach((item, index) => {
      if (item[key] == value) {
        obj = index+'';
        return false;
      }
    });
  }

  return obj
}

//tag使用：根據key 篩選出顯示的Name
export function filter_forName(ary: any[] | null, key: string | number, value: string) {

  var obj = "";
  if (ary != null && ary.length > 0 && value != '') {
    ary.forEach((item) => {
      if (item[key] == value) {
        obj = item;
        return false;
      }
    });
  }
  return obj.name
}

export function filter_forProp(ary: any[] | null, key: string | number, value: string, prop: string | number) {
  var obj;
  if (ary != null && ary.length > 0 && value != '') {
    ary.forEach((item) => {
      if (item[key] == value) {
        obj = item[prop];
        return false;
      }
    });
  }
  return obj
}

//tag使用：根據key 篩選出顯示的color
export function filter_forColor(ary: any[] | null, key: string | number, value: string) {
  var obj = "";
  if (ary != null && ary.length > 0 && value != '') {
    ary.forEach((item) => {
      if (item[key] == value) {
        obj = item;
        return false;
      }
    });
  }
  return obj.color
}

/**
 * @description 數字格式化 數字小於9則補零
 * @param num 要格式化的數字
 * */
export function numFormat(num: string | number) {
  return num > 9 ? num : '0' + num;
}

/**
 * @description 解決文件下載時，a標籤的href屬性默認是瀏覽而不是下載的問題
 * @param url:接口返回的文件路徑 XXX.png     fileName:文件名稱
 * */
export function downLoadFile(url, fileName) {
  var request = new XMLHttpRequest();
  request.timeout = 30000;
  request.responseType = "blob";
  request.open("GET", url);
  request.onload = function() {
    var url = window.URL.createObjectURL(this.response);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
  }
  request.send();
}

/**
 * @description 導出Excel
 * */
export function exportFile(data: BlobPart, fileName: string, call: () => void) {
  let blob = new Blob([data], {
    type: 'application/xlsx'
  });
  let url = window.URL.createObjectURL(blob)
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  if (call) {
    call();
  }
}
export function exportFileByStream(data: BlobPart, fileName: string, type: any) {
  let blob = new Blob([data], {
    type: type
  })
  let url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}


/**
 * @description 文件大小  kb轉換為其他單位
 * @size 文件大小
 * */
export function getFileSize(size: any) {
  if (size <= 0)
    return '';
  var num = 1024.00; //byte
  if (size < num)
    return size + "B";
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(1) + "K";
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(1) + "M";
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(1) + "G";
  return (size / Math.pow(num, 4)).toFixed(1) + "T";
}
/**
 * @description 獲取文件名稱
 * 例如：http://localhost:8088/tli-character/image/SQ00001_NPC1_RW_1-6_SC2.mp3
 * @param str
 */
export function getFileName(str: string | null | undefined) {
  if (str == '' || str == undefined || str == null) {
    return '';
  }
  var index = str.lastIndexOf("\/");
  return str.substr(index + 1, str.length);
}
/**
 * @description 獲取文件名，去掉後面的後綴
 * 例：http://localhost:8001/proxyApi/image/offline/9f1c85b2537646c58027c3dea050bdbb.png
 * @param str
 */
export function getFileUrl(str: string | null | undefined) {
  if (str == '' || str == undefined || str == null) {
    return '';
  }
  // var index = str .lastIndexOf("\/");
  // return str .substring(index + 1, str.length-4);
  let urls = str.split("/");
  // 獲取文件名並拆分
  let fileNames = urls[urls.length - 1].split(".");
  return fileNames[0];
}


//將對象中的一個字段提取變成一個數組
export function getAry_forProp(list: string | any[], prop: string | number) {
  var ary = [];
  for (var i = 0; i < list.length; i++) {
    ary.push(list[i][prop]);
  }
  return ary;
}
/**
 * @description 將數組轉成字符串拼接格式 分隔符，
 * @param list
 */
export function getString_FromArray(list: any[] | null) {
  var string = '';
  if (list != null && list.length > 0) {
    list.forEach((item, i) => {
      string += item;
      //最後一個後面不要拼逗號
      if (i != list.length - 1) {
        string += ',';
      }
    });
  }
  return string;
}
/**
 * @description 將數組轉成字符串拼接格式 分隔符;
 * @param list
 */
export function getString_FromArray3(list: any[] | null) {
  var string = '';
  if (list != null && list.length > 0) {
    list.forEach((item, i) => {
      string += item;
      //最後一個後面不要拼分號
      if (i != list.length - 1) {
        string += ';';
      }
    });
  }
  return string;
}

/**
 * @description 將數組轉成字符串拼接格式 分隔符;
 * @param list
 * @param prop
 */
export function getString_FromArray2(list: string | any[] | null, prop: string | number) {
  var string = '';
  if (list != null && list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      string += list[i][prop];
      if (i != list.length - 1) {
        string += ';';
      }
    }
  }
  return string;
}
/**
 * @description 將帶有分隔符的字符串轉成數組
 * @param str
 * @param punctuation
 */
export function getArray_FromString(str: string | null | undefined, punctuation: any) {
  var value = '';
  if (str != null && str != undefined && str != '') {
    value = str.split(punctuation)
  }
  return value;
}

/**
 * 字符串每四位分隔成數組
 * @param str
 * @returns {Array}
 */
export function getArraySplitFour(str: { trim: () => { (): any; new(): any; match: { (arg0: RegExp): never[]; new(): any; }; }; }) {
  var array = [];
  array = str.trim().match(/.{1,4}/g) || [];
  return array;
}

// export function getBlob(resourceId, call) {
//   if (!isEmpty(resourceId)) {
//     //圖片文件路徑
//     $http({
//       url: $http.adornUrl(`common/resource/view/${resourceId}`),
//       method: 'get',
//       params: {},
//       responseType: 'blob' // 服务请求类型
//     }).then(({
//       data
//     }) => {
//       let blob = new Blob([data]);
//       const URL = window.URL || window.webkitURL;
//       const fileUrl = URL.createObjectURL(blob);
//       if (call) {
//         call(fileUrl);
//       }
//     })
//   } else {
//     if (call) {
//       call("");
//     }
//   }
// }

// export function getFileByResourceId(resourceId, fileName, call) {
//   if (!isEmpty(resourceId)) {
//     //圖片文件路徑
//     $http({
//       url: $http.adornUrl(`common/resource/view/${resourceId}`),
//       method: 'get',
//       params: {},
//       responseType: 'blob' // 服务请求类型
//     }).then(({
//                data
//              }) => {
//       let blob = new Blob([data]);
//       const URL = window.URL || window.webkitURL;
//       const fileUrl = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = fileUrl;
//       link.download = fileName;
//       link.click();
//       URL.revokeObjectURL(fileUrl);
//       if (call) {
//         call();
//       }
//     })
//   } else {
//     if (call) {
//       call();
//     }
//   }
//
// }
//下載文件
// export function getFileByBlob(resourceId, fileName, call) {
//   if (!isEmpty(resourceId)) {
//     //圖片文件路徑
//     $http({
//       url: $http.adornUrl(`common/resource/uploadFile/view/${resourceId}`),
//       method: 'get',
//       params: {},
//       responseType: 'blob' // 服务请求类型
//     }).then(({
//       data
//     }) => {
//       let blob = new Blob([data]);
//       const URL = window.URL || window.webkitURL;
//       const fileUrl = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = fileUrl;
//       link.download = fileName;
//       link.click();
//       URL.revokeObjectURL(fileUrl);
//       if (call) {
//         call();
//       }
//     })
//   } else {
//     if (call) {
//       call();
//     }
//   }
//
// }
//仅下载
export function getFileByBlobUrl(blobUrl: string, fileName: string, call: () => void) {
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(blobUrl);
  if (call) {
    call();
  }
}
//系統管理：訪問日誌的下載
// export function getBlobDownLoad(filePath, fileName, call) {
//   $http({
//     url: $http.adornUrl(`common/resource/viewFileByPath`),
//     method: 'post',
//     data: { //文件路徑
//       logFilePath: filePath,
//       //文件名稱
//       logFileName: fileName
//     },
//     responseType: 'blob' // 服务请求类型
//   }).then(({
//     data
//   }) => {
//     let blob = new Blob([data]);
//     const URL = window.URL || window.webkitURL;
//     const fileUrl = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = fileUrl;
//     link.download = fileName;
//     link.click();
//     URL.revokeObjectURL(fileUrl);
//     if (call) {
//       call();
//     }
//   })
// }
//根據文件完整路徑下載文件
// export function getFileByCompletePath(filePath, fileName, call) {
//   $http({
//     url: $http.adornUrl(`common/resource/viewFileByCompletePath`),
//     method: 'post',
//     data: { //文件路徑
//       logFilePath: filePath,
//       //文件名稱
//       logFileName: fileName
//     },
//     responseType: 'blob' // 服务请求类型
//   }).then(({
//     data
//   }) => {
//     let blob = new Blob([data]);
//     const URL = window.URL || window.webkitURL;
//     const fileUrl = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = fileUrl;
//     link.download = fileName;
//     link.click();
//     URL.revokeObjectURL(fileUrl);
//     if (call) {
//       call();
//     }
//   })
// }
//判斷參數是否爲空
export function isEmpty(val: string | any[] | null | undefined) {
  if (val === "" || val === undefined || val === null) {
    return true;
  } else {
    if (Array.isArray(val) && val.length == 0) {
      return true;
    } else {
      return false;
    }

  }
}
/**
 * 處理以數組格式出現的時間段，放置對象中
 * 例 timeRange=['2022/11/09','2022/11/30']
 * 處理成 timeStart='2022/11/09'; timeEnd='2022/11/30';
 * @param range
 * @param obj
 * @param start
 * @param end
 * */
export function formatRangeTime(range: string | any[] | null, obj: { [x: string]: any; }, start: string | number, end: string | number) {
  if (range == null || range.length === 0) {
    obj[start] = "";
    obj[end] = "";
  } else {
    obj[start] = range[0];
    obj[end] = range[1];
  }
}

/**
 * 删除当条数据后是否需要返回上一页
 * @param param 表格数据对象
 */
export function hasReturnToPreviousPage(param: { tableList: string | any[]; pageIndex: number; }) {
  const currentTableLength = param.tableList.length;
  // 如果当前table list 的长度为1 则表示 当前被删除的数据为 当前页最后一条数据
  if (currentTableLength === 1 && param.pageIndex > 1) {
    //此时需要将当前页码 进行-1 操作 不过需要注意 当前页码如果小于等于1 的话 则不进行-1操作
    param.pageIndex--;
  }
}

/**
 * 校验字段
 * @param obj 需要赋值的对象
 * @param value 需要校验的字段名
 * @param rule 正则
 */
export function keyupClear(obj: { [x: string]: string; }, value: string | number, rule: any) {
  obj[value] = obj[value].replace(rule, '');
}

export default {
  userIsValid,
  questionState,
  priorityList,
  sortList,
  statusList,
  sexList,
  formatObj,
  filterObj,
  filterObjGetIndex,
  filter_forName,
  filter_forProp,
  filter_forColor,
  numFormat,
  downLoadFile,
  getFileSize,
  getFirstText,
  getAry_forProp,
  langList,
  getFileName,
  getString_FromArray,
  getString_FromArray2,
  getString_FromArray3,
  valueConcat,
  lessonList,
  levelList,
  confirmStatusList,
  auditStatusList,
  languageList,
  levelTypeList,
  partTypeList,
  structureTypeList,
  punctuationList,
  wordLevelTypeList,
  showStatusList,
  filterValue,
  getArray_FromString,
  getFileUrl,
  getArraySplitFour,
  // getBlob,
  // getBlobDownLoad,
  // getFileByBlob,
  getFileByBlobUrl,
  exportFileByStream,
  isEmpty,
  // getFileByCompletePath,
  visibleBranches,
  formatRangeTime,
  hasReturnToPreviousPage,
  keyupClear,
  // getFileByResourceId
}
