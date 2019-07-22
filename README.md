# Daily-Journal
This is a blog website made using Node.js, Express, MongoDB, and EJS templating. The home page of the website uses EJS templating to use a for loop to look up all the existing posts and render them to the screen. The Blog Schema consists of a title, content, and a image buffer which is used to store the image. I am using lodash to create custom post routes so that whenever a new post is generated it has its own route where the whole post can be read. The "/compose" route can be used to compose a post and it consists of uploading a file for which I have added verification so that only image files are accepted. I am using multer npm package for image uploading and validation and to optimize performance I use "sharp" npm package to resize images. 

HOW TO RUN: You can view the project live at https://lit-shelf-33721.herokuapp.com/, or you can download the files and open the terminal and go into downloaded folder and run the command "npm i" to install all the required node modules. Then open a new terminal window and run the MongoShell command "mongod" to run the local database. Then run "node app.js" in the first window to run the application on localhost:3000.

PREVIEW:
![image](https://user-images.githubusercontent.com/46281169/61612672-a5d89b80-ac78-11e9-8f0f-493b85e456e3.png)
