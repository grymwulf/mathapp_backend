import sqlalchemy
import connexion
from flask import redirect

# Create an instance of our app

app = connexion.FlaskApp(__name__, specification_dir='./api')

# Read our API spec

app.add_api('mathapp.yaml')

@app.route('/')
def home():
    return "<h1>Got root directory</h1>"

@app.route('/ui')
@app.route('/doc')
def swagger_console():
    return redirect('/api/v1/ui')

# Safety/Sanity Check
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)