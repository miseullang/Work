import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Box } from '@mui/material';
import { RichTextViewerProps } from '@/types/RichTextViewer/RichTextViewer.type';

const RichTextViewer = ({ content }: RichTextViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'responsive max-content',
        },
      }),
    ],
    content,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        '.ProseMirror': {
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          },
          '& p': {
            margin: '1rem 0',
            '&:first-of-type': {
              marginTop: 0,
            },
            '&:last-of-type': {
              marginBottom: 0,
            },
          },
        },
      }}>
      <EditorContent editor={editor} />
    </Box>
  );
};

export default RichTextViewer;
