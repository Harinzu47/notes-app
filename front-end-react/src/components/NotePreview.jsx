import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Konfigurasi marked agar lebih sesuai dengan Tailwind Prose
marked.setOptions({
  breaks: true, // Merender baris baru sebagai <br>
});

export default function NotePreview({ content }) {
    const getMarkdownText = () => {
        // Gunakan DOMPurify untuk membersihkan HTML dari potensi serangan XSS
        const rawMarkup = marked(content || 'Pratinjau akan muncul di sini...');
        const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
        return { __html: sanitizedMarkup };
    };

    return (
        // Wrapper untuk tata letak dan styling
        <div className="h-full overflow-y-auto bg-gray-50 p-6 border-l border-gray-200">
            <div 
                // Kelas 'prose' dari Tailwind untuk styling tipografi yang indah
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={getMarkdownText()} 
            />
        </div>
    );
}

