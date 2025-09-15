import React from 'react';

// Terima props baru: title, content, onTitleChange, onContentChange
export default function NoteEditor({ 
    note, 
    onSave, 
    onDelete, 
    isCreating, 
    isSaving,
    title,
    content,
    onTitleChange,
    onContentChange
}) {

    const handleSave = () => {
        // Gunakan title dan content dari props untuk menyimpan
        if (isCreating) {
            onSave(title, content);
        } else {
            onSave(note._id, title, content);
        }
    };

    const handleDelete = () => {
        if (!isCreating) {
            onDelete(note._id);
        }
    };
    
    return (
        <div className="p-4 flex flex-col h-full bg-white border-r border-gray-200">
            <input
                type="text"
                value={title} // Nilai dikontrol oleh prop
                onChange={(e) => onTitleChange(e.target.value)} // Perubahan dikirim ke atas
                placeholder="Judul Catatan"
                className="text-2xl font-bold mb-4 p-2 border-b-2 focus:outline-none focus:border-blue-500"
            />
            <textarea
                value={content} // Nilai dikontrol oleh prop
                onChange={(e) => onContentChange(e.target.value)} // Perubahan dikirim ke atas
                placeholder="Tuliskan catatan Anda di sini..."
                className="flex-1 w-full p-2 text-lg border-none focus:outline-none resize-none"
            />
            <div className="flex justify-end items-center mt-4 border-t pt-4">
                <button
                    onClick={handleDelete}
                    disabled={isCreating || isSaving}
                    className="px-4 py-2 text-red-600 rounded-md hover:bg-red-100 disabled:opacity-50"
                >
                    Hapus
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex justify-center items-center w-40"
                >
                    {isSaving ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        isCreating ? 'Simpan Catatan' : 'Simpan Perubahan'
                    )}
                </button>
            </div>
        </div>
    );
}

