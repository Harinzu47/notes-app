import React from 'react';

export default function NoteList({ notes, selectedNote, onSelectNote, onCreateNote, onDeleteNote, searchQuery, onSearchChange }) {

    const handleDelete = (e, noteId) => {
        e.stopPropagation();
        if (window.confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            onDeleteNote(noteId);
        }
    };

    return (
        <div className="p-2 bg-gray-50 h-full flex flex-col">
            <button
                onClick={onCreateNote}
                className="w-full mb-4 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Buat Catatan Baru
            </button>
            
            {/* --- INPUT PENCARIAN BARU --- */}
            <div className="mb-4 px-1">
                <input
                    type="text"
                    placeholder="Cari catatan..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {Array.isArray(notes) && notes.map(note => (
                    <div
                        key={note._id}
                        onClick={() => onSelectNote(note)}
                        className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-150 flex justify-between items-center
                            ${selectedNote?._id === note._id ? 'bg-blue-100' : 'hover:bg-gray-200'}`
                        }
                    >
                        <span className="font-semibold truncate">{note.title || 'Tanpa Judul'}</span>
                        
                        <button 
                            onClick={(e) => handleDelete(e, note._id)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100 focus:outline-none"
                            title="Hapus Catatan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

