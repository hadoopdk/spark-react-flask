# app.py

import pyspark
from pyspark.sql import SparkSession
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Handle the uploaded file

        # Initialize Spark
        spark = SparkSession.builder.appName("CSVAnalyzer").getOrCreate()

        if 'file' not in request.files:
            return "No file part", 400

        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        if file:
        # Read CSV file with Spark
            df = spark.read.csv(file.filename, header=True, inferSchema=True)
        # Perform analysis (example: show first 5 rows)
        result = df.take(5)
        return jsonify(result)
    


        f = request.files['file']
        if f:
            # Here we will later process the file with Spark
            # Initialize Spark
            spark = SparkSession.builder.appName("CSVAnalyzer").getOrCreate()


            pass
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)






def upload_file():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    if file:
        # Read CSV file with Spark
        df = spark.read.csv(file, header=True, inferSchema=True)
        # Perform analysis (example: show first 5 rows)
        result = df.take(5)
        return jsonify(result)

if __name__ == '__main__':

    app.run(debug=True)
