from flask import * 
import os
import ibm_db
import bcrypt
from functools import partial,wraps
conn = ibm_db.connect("DATABASE=;HOSTNAME=;PORT=32733;SECURITY=;SSLServerCertificate=;PROTOCOL=TCPIP;UID=;PWD=",'','')

app = Flask(__name__) 
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
PEOPLE_FOLDER = os.path.join('static', 'people_photo')

#IN THIS FILE ONLY SPRINT-2 ACTIONS ARE AVAILABLE


@app.route("/")
@app.route("/home")
#----------SPRINT-1-----------------#

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    return redirect(url_for('home'))



@app.route("/orgregister",methods=['GET','POST'])
#----------SPRINT-1-----------------#

@app.route("/user_dashboard")
#----------SPRINT-1-----------------#


@app.route("/login",methods=['GET','POST'])
#----------SPRINT-1-----------------#


@app.route('/browse')
def addMarker():
  if 'loggedin' in session:
    query = "SELECT * FROM jobpost;"
    stmt = ibm_db.prepare(conn, query)
    ibm_db.execute(stmt)
    a=[]
    isUser = ibm_db.fetch_assoc(stmt)
    
    while(isUser!=False):
      a.append(isUser)
      isUser = ibm_db.fetch_assoc(stmt)
  else:
    return redirect(url_for('login'))
  return render_template("browse.html",result=a)


@app.route('/companies')
def companies():
  if 'loggedin' in session:
    query = "SELECT * FROM RECRUITER"
    stmt = ibm_db.prepare(conn, query)
    ibm_db.execute(stmt)
    a=[]
    isUser = ibm_db.fetch_assoc(stmt)
    
    while(isUser!=False):
      a.append(isUser)
      isUser = ibm_db.fetch_assoc(stmt)
  else:
    return redirect(url_for('login'))
  return render_template("companies.html",result=a)


@app.route("/jobpost",methods=['GET','POST'])
def jobpost():
  if 'loggedin' in session:
      if request.method == 'POST':
          recruiterid=request.form['recruiter_id']
          jobtitle = request.form['jobtitle'] 
          jobtype = request.form['jobtype']
          jobexp=request.form['jobexperience']
          keyskill=request.form['keyskills']
          location=request.form['location']
          salary=request.form['salary']
          discription=request.form['discription']

          insert_sql = "INSERT INTO JOBPOST (RECRUITER_ID,JOBTITLE, JOBTYPE, EXPERIENCE, KEYSKILL, LOCATION, SALARY, DISCRIPTION) VALUES (?,?,?,?,?,?,?,?)"

          prep_stmt = ibm_db.prepare(conn, insert_sql)
          ibm_db.bind_param(prep_stmt, 1, recruiterid)
          ibm_db.bind_param(prep_stmt, 2, jobtitle)
          ibm_db.bind_param(prep_stmt, 3, jobtype)
          ibm_db.bind_param(prep_stmt, 4, jobexp)
          ibm_db.bind_param(prep_stmt, 5, keyskill)
          ibm_db.bind_param(prep_stmt, 6, location)
          ibm_db.bind_param(prep_stmt, 7, salary)
          ibm_db.bind_param(prep_stmt, 8, discription)
          ibm_db.execute(prep_stmt)
  else:
      return redirect(url_for('login'))
  return render_template("jobpost.html")

@app.route("/browse/searchjob",methods=['GET','POST'])
def searchjob():
    if request.method=='POST':
        searchopt=request.form['searchopt']
        srctitle=request.form['srctitle']
        query = "SELECT * FROM JOBPOST WHERE "+searchopt+"="+chr(39)+srctitle+chr(39)
        stmt = ibm_db.prepare(conn, query)
        ibm_db.execute(stmt)
        a=[]
        isUser = ibm_db.fetch_assoc(stmt)
    
        while(isUser!=False):
          a.append(isUser)
          isUser = ibm_db.fetch_assoc(stmt)
    return render_template('browse.html',result=a)

if __name__ == "__main__": #checking if __name__'s value is '__main__'. __name__ is an python environment variable who's value will always be '__main__' till this is the first instatnce of app.py running
    app.run(debug=True,port=8080,host= '192.168.43.233') #running flask (Initalised on line 4)
