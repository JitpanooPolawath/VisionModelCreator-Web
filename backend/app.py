from flask import Flask,  request , send_from_directory ,send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
import re
from model import printALL
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///database.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class users(db.Model):
    __tablename__ = "user_account"

    _id = db.Column("id",db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

class metaModel(db.Model):
    __tablename__ = "metaModel"

    _id= db.Column("modeID",db.Integer, primary_key=True)
    model = db.Column(db.String(20))
    name = db.Column(db.String(100))
    classes = db.Column(db.String(1000))
    usrModel = db.Column(ForeignKey('user_account.id'))

    def __init__(self, model, Name, Classes, userID ):
        self.model = model
        self.name = Name
        self.classes = Classes
        self.usrModel = userID


def deleteAll():
    found_user = users.query.all()
    found_model = metaModel.query.all()
    print(found_user)
    print(found_model)
    for user in (found_user):
        db.session.delete(user)
    db.session.commit()
    for model in (found_model):
        db.session.delete(model)
    db.session.commit()
    print(found_user)
    print(found_model)

with app.app_context():
    db.create_all()  
    # deleteAll()    

@app.route("/api/delete", methods=['POST'])
def deleteModel():
    name = request.json['Name']
    act = request.json['actID']
    
    found_model = metaModel.query.filter_by(usrModel=act).first()
    if found_model:
        file_path = "./savedModel/"+ name +"-"+ str(act) + ".pt"
        print(file_path)
        if os.path.exists(file_path):
            os.remove(file_path)
    return {}

@app.route("/download/<filename><ID>.pt", methods=['GET'])
def download_file(filename, ID):
    modelName = filename+"-"+ str(ID) + ".pt"
    # if not os.path.exists(file_path):
    #     return "File", "false"
    return send_from_directory("./savedModel/",modelName)

@app.route("/api/buildModel", methods=['POST'])
def buildModel():
    if request.method == "POST":
        model = request.json['model']
        name = request.json['Name']
        classes = request.json['classes']
        act = request.json['actID']

        found_model = metaModel.query.filter_by(_id=act).first()
        if found_model:
            printALL(name,model, classes, str(act))

            return {"success" :"true"}

        else:
            return {"success" :"false"}
            




@app.route("/api/createModel", methods=['POST', 'GET'])
def createModel():
    if request.method == "POST":
        model = request.json['model']
        name = request.json['Name']
        classes = request.json['classes']
        userID = request.json['id']

        if(model == ""):
            return{
                'success': "false"
            }
        if(name == ""):
            return{
                'success': "false"
            } 
        if(classes == ""):
            return{
                'success': "false"
            }  



        found_user = users.query.filter_by(_id=userID).first()
        if found_user:
            tempModel = metaModel(model, name, classes, userID)
            db.session.add(tempModel)
            db.session.commit()
            return{
                'success': "true"
            }
        else:
            return{
                'problem': "existed",
                'success': "false"
            }
    return{
                'success': "false"
            }


@app.route("/api/viewModel", methods=['POST', 'GET'])
def viewModel():
    if request.method == "POST":
        userID = request.json['userID']

        found_user = users.query.filter_by(_id=userID).first()
        found_model = metaModel.query.filter_by(usrModel=userID).all()
        models_list = list()
        for i,model in enumerate(found_model):
            tempDict = {"id": i, "Name": model.name, "Classes": model.classes, "Model": model.model, "Download": model._id}
            models_list.append(tempDict)
        
        if found_user:
            return{
                'models': models_list,
                'success': "true"
            }
        else:
            return{
                'success': "false"
            }
    return{
                'success': "false"
            }



@app.route("/api/signingUp", methods=['POST','GET'])
def save_login():
    if request.method == "POST":
        userName = request.json['username']
        userEmail = request.json['email']
        userPassword = request.json['password']
        regex = r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        regexP = r"^.{6,}$"

        if(userName == ""):
            return{
                'found':"true"
            }
        if(userEmail == "" or  re.match(regex, userEmail) is None):
            return{
                'found':"true"
            } 
        if(userPassword == "" or re.match(regexP, userPassword) is None):
            return{
                'found':"true"
            }  

        found_user = users.query.filter_by(username=userName).first()
        if found_user:
             return {
                 'problem': "existed",
                  'found':"true"
             }
        else:
            usr = users(userName, userEmail, userPassword)
            db.session.add(usr)
            db.session.commit()

            return{
                'userID': usr._id,
                'found':"false"
                }
    

    return {
        'found':"true"
            }




@app.route("/api/loggingIn",  methods=['POST','GET'])
def get_login():
        if request.method == "POST":
            userName = request.json['username']
            userPassword = request.json['password']

            found_user = users.query.filter_by(username=userName).first()
            if found_user:
                if found_user.password == userPassword:
                    return {
                        'userID': found_user._id,
                        'found':"true"
                    }
                return{
                        'found':"false"
                    }
            else:
                return{
                        'found':"false"
                    }
        

        return{
                'found':"false"
                }
    

if __name__=="__main__":
   
   app.run(debug=True)