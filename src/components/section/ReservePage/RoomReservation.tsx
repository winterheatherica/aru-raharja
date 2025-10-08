'use client';

import { useState, useEffect } from 'react';

interface Reservation {
    email: string;
    origin: string;
    purpose: string;
    reservedAt: string;
}

interface Room {
    id: number;
    name: string;
    reserved: boolean;
    reservation?: Reservation;
}

const EnhancedRoomReservation = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    useEffect(() => {
        const savedRooms = localStorage.getItem('roomReservations');
        if (savedRooms) {
            setRooms(JSON.parse(savedRooms));
        } else {
            const initialRooms: Room[] = Array.from({ length: 8 }, (_, i) => ({
                id: i + 1,
                name: `Ruang ${i + 1}`,
                reserved: false,
            }));
            setRooms(initialRooms);
        }
    }, []);
    useEffect(() => {
        if (rooms.length > 0) {
            localStorage.setItem('roomReservations', JSON.stringify(rooms));
        }
    }, [rooms]);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        origin: '',
        purpose: '',
    });

    const handleRoomClick = (room: Room) => {
        setSelectedRoom(room);
        if (room.reserved) {
            alert(`Ruang ini telah disewa oleh ${room.reservation?.email} untuk: ${room.reservation?.purpose}`);
        } else {
            setIsDialogOpen(true);
            setFormData({ email: '', origin: '', purpose: '' });
        }
    };

    const handleReserve = () => {
        if (!selectedRoom || !formData.email || !formData.origin || !formData.purpose) {
            alert('Please fill in all fields');
            return;
        }

        const reservation: Reservation = {
            ...formData,
            reservedAt: new Date().toISOString(),
        };

        setRooms(prevRooms =>
            prevRooms.map(room =>
                room.id === selectedRoom.id
                    ? {
                        ...room,
                        reserved: true,
                        reservation,
                    }
                    : room
            )
        );

        setIsDialogOpen(false);
        setSelectedRoom(null);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setSelectedRoom(null);
        setFormData({ email: '', origin: '', purpose: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const clearAllReservations = () => {
        if (confirm('Are you sure you want to clear all reservations?')) {
            const resetRooms = rooms.map(room => ({
                ...room,
                reserved: false,
                reservation: undefined,
            }));
            setRooms(resetRooms);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2 text-center">Reservasi Ruang</h2>
            <p className="text-gray-600 text-center mb-6">________________</p>

            <div className="grid grid-cols-2 grid-rows-4 gap-4 mb-6">
                {rooms.map(room => (
                    <div
                        key={room.id}
                        className={`
              aspect-square border-2 rounded-lg cursor-pointer transition-all duration-200
              flex flex-col items-center justify-center font-semibold
              ${room.reserved
                            ? 'bg-red-500 text-white border-red-600'
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                        }
            `}
                        onClick={() => handleRoomClick(room)}
                    >
                        {room.name}
                        {room.reserved && (
                            <span className="text-xs mt-1 opacity-90">Reserved</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={clearAllReservations}
                    className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                >
                    X
                </button>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            Pesan {selectedRoom?.name}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Asal Perorangan atau PT *
                                </label>
                                <input
                                    type="text"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="PT/Peroangan"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jasa yang ingin digunakan *
                                </label>
                                <textarea
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Jasa apa saja yang ingin digunakan?"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReserve}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancedRoomReservation;