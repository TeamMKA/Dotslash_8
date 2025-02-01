/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    ArrowLeftIcon,
    ArrowRight,
    Upload,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { storage, db } from '@/lib/firebase'; // Adjust the import path
import { ref, uploadBytes } from 'firebase/storage';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';

interface FormErrors {
    [key: string]: string;
}

const steps = [
    'Basic Information',
    'Physical Description',
    'Last Known Details',
    'Additional Information',
    'Documents & Verification',
];

export default function RegisterCase() {
    const [currentStep, setCurrentStep] = useState(0);
    const progress = ((currentStep + 1) / steps.length) * 100;

    const [frontFaceUrl, setFrontFaceUrl] = useState<string | null>(null);
    const [fullBodyUrl, setFullBodyUrl] = useState<string | null>(null);
    const [docUrl, setDocUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        aliases: '',
        dob: '',
        age: '',
        gender: '',
        adhaar: '',
        height: '',
        weight: '',
        complexion: '',
        hairColor: '',
        distinguishingFeatures: '',
        medicalConditions: [] as string[],
        lastSeenDate: '',
        lastSeenTime: '',
        lastLocation: '',
        clothingDescription: '',
        circumstances: '',
        medications: '',
        languages: '',
        socialMedia: '',
        emergencyContact: {
            name: '',
            relationship: '',
            phone: '',
            email: '',
        },
        consent: false,
    });

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        switch (step) {
            case 0:
                if (!formData.fullName.trim()) {
                    newErrors.fullName = 'Full name is required';
                }
                if (!formData.dob) {
                    newErrors.dob = 'Date of birth is required';
                }
                if (!formData.gender) {
                    newErrors.gender = 'Gender is required';
                }
                if (!formData.adhaar.trim()) {
                    newErrors.adhaar = 'Aadhaar number is required';
                } else if (!/^\d{12}$/.test(formData.adhaar)) {
                    newErrors.adhaar = 'Invalid Aadhaar number format';
                }
                break;

            case 1:
                if (!formData.height) {
                    newErrors.height = 'Height is required';
                }
                if (!formData.weight) {
                    newErrors.weight = 'Weight is required';
                }
                if (!formData.complexion) {
                    newErrors.complexion = 'Complexion is required';
                }
                break;

            case 2:
                if (!formData.lastSeenDate) {
                    newErrors.lastSeenDate = 'Last seen date is required';
                }
                if (!formData.lastSeenTime) {
                    newErrors.lastSeenTime = 'Last seen time is required';
                }
                if (!formData.lastLocation.trim()) {
                    newErrors.lastLocation = 'Last known location is required';
                }
                break;

            case 3:
                if (!formData.emergencyContact.name.trim()) {
                    newErrors['emergencyContact.name'] =
                        'Emergency contact name is required';
                }
                if (!formData.emergencyContact.phone.trim()) {
                    newErrors['emergencyContact.phone'] =
                        'Emergency contact phone is required';
                }
                break;

            case 4:
                if (!frontFaceUrl) {
                    newErrors.frontFace = 'Front face photo is required';
                }
                if (!docUrl) {
                    newErrors.docUrl = 'Identity document is required';
                }
                if (!formData.consent) {
                    newErrors.consent = 'You must agree to the terms';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const uploadImageToServer = async (selectedImage: string) => {
        try {
            const response = await fetch('/api/upload-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: selectedImage,
                    filename: 'uploaded-image.jpg',
                }),
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const { url } = await response.json();
            return url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        if (name === 'consent') {
            setFormData((prev) => ({ ...prev, consent: checked }));
        } else {
            setFormData((prev) => ({
                ...prev,
                medicalConditions: checked
                    ? [...prev.medicalConditions, name]
                    : prev.medicalConditions.filter(
                          (condition) => condition !== name
                      ),
            }));
        }
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setUrl: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors((prev) => ({
                    ...prev,
                    fileSize: 'File size must be less than 5MB',
                }));
                return;
            }
            setUrl(URL.createObjectURL(file));
        }
    };
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Submitting form data:', formData);
        handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    };

    /* const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setUrl: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  }; */

    /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }; */

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting form data:', formData);
        console.log('Front face URL:', frontFaceUrl);

        // if (!validateStep(currentStep)) {
        //   return;
        // }

        setIsSubmitting(true);
        try {
            // Create FormData for file uploads
            // const formDataToSubmit = new FormData();

            // // Append all form data
            // Object.entries(formData).forEach(([key, value]) => {
            //   if (typeof value === "object" && value !== null) {
            //     formDataToSubmit.append(key, JSON.stringify(value));
            //   } else {
            //     formDataToSubmit.append(key, value.toString());
            //   }
            // });

            let image;

            if (frontFaceUrl) {
                console.log('Uploading front face image...');
                const response = await fetch(frontFaceUrl);
                const blob = await response.blob();
                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });

                image = await uploadImageToServer(base64);
            }
            console.log('Image URL:', image);

            const finalFormData = {
                ...formData,
                image: image || '',
                submittedAt: new Date().toISOString(),
            };

            // Save to Firestore
            await addDoc(collection(db, 'users'), finalFormData);

            // Show success message
            alert('Form submitted successfully!');

            window.location.href = '/all-case';
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors((prev) => ({
                ...prev,
                submit: 'Failed to submit form. Please try again.',
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen relative  !bg-white !text-black-800 !font-semibold ">
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex gap-5 items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <ArrowLeftIcon />
                        </Link>

                        <span className="text-xl font-bold ">
                            Register Missing Person Case
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8  py-12">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <span className="text-sm font-medium">
                            {steps[currentStep]}
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <Card className="p-6 border border-black-200 bg-white  rounded-lg">
                        <Tabs
                            value={currentStep.toString()}
                            className="space-y-6"
                        >
                            {/* Basic Information */}

                            <TabsContent value="0">
                                <div className="space-y-6 text-black-800">
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">
                                            Basic Information
                                        </h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="fullName"
                                                    placeholder="Enter full name"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    /* error={errors.fullName} */
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="aliases">
                                                    Known Aliases
                                                </Label>
                                                <Input
                                                    id="aliases"
                                                    placeholder="Any other names"
                                                    value={formData.aliases}
                                                    onChange={handleInputChange}
                                                    name="aliases"
                                                    /* error={errors.fullName} */
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dob">
                                                    Date of Birth
                                                </Label>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    value={formData.dob}
                                                    name="dob"
                                                    onChange={handleInputChange}
                                                    /* error={errors.fullName} */
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    name="age"
                                                    placeholder="Age in years"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    /* error={errors.fullName} */
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Gender</Label>
                                            <RadioGroup
                                                defaultValue="male"
                                                className="flex gap-4"
                                                value={formData.gender}
                                                onValueChange={
                                                    handleRadioChange
                                                }
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="male"
                                                        id="male"
                                                    />
                                                    <Label htmlFor="male">
                                                        Male
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="female"
                                                        id="female"
                                                    />
                                                    <Label htmlFor="female">
                                                        Female
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="other"
                                                        id="other"
                                                    />
                                                    <Label htmlFor="other">
                                                        Other
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="aadhaar">
                                                Aadhaar Number
                                            </Label>
                                            <Input
                                                id="aadhaar"
                                                name="adhaar"
                                                placeholder="12-digit Aadhaar number"
                                                value={formData.adhaar}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Physical Description */}
                            <TabsContent value="1">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">
                                        Physical Description
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="height">
                                                Height (cm)
                                            </Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                name="height"
                                                placeholder="Height in centimeters"
                                                value={formData.height}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="weight">
                                                Weight (kg)
                                            </Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                name="weight"
                                                placeholder="Weight in kilograms"
                                                value={formData.weight}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="complexion">
                                                Complexion
                                            </Label>
                                            <Select
                                                value={formData.complexion}
                                                onValueChange={(
                                                    value: string
                                                ) =>
                                                    handleSelectChange(
                                                        'complexion',
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select complexion" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fair">
                                                        Fair
                                                    </SelectItem>
                                                    <SelectItem value="medium">
                                                        Medium
                                                    </SelectItem>
                                                    <SelectItem value="dark">
                                                        Dark
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="hairColor">
                                                Hair Color
                                            </Label>
                                            <Input
                                                id="hairColor"
                                                placeholder="Hair color"
                                                name="hairColor"
                                                value={formData.hairColor}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="distinguishingFeatures">
                                            Distinguishing Features
                                        </Label>
                                        <Textarea
                                            id="distinguishingFeatures"
                                            placeholder="Describe any birthmarks, scars, tattoos, or other distinctive features"
                                            className="h-24"
                                            name="distinguishingFeatures"
                                            value={
                                                formData.distinguishingFeatures
                                            }
                                            onChange={handleInputChange}
                                            /* error={errors.fullName} */
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Medical Conditions</Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                'Diabetes',
                                                'Heart Condition',
                                                "Alzheimer's",
                                                'Mental Health Issues',
                                            ].map((condition) => (
                                                <div
                                                    key={condition}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        checked={formData.medicalConditions.includes(
                                                            condition
                                                        )}
                                                        onCheckedChange={(
                                                            checked: boolean
                                                        ) =>
                                                            handleCheckboxChange(
                                                                `medical-${condition.toLowerCase()}`,
                                                                checked as boolean
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor={condition.toLowerCase()}
                                                    >
                                                        {condition}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Last Known Details */}
                            <TabsContent value="2">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">
                                        Last Known Details
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="lastSeenDate">
                                                Last Seen Date
                                            </Label>
                                            <Input
                                                id="lastSeenDate"
                                                type="date"
                                                value={formData.lastSeenDate}
                                                onChange={handleInputChange}
                                                name="lastSeenDate"
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastSeenTime">
                                                Last Seen Time
                                            </Label>
                                            <Input
                                                id="lastSeenTime"
                                                type="time"
                                                value={formData.lastSeenTime}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                                name="lastSeenTime"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastLocation">
                                            Last Known Location
                                        </Label>
                                        <Input
                                            id="lastLocation"
                                            placeholder="Enter the location where the person was last seen"
                                            value={formData.lastLocation}
                                            onChange={handleInputChange}
                                            /* error={errors.fullName} */
                                            disabled={isSubmitting}
                                            name="lastLocation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="clothingDescription">
                                            Clothing Description
                                        </Label>
                                        <Textarea
                                            id="clothingDescription"
                                            placeholder="Describe what the person was wearing when last seen"
                                            className="h-24"
                                            value={formData.clothingDescription}
                                            onChange={handleInputChange}
                                            /* error={errors.fullName} */
                                            disabled={isSubmitting}
                                            name="clothingDescription"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="circumstances">
                                            Circumstances
                                        </Label>
                                        <Textarea
                                            id="circumstances"
                                            placeholder="Describe the circumstances of disappearance"
                                            className="h-24"
                                            value={formData.circumstances}
                                            onChange={handleInputChange}
                                            /* error={errors.fullName} */
                                            disabled={isSubmitting}
                                            name="circumstances"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Additional Information */}
                            <TabsContent value="3">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">
                                        Additional Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="medications">
                                                Current Medications
                                            </Label>
                                            <Input
                                                id="medications"
                                                placeholder="List any medications the person takes"
                                                value={formData.medications}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                                name="medications"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="languages">
                                                Languages Spoken
                                            </Label>
                                            <Input
                                                id="languages"
                                                placeholder="List languages the person speaks"
                                                value={formData.languages}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                                name="languages"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="socialMedia">
                                                Social Media Profiles
                                            </Label>
                                            <Input
                                                id="socialMedia"
                                                placeholder="List relevant social media handles"
                                                value={formData.socialMedia}
                                                onChange={handleInputChange}
                                                /* error={errors.fullName} */
                                                disabled={isSubmitting}
                                                name="socialMedia"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>
                                                Emergency Contact Details
                                            </Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    placeholder="Contact Name"
                                                    value={
                                                        formData
                                                            .emergencyContact
                                                            .name
                                                    }
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                    name="emergencyContact.name"
                                                />
                                                <Input
                                                    placeholder="Relationship"
                                                    value={
                                                        formData
                                                            .emergencyContact
                                                            .relationship
                                                    }
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                    name="emergencyContact.relationship"
                                                />
                                                <Input
                                                    placeholder="Phone Number"
                                                    type="tel"
                                                    value={
                                                        formData
                                                            .emergencyContact
                                                            .phone
                                                    }
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                    name="emergencyContact.phone"
                                                />
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    value={
                                                        formData
                                                            .emergencyContact
                                                            .email
                                                    }
                                                    onChange={handleInputChange}
                                                    disabled={isSubmitting}
                                                    name="emergencyContact.email"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Documents & Verification */}
                            <TabsContent value="4">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold">
                                        Documents & Verification
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Recent Photographs</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                                    <Upload
                                                        className="h-8 w-8 mx-auto mb-2 text-black-800"
                                                        onClick={() => {
                                                            const fileInput =
                                                                document.getElementById(
                                                                    'front-face-upload'
                                                                );
                                                            if (fileInput) {
                                                                fileInput.click();
                                                            }
                                                        }}
                                                    />
                                                    <p className="text-sm text-black-600">
                                                        Upload front face photo
                                                    </p>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        id="front-face-upload"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e,
                                                                setFrontFaceUrl
                                                            )
                                                        }
                                                    />
                                                    {frontFaceUrl && (
                                                        <img
                                                            src={frontFaceUrl}
                                                            alt="Selected file"
                                                            className="mt-4 mx-auto"
                                                        />
                                                    )}
                                                </div>
                                                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                                    <Upload
                                                        className="h-8 w-8 mx-auto mb-2 text-black-400"
                                                        onClick={() => {
                                                            const fileInput =
                                                                document.getElementById(
                                                                    'full-body-upload'
                                                                );
                                                            if (fileInput) {
                                                                fileInput.click();
                                                            }
                                                        }}
                                                    />
                                                    <p className="text-sm text-black-600">
                                                        Upload full body photo
                                                    </p>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        id="full-body-upload"
                                                        onChange={(e) =>
                                                            handleFileChange(
                                                                e,
                                                                setFullBodyUrl
                                                            )
                                                        }
                                                    />
                                                    {fullBodyUrl && (
                                                        <img
                                                            src={fullBodyUrl}
                                                            alt="Selected file"
                                                            className="mt-4 mx-auto"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Identity Documents</Label>
                                            <div className="border-2 border-dashed rounded-lg p-4">
                                                <Upload
                                                    className="h-8 w-8 mx-auto mb-2 text-black-400"
                                                    onClick={() => {
                                                        const fileInput =
                                                            document.getElementById(
                                                                'doc-upload'
                                                            );
                                                        if (fileInput) {
                                                            fileInput.click();
                                                        }
                                                    }}
                                                />
                                                <p className="text-center text-sm text-black-600">
                                                    Upload ID proof
                                                    (Aadhaar/PAN/Passport)
                                                </p>
                                                <Input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    id="doc-upload"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            setDocUrl
                                                        )
                                                    }
                                                />
                                                {docUrl && (
                                                    <img
                                                        src={docUrl}
                                                        alt="Selected file"
                                                        className="mt-4 mx-auto"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="consent" />
                                                <Label htmlFor="consent">
                                                    I confirm that all
                                                    information provided is
                                                    accurate and I authorize the
                                                    sharing of this information
                                                    with relevant authorities.
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        setCurrentStep(
                                            Math.max(0, currentStep - 1)
                                        )
                                    }
                                    disabled={currentStep === 0}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />{' '}
                                    Previous
                                </Button>
                                {currentStep === 4 ? (
                                    <Button
                                        type="submit"
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Submit Case
                                    </Button>
                                ) : (
                                    <></>
                                )}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setCurrentStep(
                                            Math.min(
                                                steps.length - 1,
                                                currentStep + 1
                                            )
                                        )
                                    }
                                >
                                    Next <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </Tabs>
                    </Card>
                </form>
            </div>
        </section>
    );
}
