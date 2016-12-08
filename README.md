# Mean-Stack-Shopping-Cart
Mean Stack Shopping cart with User Role's and Permission using JWT Tokens.From this MEAN App , you can learn how to authenticate your API's with JSON web token , Maintaining User Role's and Permission at Url level to secure API's from Unauthorized Access as well as how to Show/Hide different views for different User roles.So Lets start with Mean stack Shoppingcart app setup.

As this Application is only for learning purpose so it is developed for developer's only to understand concept and make use of it if they found it usefull in any terms.

To see this Application in Action you need to follow below steps :

1) Download Node and mongodb setup , after that install on your local machine.

2) Run mongod.exe from CMD or from mongodb installation path(C:/Program Files) to start Database.

3) After Installation process, goto ShoppingCart folder From CMD. 

4) In CMD, Type 'npm install' to install all Node modules.

5) If Everything goes fine , type 'node server.js' in CMD to run server. If it start properly then it will give you message 'Server is running on address http://127.0.0.1 on port 3000'.

6) GOTO Browser and Type '127.0.0.1:3000' or 'localhost:3000'. Congratulations Your app is in working conditions and you can proceed further to learn from it, to play with it, to find faluts or anything you want.

To understand this MEAN Stack application and get full use of it please read below.

Mainly there are Three Roles in this MEAN app which are :

1) Admin role - Admin role can do everything in this application.He can see User details , able to update user Details and delete them. Admin role can also see all product details and can update them and delete them.  

To make admin role in this application. Goto Register link placed at Top-Right Corner and give fill all details with username - 'admin'. TO make a user admin its username must be 'admin' (lowercase) and no other user can have same username in this application.

For ease we make username - 'admin' and password - 'admin'.


2) Product Handler role - ProductHandler role can do all product related stuff as name indicating that.He can see product details , update them , delete them and create new products.


To make 'productHandler' role in this application. Goto Register link placed at Top-Right Corner and give fill all details with username - 'productHandler'. To make a user 'Product Handler'  its username must be 'productHandler' (lowercase) and no other user can have same username in this application.

For ease we make username - 'productHandler' and password - 'productHandler'.


