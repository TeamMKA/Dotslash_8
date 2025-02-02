/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Upload, RefreshCw } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CardHeader, CardContent } from "./ui/card";
import { Card, CardTitle } from "./ui/card-hover";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import AnimatedNavbar from "./AnimatedNavbar";

const AgeTransformer: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [gifUrl, setGifUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const API_KEY = "cm6huffbt0001jo03l28a2r1a";

  // Cleanup the object URL when the component unmounts or imageFile changes
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setGifUrl("");
      setError("");
      setStatus("Image uploaded.");
      setImagePreviewUrl(URL.createObjectURL(file));
      console.log("Image uploaded:", file);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAge = Number(event.target.value);
    setAge(selectedAge);
    setGifUrl("");
    setError("");
    setStatus(`Selected age: ${selectedAge} years.`);
    console.log("Slider changed to age:", selectedAge);
  };

  const handleGenerateGif = async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      setStatus("");
      return;
    }

    setLoading(true);
    setError("");
    setGifUrl("");
    setStatus("Converting image to Base64.");
    console.log("Starting GIF generation.");

    try {
      // Convert image file to Base64
      const base64Image = await convertToBase64(imageFile);
      setStatus("Image converted to Base64.");
      console.log("Image converted to Base64.");

      // Process the image
      setStatus("Sending image to API for processing.");
      console.log("Sending image to API.");
      const response = await fetch(
        "https://api.magicapi.dev/api/v1/magicapi/period/period",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "x-magicapi-key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Image,
            target_age: age.toString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error Response:", errorData);
        throw new Error(
          `Failed to process image. Status: ${response.status}, Message: ${errorData}`
        );
      }

      const data = await response.json();
      console.log("Process Image Response:", data);
      setStatus("Image processing initiated.");

      const requestId = data.request_id;

      // Poll for the result
      setStatus("Polling for result.");
      console.log("Polling for result with Request ID:", requestId);
      const result = await pollForResult(requestId);

      if (result && result.result) {
        setGifUrl(result.result);
        setStatus("GIF generated successfully.");
        console.log("GIF URL received:", result.result);
      } else {
        throw new Error("Result URL not found in the response.");
      }
    } catch (err: any) {
      console.error("Error fetching GIF:", err);
      setError(err.message || "Failed to generate GIF. Please try again.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Failed to convert image.");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const pollForResult = async (requestId: string): Promise<any> => {
    const pollingInterval = 3000; // 3 seconds
    const maxAttempts = 50;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(
          `https://api.magicapi.dev/api/v1/magicapi/period/predictions/${requestId}`,
          {
            headers: {
              accept: "application/json",
              "x-magicapi-key": API_KEY,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(`Polling Attempt ${attempts + 1}:`, data);
          setStatus(`Polling Attempt ${attempts + 1}: Status - ${data.status}`);
          if (data.status === "succeeded") {
            return data;
          } else if (data.status === "failed") {
            throw new Error("Image processing failed on the server.");
          }
        } else {
          console.warn(
            `Polling Attempt ${attempts + 1}: Failed with status ${
              response.status
            }`
          );
          setStatus(
            `Polling Attempt ${attempts + 1}: Failed with status ${
              response.status
            }`
          );
        }
      } catch (pollError) {
        console.error(`Polling Attempt ${attempts + 1}: Error`, pollError);
        setStatus(`Polling Attempt ${attempts + 1}: Error occurred.`);
      }

      await new Promise((res) => setTimeout(res, pollingInterval));
      attempts++;
    }

    throw new Error("Processing timed out. Please try again later.");
  };

  const navItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/register",
      label: "Register",
    },
    {
      href: "/report",
      label: "Report",
    },
    ];

  return (
    <Card className="w-full mt-[10rem] max-w-2xl mx-auto">
        <AnimatedNavbar items={navItems} />
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-center">Age Transformer</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <Input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      {imagePreviewUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Uploaded Image:</h3>
          <img
            src={imagePreviewUrl || "/placeholder.svg"}
            alt="Uploaded"
            className="max-w-full h-auto rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="age-slider"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Age: {age} years
        </label>
        <Slider id="age-slider" min={0} max={100} step={1} value={[age]} onVolumeChange={handleSliderChange} />
      </div>

      <Button onClick={handleGenerateGif} disabled={loading} className="w-full">
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Generate GIF"
        )}
      </Button>

      {status && <p className="text-sm text-gray-600">{status}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {gifUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <img
            src={gifUrl || "/placeholder.svg"}
            alt="Age Progression GIF"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </CardContent>
  </Card>
  );
};


export default AgeTransformer;
