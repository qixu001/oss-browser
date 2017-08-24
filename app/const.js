
angular.module('web')
.factory('Const', [function(){

  function getStorageClasses(f){
    var storageClasses = [
      {value:'Standard',name: 'Standard'}, //Standard
      {value:'IA',name: 'Infrequent Access'} //IA
    ];
    switch(f){
      case 3: return storageClasses.concat([{value:'Archive',name: 'Archive'}]); //Archive type
      case 2: return storageClasses;
      default: return [{value:'Standard',name: 'Standard'}]; //Standard
    }
  }


  return {
    AUTH_INFO_KEY: 'auth-info',
    AUTH_HIS: 'auth-his',
    AUTH_KEEP: 'auth-keep',
    KEY_REMEMBER: 'auth-remember',
    SHOW_HIS: 'show-his',

    REG: {
      EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    },

    bucketACL: [
      {acl:'public-read',label: 'public read'}, //public read
      {acl:'public-read-write',label: 'public read write'}, //publicv read write
      {acl:'private',label: 'private'} //private
    ],

    //https://help.aliyun.com/document_detail/31837.html
    regions: [
      {id: 'oss-cn-hangzhou', label: "East China 1(Hangzhou)", storageClasses: getStorageClasses(3)},
      {id: 'oss-cn-shanghai', label: 'East China 2(Shanghai)', storageClasses: getStorageClasses(2)},
      {id: 'oss-cn-qingdao', label: 'North China 1(Qingdao)', storageClasses: getStorageClasses(2)},
      {id: 'oss-cn-beijing', label: 'North China 2(Beijing)', storageClasses: getStorageClasses(3)},
      {id: 'oss-cn-zhangjiakou', label: 'North China 3(Zhangjiakou)', storageClasses: getStorageClasses(2)},
      {id: 'oss-cn-shenzhen', label: 'South China 1(Shenzhen)', storageClasses: getStorageClasses(3)},
      {id: 'oss-cn-hongkong', label: 'Hongkong', storageClasses: getStorageClasses(2)},

      {id: 'oss-ap-southeast-1', label: 'Asia Pacific Southeast 1(Singapore)', storageClasses: getStorageClasses(2)},
      {id: 'oss-ap-southeast-2', label: 'Asia Pacific Southeast 2(Sydney)', storageClasses: getStorageClasses(2)},
      {id: 'oss-ap-northeast-1', label: 'Asia Pacific Northeast 1(Tokyo)', storageClasses: getStorageClasses(0)},

      {id: 'oss-us-west-1', label: 'Western US 1(Silicon Valley)', storageClasses: getStorageClasses(2)},
      {id: 'oss-us-east-1', label: 'Eastern US 1(Virginia)',storageClasses: getStorageClasses(2)},
      {id: 'oss-eu-central-1', label: 'Eastern US 1(Virginia)',storageClasses: getStorageClasses(2)},
      {id: 'oss-me-east-1', label: 'Eastern US 1(Virginia)',storageClasses: getStorageClasses(0)},
    ],

    countryNum: [
      {"label":"中国大陆(+86)","value":"86"},
      {"label":"香港(+852)","value":"852"},
      {"label":"澳门(+853)","value":"853"},
      {"label":"台湾(+886)","value":"886"},
      {"label":"韩国(+82)","value":"82"},
      {"label":"日本(+81)","value":"81"},
      {"label":"美国(+1)","value":"1"},
      {"label":"加拿大(+1)","value":"1"},
      {"label":"英国(+44)","value":"44"},
      {"label":"澳大利亚(+61)","value":"61"},
      {"label":"新加坡(+65)","value":"65"},
      {"label":"马来西亚(+60)","value":"60"},
      {"label":"泰国(+66)","value":"66"},
      {"label":"越南(+84)","value":"84"},
      {"label":"菲律宾(+63)","value":"63"},
      {"label":"印度尼西亚(+62)","value":"62"},
      {"label":"德国(+49)","value":"49"},
      {"label":"意大利(+39)","value":"39"},
      {"label":"法国(+33)","value":"33"},
      {"label":"俄罗斯(+7)","value":"7"},
      {"label":"新西兰(+64)","value":"64"},
      {"label":"荷兰(+31)","value":"31"},
      {"label":"瑞典(+46)","value":"46"},
      {"label":"乌克兰(+380)","value":"380"}
    ]
  }
}])
;
