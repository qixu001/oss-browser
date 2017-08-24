angular.module('web')
  .factory('stsSvs', ['$q','$state','AuthInfo','Toast','Const',
  function ( $q, $state, AuthInfo, Toast,Const ) {

    var ALYD = require('aliyun-sdk');
    return {
       assumeRole: assumeRole
    };

    /**
    * @param roleArn RoleArn is the role's ID. Rule's Id could be found in Roles > Role Details.
                     The format is： "acs:ram::1894189769722283:role/ramtestappreadonly"
    * @param policyStr It means the additional permission constraint of the role
                     For example：'{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}'
    * @param seconds  DurationSeconds is the STS token's expiration time, in seconds. The min is 900 and max is 3600.
    */
    function assumeRole(roleArn, policyStr, seconds){
      var sts = getClient();
      var df = $q.defer();

      // create AssumeRole request
      sts.assumeRole({
        Action: 'AssumeRole',
        // specified Arn
        RoleArn: roleArn,
        //set Token's policy. Before getting the token, by adding a policy, the token could be even restricted to a specific permission and scope.
        Policy: policyStr, //'{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}',
        //Set Token expiration time. By default is 3600
        DurationSeconds: seconds || 3600,
        RoleSessionName: 'oss-browser',// RoleSessionName is to mark the temp token's name. Generally speaking, we suggest to use app name for differentiation.
      }, function (err, result) {
        if(err){
          df.reject(err);
          handleError(err);
        }
        else{
          df.resolve(result);
        }
      });
      return df.promise;
    }

    function handleError(err) {
      if(err.code=='InvalidAccessKeyId'){
        $state.go('login');
      }
      else{
        if(!err.code){
          if(err.message.indexOf('Failed to fetch')!=-1){
            err={code:'Error',message:'Cannot connect'};
          }
          else err={code:'Error',message:err.message};
        }
        else if(err.message.indexOf('You are not authorized to do this action')!=-1){
          err={code:'Error',message:'No permission, '+err.message};
        }

        Toast.error(err.code+': '+err.message);
      }
    }

    function getClient(){

      var authInfo = AuthInfo.get();
      var ram = new ALYD.STS({
        accessKeyId: authInfo.id,
        secretAccessKey: authInfo.secret,
        endpoint: 'https://sts.aliyuncs.com',
        apiVersion: '2015-04-01'
      });
      return ram;
    }

  }])
  ;
