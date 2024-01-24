import numpy as np
import streamlit as st
import cv2
from tensorflow.keras.models import load_model
import tensorflow as tf


model=load_model('new_model.h5')
class_name=['Enfeksiyonel', 'Ekzama', 'Akne', 'Pigment', 'Benign', 'Malign']
st.title('skin detection')
st.markdown('upload an image of the skin')

skin_image=st.file_uploader("choose an image ",type='jpg')
submit=st.button('Predict Disease')

if submit:
    if skin_image is not None:
        file_bytes=np.asarray(bytearray(skin_image.read()),dtype=np.uint8)

        opencv_image=cv2.imdecode(file_bytes,1)

        st.image(opencv_image,channels="BGR")
        st.write(opencv_image.shape)
        opencv_image=cv2.resize(opencv_image,(256,256))
        opencv_image.shape=(1,256,256,3)

        y_pred=model.predict(opencv_image)
        result=class_name[np.argmax(y_pred)]
        st.title(result)
        # st.title(str("this is "+result.split('-')[0]+"leaf with "+result.split('-')[1]))