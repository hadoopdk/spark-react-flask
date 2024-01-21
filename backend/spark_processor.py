import pyspark
from pyspark.sql import SparkSession
from flask import  jsonify

def process_csv(file_path):

    try:
        spark = SparkSession.builder.appName("CSVProcessor").getOrCreate()
        df = spark.read.csv(file_path, header=True, inferSchema=True)

        # Get metadata
        metadata = {
            "columns": df.columns,
            "data_types": {field[0]: str(field[1]) for field in df.dtypes}
        }

        # Get sample records (first 5 rows)
        sample_records = df.limit(5).toPandas().to_dict(orient='records')

        # Example processing: count the number of rows
        row_count = df.count()


        spark.stop()
    
        return {"metadata": metadata, "sample_records": sample_records, "row_count": row_count}
    except Exception as e:
        spark.stop()
        return jsonify({"error": str(e)})
    
    
    #spark.stop()
    #return {"row_count": row_count}
