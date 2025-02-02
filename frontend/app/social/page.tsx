'use client';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface MatchedImage {
    image_url: string; // Base64 encoded image
    image_path: string;
}

interface ApiResponse {
    matched_images: MatchedImage[];
    message?: string;
}

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [matchedImages, setMatchedImages] = useState<MatchedImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setPreview(null);
            setFile(null);
            return;
        }

        // Validate file type
        if (!selectedFile.type.startsWith('image/')) {
            setError('Please upload an image file');
            setPreview(null);
            setFile(null);
            return;
        }

        // Validate file size (5MB limit)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            setPreview(null);
            setFile(null);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);

        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);
        setError(null);
        setMatchedImages([]);

        try {
            const response = await axios.post<ApiResponse>(
                'http://localhost:8000/upload/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMatchedImages(response.data.matched_images || []);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            if (axiosError.response?.status === 404) {
                setError('No matching faces found in the database');
            } else if (axiosError.response?.data?.message) {
                setError(axiosError.response.data.message);
            } else {
                setError('Error processing image. Please try again.');
            }
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Face Recognition System</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <label
                        htmlFor="image-upload"
                        className="block text-center cursor-pointer"
                    >
                        <div className="space-y-2">
                            <div className="text-gray-600">
                                Drop an image here or click to upload
                            </div>
                            <input
                                id="image-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                disabled={loading}
                            />
                            {preview && (
                                <div className="mt-4">
                                    <img
                                        src={preview}
                                        alt="Upload preview"
                                        className="max-h-64 mx-auto rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
                >
                    {loading ? 'Processing...' : 'Find Matches'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2">Processing image...</p>
                </div>
            )}

            {matchedImages.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Matched Faces
                    </h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        {matchedImages.map((match, index) => (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden shadow-sm"
                            >
                                <img
                                    src={match.image_url} // This will be the base64 image
                                    alt={`Matched person ${index + 1}`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 break-all">
                                        Match #{index + 1}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
