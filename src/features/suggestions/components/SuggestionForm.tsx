import { Piece } from '@prisma/client';
import React from 'react';

import Button from '@/components/elements/button/Button';
import { SendIcon } from '@/components/elements/icons/icons';
import { useToast } from '@/contexts/ToastContext';
import { generateAIAdvise } from '@/features/suggestions/utils/chatGPT';
import { usePieceSelectModal } from '@/hooks/usePieceSelectModal';
import { getErrorMessage } from '@/utils/errorHandler';

import { convertAiMessage } from '../utils/utils';

const SuggestionForm = () => {
  const [message, setMessage] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<React.ReactNode | null>();
  const [sentMessage, setSentMessage] = React.useState<string>('');
  const { addToastMessage } = useToast();

  const [isResponseLoading, setResponseLoading] = React.useState(false);

  const createMessage = (piece: Piece) => {
    setMessage(
      `I would like to ask for good matching pieces for this item below
Name: ${piece.title}
Description: ${piece.description}
Color: ${piece.color}`,
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) {
      addToastMessage('Please type something in a form!!');
      return;
    }

    setAiResponse('');
    setSentMessage(message);
    setMessage('');
    setResponseLoading(true);
    try {
      const response = await generateAIAdvise(message);
      const { content } = response.message;
      setAiResponse(convertAiMessage(content));
    } catch (error) {
      addToastMessage(getErrorMessage(error));
    } finally {
      setResponseLoading(false);
    }
  };

  const { Modal, setIsModalOpen } = usePieceSelectModal({ createMessage });

  return (
    <form onSubmit={(e) => onSubmit(e)} className="h-full max-h-full relative">
      <div className="flex flex-col h-full w-full overflow-y-scroll">
        <div className="h-[85%] overflow-y-scroll flex flex-col gap-3">
          {sentMessage && (
            <div className="w-full flex justify-end">
              <div className="relative bg-lightGreen w-[70%] whitespace-pre-wrap p-md rounded-md mr-[30px] userSpeechBubble">
                {sentMessage}
              </div>
            </div>
          )}
          {isResponseLoading && (
            <div className="relative ml-[30px] bg-lightOrange whitespace-pre-wrap p-md rounded-md aiSpeechBubble w-[50%]">
              waiting for AI response...
            </div>
          )}
          {aiResponse && (
            <div className="relative ml-[30px] bg-lightOrange w-[70%] whitespace-pre-wrap p-md rounded-md aiSpeechBubble">
              {aiResponse}
            </div>
          )}
        </div>
        <div className="bottom-0 absolute flex items-end w-full flex-col">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              type="button"
              className="underline mb-1"
            >
              Wanna ask about your piece?
            </button>
          </div>
          <div className="pt-sm bg-gray w-full">
            <div className="w-full relative">
              <div className=" py-sm px-md pr-[70px] overflow-y-hidden whitespace-pre-wrap    break-words max-h-[164px] min-h-[44px] invisible leading-[24px] rounded-md">
                {message}
                {/* ダミーのテキストを入れてline-heightの高さが確保されるようにする */}|
              </div>
              <textarea
                placeholder="Ask for an AI suggestion on your outfit"
                className="absolute border-middleGreen border-1 right-0 top-0 bottom-0 left-0 bg-gray rounded-md py-sm px-md whitespace-pre-wrap break-words resize-none leading-[24px] max-h-[164px] pr-[70px]"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              />
              <Button style="px-sm py-xs  absolute right-3 bottom-[22px] translate-y-1/2">
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {Modal}
    </form>
  );
};

export default SuggestionForm;
