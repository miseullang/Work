import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Box, Typography } from '@mui/material';
import { RichTextViewerProps } from '@/types/RichTextViewer/RichTextViewer.type';
import NoticeDetailContentSkeleton from '@/pages/NoticeDetail/components/NoticeDetailContentSkeleton';

const RichTextViewer = ({ content,  }: RichTextViewerProps) => {
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

  if (!content) return <Typography>내용이 없습니다.</Typography>;
  if (!editor) return <NoticeDetailContentSkeleton />;

  return (
    <Box
      role='article'
      aria-label='리치 텍스트 컨텐츠'
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
