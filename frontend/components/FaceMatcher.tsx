/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import * as faceapi from "face-api.js";
import { Upload, RefreshCw } from "lucide-react";
import AnimatedNavbar from "./AnimatedNavbar";

const FaceMatcher: React.FC = () => {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        setLoadingStatus("Loading models...");

        const MODEL_PATH = "../models";
        console.log("Loading models from:", MODEL_PATH);

        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_PATH),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_PATH),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
        ]);

        console.log("All models loaded");
        setModelsLoaded(true);
        setLoadingStatus("Models loaded successfully!");
      } catch (error) {
        console.error("Error loading models:", error);
        setLoadingStatus("Error loading models. Please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    imageRef: React.RefObject<HTMLImageElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setMatchResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compareFaces = async () => {
    if (!modelsLoaded) {
      setMatchResult("Please wait for models to load");
      return;
    }

    try {
      setIsLoading(true);
      setMatchResult(null);

      if (!image1Ref.current || !image2Ref.current) {
        throw new Error("Images not loaded");
      }

      await Promise.all([
        new Promise<void>((resolve) => {
          const img = image1Ref.current;
          if (img?.complete) resolve();
          else if (img) img.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
          const img = image2Ref.current;
          if (img?.complete) resolve();
          else if (img) img.onload = () => resolve();
        }),
      ]);

      const detection1 = await faceapi
        .detectSingleFace(image1Ref.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      const detection2 = await faceapi
        .detectSingleFace(image2Ref.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection1 || !detection2) {
        setMatchResult("Could not detect faces in one or both images");
        return;
      }

      const distance = faceapi.euclideanDistance(
        detection1.descriptor,
        detection2.descriptor
      );

      setMatchResult(distance < 0.6 ? "✅ Match!" : "❌ No Match");
    } catch (error) {
      console.error("Face comparison error:", error);
      setMatchResult("Error comparing faces");
    } finally {
      setIsLoading(false);
    }
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
    <>
      <AnimatedNavbar items={navItems} />
      <div className="flex flex-col mt-10 items-center justify-center min-h-screen p-5 space-y-8 bg-gradient-to-b from-white to-yellow-100">
        <h1 className="text-4xl font-bold text-yellow-400">Face Matcher</h1>

        {loadingStatus && (
          <div className="text-sm text-yellow-400">{loadingStatus}</div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <ImageUploader
            image={image1}
            setImage={setImage1}
            imageRef={image1Ref}
            handleImageUpload={handleImageUpload}
            isLoading={isLoading}
            label="First Face"
          />
          <ImageUploader
            image={image2}
            setImage={setImage2}
            imageRef={image2Ref}
            handleImageUpload={handleImageUpload}
            isLoading={isLoading}
            label="Second Face"
          />
        </div>

        <button
          onClick={compareFaces}
          disabled={isLoading || !image1 || !image2 || !modelsLoaded}
          className={`px-8 py-3 rounded-full text-lg font-semibold transition-all ${
            isLoading || !image1 || !image2 || !modelsLoaded
              ? "bg-yellow-200 text-yellow-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-white"
          }`}
        >
          {isLoading ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            "Compare Faces"
          )}
        </button>

        {matchResult && (
          <div
            className={`text-2xl font-bold ${
              matchResult.includes("✅")
                ? "text-green-600"
                : matchResult.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {matchResult}
          </div>
        )}
      </div>
    </>
  );
};

interface ImageUploaderProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  imageRef: React.RefObject<HTMLImageElement>;
  handleImageUpload: (
    event: ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    imageRef: React.RefObject<HTMLImageElement>
  ) => void;
  isLoading: boolean;
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  setImage,
  imageRef,
  handleImageUpload,
  isLoading,
  label,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="text-lg font-semibold text-yellow-500">{label}</label>
      <div className="relative w-80 h-80 border-4 border-dashed border-yellow-300 rounded-lg overflow-hidden">
        {image ? (
          <img
            ref={imageRef}
            src={image || "/placeholder.svg"}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-yellow-50">
            <Upload className="w-12 h-12 text-yellow-300" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setImage, imageRef)}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FaceMatcher;
