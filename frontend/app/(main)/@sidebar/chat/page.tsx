'use client';

import { Suspense } from 'react';
import ChatSidebar from '../../chat/sidebar';
import styles from '../../chat/chat-polish.module.css';

export default function ChatSidebarSlot() {
  return (
    <div className={styles.chatSidebarTheme}>
      <Suspense>
        <ChatSidebar />
      </Suspense>
    </div>
  );
}
