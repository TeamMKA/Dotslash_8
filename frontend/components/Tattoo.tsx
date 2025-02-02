'use client';

import { useState, useRef, useEffect } from 'react';

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [predictions, setPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Create an object URL to display the selected image
            const url = URL.createObjectURL(selectedFile);
            setImageUrl(url);
        }
    };

    // Handle file upload and API call
    const handleUpload = async () => {
        if (!file) {
            alert('Please select an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setPredictions(data.predictions || []);
        } catch (error) {
            console.error('Upload failed:', error);
        }
        setLoading(false);
    };

    // Draw bounding boxes on canvas
    useEffect(() => {
        if (imageUrl && predictions.length > 0) {
            const canvas = canvasRef.current;
            const img = new Image();
            img.src = imageUrl;

            img.onload = () => {
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Set canvas size to match image
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Draw bounding boxes
                predictions.forEach((pred) => {
                    const { x, y, width, height } = pred;

                    // Convert to top-left corner
                    const startX = x - width / 2;
                    const startY = y - height / 2;

                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(startX, startY, width, height);
                });
            };
        }
    }, [imageUrl, predictions]);

    return (
        <div className="p-5 flex flex-col items-center">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-3"
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Uploading...' : 'Upload & Analyze'}
            </button>

            {imageUrl && (
                <div className="mt-4">
                    <canvas
                        ref={canvasRef}
                        className="border rounded-md shadow-md"
                    />
                </div>
            )}

            {predictions.length > 0 && (
                <pre className="mt-4 bg-gray-100 p-2 rounded w-full max-w-md overflow-auto">
                    {JSON.stringify(predictions, null, 2)}
                </pre>
            )}
        </div>
    );
}
