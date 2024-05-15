import { Piece } from '@prisma/client';
import React from 'react';

import Button from '@/components/elements/button/Button';
import { AiChatIcon, SendIcon } from '@/components/elements/icons/icons';
import ErrorMessage from '@/components/elements/message/ErrorMessage';
import { useToast } from '@/contexts/ToastContext';
import { generateAIAdvise } from '@/features/suggestions/utils/chatGPT';
import { useAuth } from '@/hooks/useAuth';
import { usePieceSelectModal } from '@/hooks/usePieceSelectModal';
import { getErrorMessage } from '@/utils/errorHandler';

import { convertAiMessage } from '../utils/utils';

const SuggestionForm = () => {
  const { userId } = useAuth();
  const [message, setMessage] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<React.ReactNode | null>();
  const [sentMessage, setSentMessage] = React.useState<string>('');
  const { addToastMessage } = useToast();
  const [aiMessageLimitError, setAiMessageLimitError] = React.useState('');

  const [isResponseLoading, setResponseLoading] = React.useState(false);

  const createMessage = (piece: Piece) => {
    setMessage(
      `I would like to ask for good matching pieces for this item below
Name: ${piece.itemName}
Description: ${piece.description}
Color: ${piece.color}`,
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 300) {
      setAiMessageLimitError('Message should be less than 300 characters');
      return;
    }
    if (!message || !userId) {
      addToastMessage('Please type something in a form.');
      return;
    }

    setAiResponse('');
    setSentMessage(message);
    setMessage('');
    setResponseLoading(true);
    try {
      const response = await generateAIAdvise(message, userId);
      if (response.status === 429) {
        addToastMessage('You have exceeded the limit of use of AI suggestion');
        return;
      }
      const { content } = response.message;
      if (message.includes('I would like to ask for good matching pieces for this item below')) {
        setAiResponse(convertAiMessage(content));
      } else {
        setAiResponse(content);
      }
    } catch (error) {
      addToastMessage(getErrorMessage(error));
    } finally {
      setResponseLoading(false);
    }
  };

  const { Modal, setIsModalOpen } = usePieceSelectModal({ createMessage });

  return (
    <form onSubmit={(e) => onSubmit(e)} className="max-xs:max-h-[74svh] h-full relative">
      <div className="flex flex-col h-full w-full">
        <div className="h-[85%] w-full  flex flex-col gap-3 overflow-y-scroll">
          {!sentMessage && (
            <div className="h-full w-full flex flex-col xs:-mt-md max-xs:justify-center">
              <div className="w-full flex justify-center">
                <AiChatIcon style="xs:h-[220px] xs:w-[220px] h-[150px] w-[150px] xs:mr-md" />
              </div>
              <div className="w-full text-center">
                <h2 className="xs:text-xl text-lg font-bolder tracking-tighter xs:mb-md mb-sm">2 Way to Use</h2>
                <h3 className="xs:text-lg font-bolder tracking-tight mb-xs">1: Ask for Matching pieces</h3>
                <p className="mb-sm leading-[1.3] max-xs:text-sm">
                  You can ask for matching pieces for selected item <br /> by clicking the button below
                  <span className="font-bold"> &quot;wanna ask about your piece? &quot;</span>. <br /> AI will give you
                  3 suggestions for the item you have selected.
                </p>
                <h3 className="xs:text-lg font-bolder tracking-tight mb-xs">
                  2: Ask general question about your outfit or question
                </h3>
                <p className="mb-sm leading-[1.3]  max-xs:text-sm">
                  You can ask a general fashion question <br className="xs:hidden" /> by typing in the text area below.{' '}
                  <br />
                  *If you ask a non fashion related question, <br className="xs:hidden" />
                  AI will not answer properly.
                </p>
                <h3 className="xs:text-base tracking-tight mb-xs text-accentOrange text-sm">
                  *Note: This AI chat feature can be used up to 5 times per day.
                </h3>
              </div>
            </div>
          )}
          {sentMessage && (
            <div className="w-full flex justify-end">
              <div className="bg-middleGreen text-gray xs:w-[60%] w-4/5 relative whitespace-pre-wrap p-lg rounded-md shadow-md">
                {sentMessage}
              </div>
            </div>
          )}
          {isResponseLoading && (
            <div className="relative xs:w-[60%] w-4/5 whitespace-pre-wrap p-lg rounded-md shadow-md bg-middleGreen text-gray flex gap-xs">
              <div className="h-2 w-2 bg-gray rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 bg-gray rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 bg-gray rounded-full animate-bounce"></div>
            </div>
          )}
          {aiResponse && (
            <div className="relativexs:w-[60%] w-4/5 shadow-md  whitespace-pre-wrap p-lg rounded-md mb-md bg-middleGreen text-gray">
              {aiResponse}
            </div>
          )}
        </div>
        <div className="xs:bottom-0 -bottom-1 absolute flex items-end w-full flex-col pt-sm bg-darkGray">
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
          <div className="pt-sm  w-full">
            <div className="w-full relative">
              <div className=" py-sm px-md pr-[70px] overflow-y-hidden whitespace-pre-wrap break-words max-h-[164px] min-h-[44px] invisible leading-[24px] rounded-md">
                {message}
                {/* ダミーのテキストを入れてline-heightの高さが確保されるようにする */}|
              </div>
              <ErrorMessage style={`${!aiMessageLimitError && 'hidden'} -top-5`}>{aiMessageLimitError}</ErrorMessage>
              <textarea
                placeholder="Ask for an AI suggestion on your outfit"
                className="absolute border-middleGreen border-1 right-0 top-0 bottom-0 left-0 rounded-md py-sm px-md whitespace-pre-wrap break-words resize-none leading-[24px] max-h-[164px] min-h-[44px] pr-[70px] bg-darkGray hide-scrollbar"
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              />
              <Button style="px-sm py-xs absolute right-3 bottom-[22px] translate-y-1/2">
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
