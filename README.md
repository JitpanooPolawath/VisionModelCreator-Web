# VisionModelCreator-Web
 A web application for creating a vision model using Flask and ReactJS.

 This web application allows users to create an account, log in, create a vision model with specific classes that they may need, and deploy them. The Vision model uses the Ultralytics Yolov8-world model, which is a computer vision model based on NLP and it has a deep understanding of the word context. 

 The Flask web server is deployed on AWS EC2, however, due to limited cash flow, the server can only run when the admin allows it to run. 

 The current code is still complete, with a fix need to it for a seamless connection to both frontend and backend.

 #Task needs to accomplish

 1) somehow make the React frontend connect with the AWS EC2 dynamic public IP address.
 2) for some reason the vision model won't get created in AWS (possibility - the venv is not running so the import is not working)
