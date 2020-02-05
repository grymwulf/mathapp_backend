def get_all():
    return "<h1>Get_All from students</h1>"

def add_student(body):
    resp = "<h1>Add Student " + body +"</h1>"
    return resp

def get_student(student_id):
    resp = "Get Student with id of " + str(student_id)
    return resp

def get_tests(student_id):
    return "<h1>Get_Tests from students</h1>"

def add_test(student_id, body):
    return "Add Test"