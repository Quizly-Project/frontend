import React, { useEffect, useState } from 'react';
import { Text3D } from '@react-three/drei';
import { MeshStandardMaterial, MeshPhongMaterial } from 'three';
import useAudioStore from '../../../store/audioStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

export default function Blackboard(props) {
  const { isAnswerDisplayed, type } = useQuizRoomStore(state => state.quizRoom);
  // material
  const chalkMaterial = new MeshPhongMaterial({
    color: '#FFF5C0',
    emissive: '#FFF5C0',
    emissiveIntensity: 1.0,
  });

  // const fullText =
  //   'Q. 태풍은 적도 부근에서 형성되어 북반구에서는 시계 반대 방향으로 회전합니다.';
  const fullText = props.text.question;
  const [displayedText, setDisplayedText] = useState('');
  const [dispalyedAnswer, setDisplayedAnswer] = useState('');
  useEffect(() => {
    console.log('props.text', props.text);
  }, [props.text]);
  // 한 글자씩 표시되는 효과
  const { initializeWritingSound, playWritingSound, stopWritingSound } =
    useAudioStore();

  useEffect(() => {
    initializeWritingSound();
  }, [initializeWritingSound]);

  useEffect(() => {
    if (!fullText || isAnswerDisplayed) return;
    let index = 0;
    playWritingSound();

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        stopWritingSound();
      }
    }, 70);

    return () => {
      clearInterval(interval);
      stopWritingSound();
    };
  }, [fullText, playWritingSound, stopWritingSound]);

  // 줄바꿈 적용
  const maxLineLength = 17;
  const splitText = (text, maxLength) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }
    return lines;
  };

  const lines = splitText(displayedText, maxLineLength);

  const OX = text => {
    if (text === '1') return 'O';
    if (text === '2') return 'X';
    return text;
  };
  useEffect(() => {
    console.log('isAnswerDisplayed', isAnswerDisplayed);
    if (isAnswerDisplayed) {
      setDisplayedAnswer(props.text.correctAnswer);
    }
  }, [isAnswerDisplayed]);

  return isAnswerDisplayed ? (
    <group {...props} dispose={null}>
      <Text3D
        scale={30}
        font="/fonts/UhBee_Regular.json"
        position={[-20, -30, 110]}
      >
        {type === 1 ? OX(dispalyedAnswer) : dispalyedAnswer}
        <meshStandardMaterial attach="material" {...chalkMaterial} />
      </Text3D>
    </group>
  ) : (
    <group {...props} dispose={null}>
      {lines &&
        lines.map((line, index) => (
          <Text3D
            key={index}
            scale={8}
            font="/fonts/UhBee_Regular.json"
            position={[-80, 10 - index * 22, 93]}
          >
            {line}
            <meshPhongMaterial attach="material" {...chalkMaterial} />
          </Text3D>
        ))}
    </group>
  );
}
