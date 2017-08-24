angular.module('web')
  .controller('renameModalCtrl', ['$scope','$uibModalInstance', '$translate','$uibModal','item', 'isCopy','currentInfo','moveTo', 'callback','ossSvs2','Dialog','Toast',
    function ($scope, $modalInstance, $translate, $modal, item, isCopy, currentInfo, moveTo, callback, ossSvs2, Dialog, Toast) {
      var T = $translate.instant;
      //console.log(item)
      angular.extend($scope, {
        currentInfo: currentInfo,
        moveTo: moveTo,
        item: item,
        isCopy: isCopy,
        keep: {
          name: item.name
        },
        cancel: cancel,
        onSubmit: onSubmit,
        reg: {
          folderName: /^[^\/]+$/
        },
        isLoading: false
      });

      function cancel() {
        $modalInstance.dismiss('close');
      }

      function onSubmit(form) {
        if (!form.$valid)return;

        if($scope.item.isFolder){
          var newPath = moveTo.key==''?item.name: (moveTo.key.replace(/(\/$)/,'') +'/' + item.name);
          newPath += '/';
          //console.log(item.path, newPath)
          if(item.path==newPath)return;

          var title = T('whetherCover.title'); //overwrite?
          var msg1 = T('whetherCover.message1'); //has the same folder, overwrite?
          var msg2 = T('whetherCover.message2'); //has the same file, overwrite?

          $scope.isLoading=true;
          ossSvs2.checkFolderExists(moveTo.region,moveTo.bucket, newPath).then(function(has){
            if(has){
              Dialog.confirm(title, msg1, function(b){
                if(b){
                  showMoveFolder(newPath);
                }else{
                  $scope.isLoading=false;
                }
              })
            }else{
              showMoveFolder(newPath);
            }
          }, function(err){
            $scope.isLoading=false;
          });
        }
        else{
          var newPath = moveTo.key=='' ? item.name : (moveTo.key.replace(/(\/$)/,'') +'/' + item.name);
          if(item.path==newPath)return;

          //suffix
          // if(path.extname(item.path)!=path.extname(newPath)){
          //   if(!confirm('Confirm to change the suffix?')){
          //     return;
          //   }
          // }

          $scope.isLoading=true;

          ossSvs2.checkFileExists(moveTo.region, moveTo.bucket,newPath).then(function(data){
            Dialog.confirm(title,msg2, function(b){
              if(b){
                renameFile(newPath);
              }else{
                $scope.isLoading=false;
              }
            })
          },function(err){
             renameFile(newPath);
          });
        }

      }
      function renameFile(newPath){
        var onMsg = T('rename.on');  //Renaming...
        var successMsg = T('rename.success'); //Rename succeeded

        Toast.info(onMsg);
        ossSvs2.moveFile(currentInfo.region, currentInfo.bucket, item.path, newPath, isCopy).then(function(){
          Toast.success(successMsg);
          $scope.isLoading=false;
          callback();
          cancel();
        }, function(){
          $scope.isLoading=false;
        });
      }

      function showMoveFolder(newPath){
        var successMsg = T('rename.success'); //Rename succeeded
        $modal.open({
          templateUrl: 'main/files/modals/move-modal.html',
          controller: 'moveModalCtrl',
          backdrop: 'static',
          resolve: {
            items: function () {
              return angular.copy([item]);
            },
            moveTo: function(){
              return angular.copy(moveTo);
            },
            renamePath: function(){
              return newPath;
            },
            isCopy: function () {
              return isCopy;
            },
            fromInfo: function () {
              return angular.copy(currentInfo);
            },
            callback: function () {
              return function () {
                Toast.success(successMsg);
                $scope.isLoading=false;
                callback();
                cancel();
              };
            }
          }
        });
      }
    }])
;
