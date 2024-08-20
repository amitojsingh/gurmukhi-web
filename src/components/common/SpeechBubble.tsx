'use client'
import Image from "next/image";

const SpeechBubble: React.FC = () => {
    const heading = 'ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ || ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ ||';
    const message = 'Before you start adding new words to your vocabulary, we just need some information from you.';

    return (
      <div className="speech-bubble">
        <Image
          src="/images/sardarji.png"
          alt="sikh-man"
          style={{ width: 'auto', height: '110px' }}
          width={80}
          height={130}
          className="sikh-man"
        />
        <div className="bubble-text">
          <span className="gurmukhi mb-3">{heading}</span>
          <span>{message}</span>
        </div>
      </div>
    );
};

export default SpeechBubble;