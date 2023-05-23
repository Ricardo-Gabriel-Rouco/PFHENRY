import React from 'react';

import { ChatEngine } from 'react-chat-engine'

const SupportAdmin = () => {
  return (
    <ChatEngine 
      projectID={'3b721c18-f771-47c9-9e19-e108ac6e3db0'}
      userName={'bookskingdom@outlook.com'}
      userSecret={'admin'}
      height='calc(100vh - 12px)'
    />
  );
}

export default SupportAdmin;
