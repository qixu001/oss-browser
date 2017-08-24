angular.module('web')
  .factory('utilSvs', ['$timeout', function ($timeout) {

     return {
       leftTime: leftTime
     }

     function leftTime(ms){
       if(isNaN(ms)){
         return '';
       }
       if(ms<=0)return 0;
       else if(ms < 1000) return ms+'ms';

       //return moment.duration(ms).humanize();
       var t=[];

       var d = Math.floor(ms/24/3600/1000);
       if(d){
         ms = ms-d*3600*1000*24;
         t.push(d+' day');
       }
       var h = Math.floor(ms/3600/1000);
       if(h){
         ms = ms-h*3600*1000;
         t.push(h+' hour');
       }
       var m = Math.floor(ms/60/1000);
       if(m){
         ms = ms-m*60*1000;
         t.push(m+' minute');
       }
       var s = Math.floor(ms/1000);
       if(s){
         ms = ms-s*1000;
         t.push(s+' sec');
       }
       //
       //if(ms){
       //  t.push(ms+'ms');
       //}
       return t.join(' ');
     }
  }
]);
