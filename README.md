# hot-ts-server

### https证书创建过程(mac系统)
1. 构建私钥private.pem  
openssl genrsa -out private.pem 1024  
参数说明  
genrsa——使用RSA算法产生私钥  
-out——输出文件的路径  
1024——指定私钥长度  
2. 生成CRS证书签名  
openssl req -new -key private.pem -out csr.pem  -subj "/C=CN/ST=myprovince/L=mycity/O=myorganization/OU=mygroup/CN=myname"  
参数说明:  
req——执行证书签发命令  
-new——新证书签发请求  
-key——指定私钥路径  
-out——输出的csr文件的路径  
-subj——证书相关的用户信息(subject的缩写)
3. 自签发证书文件(cer文件)  
openssl x509 -req -days 365 -sha1 -extensions v3_ca -signkey private.pem -in csr.pem -out ca.cer  
参数说明：  
x509——生成x509格式证书  
-req——输入csr文件  
-days——证书的有效期（天）  
-sha1——证书摘要采用sha1算法  
-extensions——按照openssl.cnf文件中配置的v3_ca项添加扩展  
-signkey——签发证书的私钥  
-in——要输入的csr文件  
-out——输出的cer证书文件  
4. 大功告成
