from flask import Flask, request, jsonify
from spark_processor import process_csv
import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'C:\\Users\\Drajput\\Downloads\\spark-read\\backend\\uploads\\'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})

    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filename)
    
    # Process the file with Spark
    result = process_csv(filename)
    return result

if __name__ == '__main__':
    app.run(debug=True)
