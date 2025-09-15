import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useNotes } from './hooks/useNotes';
import Auth from './components/Auth';
import Layout from './components/Layout';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import NotePreview from './components/NotePreview';

export default function App() {
    const { isAuthenticated, user } = useAuth();
    // Teruskan `isAuthenticated` ke hook `useNotes`
    const { notes, addNote, editNote, removeNote, isSaving } = useNotes(isAuthenticated);
    
    const [selectedNote, setSelectedNote] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editorTitle, setEditorTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isCreating) {
            setEditorTitle('Judul Baru');
            setEditorContent('');
        } else if (selectedNote) {
            setEditorTitle(selectedNote.title);
            setEditorContent(selectedNote.content);
        }
    }, [selectedNote, isCreating]);

    // ... (sisa kode handler tetap sama) ...
    const handleSaveNote = async (id_or_title, content_or_new_content) => {
        const titleToSave = isCreating ? id_or_title : editorTitle;
        const contentToSave = isCreating ? content_or_new_content : editorContent;

        if (isCreating) {
            const newNote = await addNote({ title: titleToSave, content: contentToSave });
            if (newNote) {
                setIsCreating(false);
                setSelectedNote(newNote);
            }
        } else {
            await editNote(selectedNote._id, { title: editorTitle, content: editorContent });
            setSelectedNote(prev => ({ ...prev, title: editorTitle, content: editorContent }));
        }
    };
    
    const handleDeleteNote = async (id) => {
        await removeNote(id);
        if (selectedNote && selectedNote._id === id) {
            setSelectedNote(notes.length > 1 ? notes.find(n => n._id !== id) : null);
        }
    };

    const handleSelectNote = (note) => {
        setIsCreating(false);
        setSelectedNote(note);
    };

    const handleStartCreating = () => {
        setIsCreating(true);
        setSelectedNote(null);
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isAuthenticated) {
        return <Auth />;
    }

    const activeNote = isCreating || selectedNote;

    return (
        <Layout user={user}>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
                <div className="col-span-1 border-r border-gray-200 h-full overflow-y-auto">
                    <NoteList
                        notes={filteredNotes}
                        selectedNote={selectedNote}
                        onSelectNote={handleSelectNote}
                        onCreateNote={handleStartCreating}
                        onDeleteNote={handleDeleteNote}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2 h-full flex-col">
                    {activeNote ? (
                        <>
                            <NoteEditor
                                key={selectedNote?._id || 'new-note'}
                                note={selectedNote}
                                onSave={handleSaveNote}
                                onDelete={handleDeleteNote}
                                isCreating={isCreating}
                                isSaving={isSaving}
                                title={editorTitle}
                                content={editorContent}
                                onTitleChange={setEditorTitle}
                                onContentChange={setEditorContent}
                            />
                            <NotePreview content={editorContent} />
                        </>
                    ) : (
                        <div className="col-span-2 flex items-center justify-center h-full text-gray-500">
                            Pilih catatan untuk dilihat atau buat yang baru.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

