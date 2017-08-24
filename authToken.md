# Auth token is supported

Two functions:

1. Use AliCloud's STS service to get a temparary auth token.

2. Use the STS auth token to login the OSS browser.

Detail: https://help.aliyun.com/document_detail/31953.html

Steps: https://help.aliyun.com/knowledge_detail/39709.html


## 1. STS Auth Token format

```
var opt = {
  id: '',
  secret: '',
  stoken: '',
  privilege: '',
  expiration: '',
  osspath: ''
};

//toString
opt = JSON.stringify(opt);

//base64 encode
Buffer.from(opt, 'base64').toString();
```

Check out: [app/main/files/modals/grant-token-modal.js](app/main/files/modals/grant-token-modal.js)

> For example:

```json
opt = '{"id":"STS.L22SegXykmifaRjJedn84M7AP","secret":"8QiicbVBuqqrmi67J9Zcfvv6stRV8DQ81N22Y4tHTguB","stoken":"CAISqAN1q6Ft5B2yfSjIrfGHGN/TtaZK2quNY3TbrmUxYrcYovLqsjz2IHxKfHJtBewWv/8+mWhY7PwZlqJ0UIQAT1bDctB99MyUAcRF1cmT1fau5Jko1bc6cAr6Umz3vqL7Z+H+U6mqGJOEYEzFkSle2KbzcS7YMXWuLZyOj+wIDLkQRRLqL0AUZrFsKxBltdUROFbIKP+pKWSKuGfLC1dysQcO/wEL4K+kkMqH8Uic3h+oxfIcoYv6IoWiKMVtMJY4EaVWtY4bX67F1zEqqnou3axqjatC1C7at9WGeTd46AmHNOymi78IKxRiNIw7ALJjpvrxnuFjwLex8b760BFQJ+pYfj3CTYS7uqv+FfiuK8wyeMSEWQnE2cvdMYLu4UF2IyAUKQpMdNEhN3kKQ35OcS3AK6mo3FHJb33BTLOegpks3JR03yeIn7SGJlSOBPe7qX9DZcVsNRJybEJOgTS5LPI8HlYSIw89NdG8Vp5uaR1Sk6TssDDJWzdopnMt5KGgP6iL5vxPON6uA8oWi9BGfuxJrmIsQBHwUKnrl18Qc2VpUV+kbHdOw0/VGoABRDWg97jYd9C3pp5cHlkvszm5bC1NDHDz4FB1VS3/MydYv8cOXtwnBf81Q+Nq9EpPH/I0Nfylujvau26Vk11OuRoSwOLiu9SVElNUoLjEQuP29y92Um2y68846IksoKsars9htnQUFCw7+stjIUMDHhLPrRNGzAn0ygK0I6LZp7Y=","expiration":"2017-08-14T16:20:21Z","region":"oss-cn-hangzhou","osspath":"oss://guangchun/didi/","privilege":"all"}';

Buffer.from(opt, 'base64').toString();
```
