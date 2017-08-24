angular.module('web')
  .controller('subAddressBarCtrl', ['$scope','$translate','Fav', 'AuthInfo','Toast','settingsSvs',
  function ($scope, $translate,Fav, AuthInfo,  Toast,settingsSvs) {

    var DEF_ADDR = AuthInfo.get().osspath;
      var T = $translate.instant;

    angular.extend($scope, {
      address: DEF_ADDR,
      subAddress: '/',
      goUp: goUp,
      go: go,
      goHome: goHome,
      saveDefaultAddress: saveDefaultAddress,
      getDefaultAddress:getDefaultAddress,

      isFav: isFav,
      toggleFav: toggleFav,

      //History, forward, back
      canGoAhead: false,
      canGoBack: false,
      goBack: goBack,
      goAhead: goAhead
    });


    function isFav(addr){
      return Fav.has(addr);
    }
    function toggleFav(addr){
      if(isFav(addr)){
        Fav.remove(addr);
        Toast.warn(T('bookmark.remove.success')); //'deleted bookmark'
      }
      else{
        var f = Fav.add(addr);
        if(f) Toast.success(T('bookmark.add.success'));//'Successfully added bookmark'
        else Toast.warn(T('bookmark.add.error1')); //'Failed to add the bookmark: Exceeding the limit'
      }
    }

    /************  start **************/
    var His = new function(){
      var arr = [];
      var index = -1;
      this.add = function(url){
        if(index>-1 && url==arr[index].url)return;

        if(index < arr.length-1) arr.splice(index+1, arr.length-index);

        arr.push({url:url,time:new Date().getTime()});
        index++;

        var MAX = settingsSvs.historiesLength.get();
        if(arr.length > MAX){
          arr.splice(MAX, arr.length-MAX);
          index = arr.length-1;
        }

        this._change(index, arr);
      };
      this.clear = function(){
        arr = [];
        index=-1;
        this._change(index, arr);
      };
      this.list = function(){
        return JSON.parse(JSON.stringify(arr));
      };
      this.goBack = function(){
        if(arr.length==0) return null;
        if(index>0){
          index--;
          this._change(index, arr);
        }
        return arr[index];
      };
      this.goAhead = function(){
        if(arr.length==0) return null;
        if(index<arr.length-1){
          index++;
          this._change(index,arr);
        }
        return arr[index];
      };

      //Monitor update
      this.onChange = function(fn){
        this._change = fn;
      };
    };

    His.onChange(function(index,arr){
      //console.log('histories changed:', index, arr)
      if(arr.length ==0 ){
        $scope.canGoBack = false;
        $scope.canGoAhead = false;
      }else{
        $scope.canGoBack = index > 0;
        $scope.canGoAhead = index < arr.length-1;
      }
    });

    function goBack(){
       var addr = His.goBack();
       //console.log('-->',addr);
       $scope.address = addr.url;
       $scope.subAddress = getSubAddress();
       $scope.$emit('ossAddressChange', addr.url);
    }
    function goAhead(){
       var addr = His.goAhead();
       //console.log('-->',addr);
       $scope.address = addr.url;
       $scope.subAddress = getSubAddress();
       $scope.$emit('ossAddressChange', addr.url);
    }
    /************ end **************/



    $scope.$on('filesViewReady',function(){

      goHome();

      $scope.$on('goToOssAddress', function(e, addr){
        console.log('on:goToOssAddress', addr);
        $scope.address = addr;
        $scope.subAddress = getSubAddress();
        go();
      });
    });


    function goHome(){
      $scope.address = getDefaultAddress();
      $scope.subAddress = getSubAddress();
      go(true);
    }

    //save the default address
    function saveDefaultAddress(){
      AuthInfo.saveToAuthInfo({address: $scope.address });
      Toast.success(T('saveAsHome.success'),1000); //'Save succeeds'
    }
    function getDefaultAddress(){
      var info = AuthInfo.get();
      return info['osspath'] || info['address'] || DEF_ADDR;
    }

    //Fix address
    function getAddress(){
      var addr = $scope.address;
      if(!addr){
        $scope.address = DEF_ADDR;
        $scope.subAddress = getSubAddress();
        length
        return DEF_ADDR;
      }

      if(addr==DEF_ADDR){
        return addr;
      }

      if(addr.indexOf(DEF_ADDR)!==0){
        addr = addr.replace(/(^\/*)|(\/*$)/g,'');
        $scope.address = addr ? (DEF_ADDR + addr + '/') : DEF_ADDR;
        $scope.subAddress = getSubAddress();
      }
      else{
        //$scope.address = $scope.address.replace(/(\/*$)/g,'') + '/';
      }
      return $scope.address;
    }

    //Browse
    function go(force) {
      var addr = getAddress();
      His.add(addr); //history
      console.log(addr)
      $scope.$emit('ossAddressChange', addr, force);
    }
    //Go up
    function goUp() {
      var addr = getAddress();
      if(addr==DEF_ADDR){
        return go();
      }

      addr = addr.substring(DEF_ADDR.length);
      addr = addr.replace(/(^\/*)|(\/*$)/g,'');

      var arr = addr.split('/');

      arr.pop();
      if(arr.length===0){
        addr = DEF_ADDR;
      }
      else{
        addr = DEF_ADDR + arr.join('/') + '/';
      }
      $scope.address = addr;
      $scope.subAddress = getSubAddress();
      go();
    }

    function getSubAddress(addr){
      addr = addr || $scope.address;
      addr = addr.substring(DEF_ADDR.length);
      return addr=='/'?'/':'/'+addr;
    }


  }]);
