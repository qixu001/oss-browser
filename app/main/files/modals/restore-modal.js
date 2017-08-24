angular.module('web')
  .controller('restoreModalCtrl', ['$scope','$uibModalInstance', '$translate','ossSvs2','item','currentInfo', 'callback','Toast','safeApply',
    function ($scope, $modalInstance, $translate, ossSvs2,  item, currentInfo, callback, Toast, safeApply) {
      var T = $translate.instant;
      angular.extend($scope, {
        currentInfo: currentInfo,
        item: item,
        info: {
          days: 1,
          msg: null
        },
        cancel: cancel,
        onSubmit: onSubmit
      });

      init();
      function init(){
        $scope.isLoading =true;
        ossSvs2.getFileInfo(currentInfo.region, currentInfo.bucket, item.path).then(function(data){
          if(data.Restore){
            var info = parseRestoreInfo(data.Restore);
            if(info['ongoing-request']=='true'){
              $scope.info.type = 2;
              //$scope.info.msg = 'The file is being restored, please wait！';
            }else{
              $scope.info.type = 3;
              $scope.info.expiry_date = info['expiry-date'];
              //$scope.info.msg = 'Expiration time：'+ info['expiry-date']
            }
          }
          else{
            $scope.info.type = 1;
            // $scope.info.msg = null;
          }

          $scope.isLoading = false;
          safeApply($scope);
        });
      }

      function parseRestoreInfo(s){
        //"ongoing-request="true"
        var arr = s.match(/([\w\-]+)=\"([^\"]+)\"/g);
        var m={};
        angular.forEach(arr, function(n){
          var kv = n.match(/([\w\-]+)=\"([^\"]+)\"/);
          m[kv[1]] = kv[2];
        });
        return m;
      }

      function cancel() {
        $modalInstance.dismiss('close');
      }

      function onSubmit(form1) {
        if(!form1.$valid)return;

        var days = $scope.info.days;

        Toast.info(T('restore.on'));//'submit restore...'
        ossSvs2.restoreFile(currentInfo.region, currentInfo.bucket, item.path, days).then(function(){
          Toast.success(T('restore.success')); //'restore request has been submitted'
          callback();
          cancel();
        });

      }
    }])
;
