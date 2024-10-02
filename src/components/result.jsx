import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../lib/firestore'; // Pastikan storage dan db diimpor
import { query, ref as dbRef, onValue, limitToLast } from 'firebase/database'; // Import yang diperlukan dari Firebase

const Result = () => {
    const [camera1Images, setCamera1Images] = useState([]); // Menyimpan gambar dengan geotag
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sensorData, setSensorData] = useState([]); // State untuk menyimpan data sensor

    // Function untuk mengambil data sensor
    useEffect(() => {
        const sensorDataRef = query(dbRef(db, '/sensorData'), limitToLast(2)); // Ambil dua data sensor terbaru

        // Memasang listener untuk memantau perubahan data
        const unsubscribe = onValue(sensorDataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const sensorValues = Object.values(data); // Ambil array dari data sensor
                setSensorData(sensorValues); // Update state dengan data terbaru
                console.log("Updated Sensor Data: ", sensorValues); // Log data ke console
            } else {
                console.log("No data available");
            }
        }, (error) => {
            console.error("Error fetching data: ", error); // Handle error jika ada
        });

        // Cleanup listener ketika komponen di-unmount
        return () => unsubscribe();

    }, []); // Hanya jalankan sekali saat komponen di-mount

    // Fetch the latest two images from Firebase Storage
    const fetchLatestImages = async () => {
        try {
            setLoading(true);
            const storageRef = ref(storage, '/');

            // List all items in the root
            const result = await listAll(storageRef);
            console.log('Files listed:', result.items);

            // Sort items by name (assuming the filenames contain timestamps)
            const sortedItems = result.items.sort((a, b) => b.name.localeCompare(a.name));

            // Fetch URLs for the latest two images
            const latestItems = sortedItems.slice(0, 2);
            const imageUrls = await Promise.all(latestItems.map(item => getDownloadURL(item)));
            console.log('Image URLs:', imageUrls);

            // Set the image URLs in state with geotagging data
            const imagesWithGeotags = imageUrls.map((url, index) => {
                const geotagData = sensorData[index] ? {
                    day: new Date(sensorData[index].timestamp).toLocaleString('en-US', { weekday: 'long' }),
                    date: new Date(sensorData[index].timestamp).toLocaleDateString('en-GB'), // Format DD/MM/YYYY
                    time: new Date(sensorData[index].timestamp).toLocaleTimeString('en-GB'), // Format hh:mm:ss
                    coordinates: {
                        lat: sensorData[index].latitude,
                        lon: sensorData[index].longitude
                    }
                } : null; // Jika tidak ada data sensor, set ke null

                return {
                    url,
                    geotag: geotagData
                };
            });

            setCamera1Images(imagesWithGeotags);
        } catch (error) {
            console.error('Error fetching images from Firebase Storage:', error);
            setError('Failed to load images.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestImages(); // Fetch images on mount
        const interval = setInterval(fetchLatestImages, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [sensorData]); // Tambahkan sensorData sebagai dependensi agar mengambil gambar setiap kali sensorData diperbarui

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-4 justify-center mb-4">
                {loading ? (
                    <p>Loading Kamera 1 images...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    camera1Images.map((image, index) => (
                        <div key={index} className="w-[200px] h-[200px] flex flex-col items-center justify-center">
                            <img src={image.url} alt={`Kamera 1 - ${index}`} className="w-full h-full object-cover" />
                            <div className="text-black text-xs">
                                {image.geotag && (
                                    <>
                                        <p>{image.geotag.day}</p>
                                        <p>{image.geotag.date}</p>
                                        <p>{image.geotag.time}</p>
                                        <p>S {image.geotag.coordinates.lat},  E {image.geotag.coordinates.lon}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* Aspect ratio for the iframe */}
                <iframe
                    src="https://pure-newt-unbiased.ngrok-free.app/"
                    title="Streaming"
                    frameBorder="0"
                    allow="fullscreen"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        border: 'none',
                        transform: 'scale(0.65)', // Adjust scale for zoom-out effect
                        transformOrigin: 'top left', // Set origin for scaling
                        width: '160%', // Increase width to prevent clipping
                        height: '240%', // Increase height to prevent clipping
                        overflow: 'hidden',
                    }}
                >
                </iframe>
            </div>
        </div>
    );
};

export default Result;
