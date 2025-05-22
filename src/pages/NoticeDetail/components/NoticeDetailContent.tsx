import { useState, useEffect } from 'react';
import { fetchLocalization } from '@/api/notice';
import { ILocalization } from '@carebell/bell-core';
import { Box, Typography } from '@mui/material';
import { NoticeContentProps } from '@/types/NoticeDetail/NoticeContent.type';
import NoticeDetailContentSkeleton from './NoticeDetailContentSkeleton';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

const NoticeDetailContent = ({ uuid }: NoticeContentProps) => {
  const [localization, setLocalization] = useState<ILocalization | null>(null);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'responsive max-content',
        },
      }),
    ],
    editable: false,
  });

  useEffect(() => {
    setLoading(true);
    fetchLocalization(uuid)
      .then((data) => {
        setLocalization(data);
        if (editor && data.default) {
          editor.commands.setContent(data.default);
        }
      })
      .finally(() => setLoading(false));
  }, [uuid, editor]);

  if (loading) {
    return <NoticeDetailContentSkeleton />;
  }

  if (!localization)
    return <Typography>데이터를 불러올 수 없습니다.</Typography>;

  return (
    <Box
      pt={2}
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

export default NoticeDetailContent;
