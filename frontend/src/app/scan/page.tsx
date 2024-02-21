"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Back from "@/components/Home/Back";
import Navbar from "@/components/Navbar";

function App() {
  const { toast } = useToast();

  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    // Set the selected file
    setFile(selectedFile);

    // Create a preview for the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      toast({
        title: "File not found!",
        description: "Please select an image file.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:50603/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data.message);
      toast({
        title: "Disease detected!",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      {/* <Back /> */}
      <Navbar />
      <h1 className="font-bold text-3xl ">Disease Prediction</h1>

      <div className="flex items-center p-5 justify-center w-96">
        {imagePreview ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-full h-64 rounded-lg object-cover"
            />
            <input
              id="dropzone-file"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <div className="w-full px-5">
        <Button
          disabled={loading}
          className="mb-5 mt-2 w-full"
          onClick={handleUpload}
        >
          Predict Disease{" "}
          {loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="ml-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity=".5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          )}
        </Button>
      </div>

      {prediction && (
        <div className="flex justify-center flex-col items-center gap-2">
          <h2 className="text-lg font-bold">Prediction Result</h2>
          <p className="text-xl">{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
