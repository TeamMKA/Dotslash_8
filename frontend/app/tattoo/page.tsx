import UploadForm from '@/components/Tattoo';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5">
            <h1 className="text-2xl font-bold mb-4">Tattoo Recognition</h1>
            <UploadForm />
        </div>
    );
}
