from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app) 

model = load_model('./model/skin_disease.h5')
class_name = ['Enfeksiyonel', 'Ekzama', 'Akne', 'Pigment', 'Benign', 'Malign']

@app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/predict', methods=['POST'])

def predict():
    file = request.files['file']
    file_bytes = np.asarray(bytearray(file.read()), dtype=np.uint8)
    opencv_image = cv2.imdecode(file_bytes, 1)
    opencv_image = cv2.resize(opencv_image, (256, 256))
    opencv_image = np.expand_dims(opencv_image, axis=0)

    y_pred = model.predict(opencv_image)
    result = class_name[np.argmax(y_pred)]

    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(debug=True, port=50603)  # Change port to your desired value

