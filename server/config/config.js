  //================================\\
 //============>Puerto<==============\\
//====================================\\

process.env.PORT = process.env.PORT || 3000;

  //================================\\
 //============>Entorno<=============\\
//====================================\\

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

  //================================\\
 //============>BD<==================\\
//====================================\\
let urlDB;

if(process.env.NODE_ENV == 'dev'){
  urlDB='mongodb://localhost:27017/cafe';
} else{
  urlDB='mongodb://cafe-user:#cafe-user2019@ds019058.mlab.com:19058/cafe'
}
process.env.URLDB=urlDB;
