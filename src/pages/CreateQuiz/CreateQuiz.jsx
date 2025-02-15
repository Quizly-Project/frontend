import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './CreateQuiz.module.css';
import Text from '../../components/common/Text/Text';
import MultipleChoiceForm from '../../components/common/MultipleChoiceForm/MultipleChoiceForm';
import ShortAnswerForm from '../../components/common/ShortAnswerForm/ShortAnswerForm.jsx';

const CreateQuiz = () => {
  const { quizType } = useParams();

  const quizTypeMap = {
    'multiple-choice': '객관식',
    'short-answer': '도전 골든벨',
  };

  const renderQuizForm = () => {
    switch (quizType) {
      case 'multiple-choice':
        return <MultipleChoiceForm />;
      case 'short-answer':
        return <ShortAnswerForm />;
      default:
        return <Text>지원하지 않는 퀴즈 유형입니다.</Text>;
    }
  };

  return (
    <div className={styles.createQuiz}>
      <Text type="title" weight="bold" size="large">
        {quizTypeMap[quizType] || '알 수 없는 유형'} 퀴즈 만들기
      </Text>
      {renderQuizForm()}
    </div>
  );
};

export default CreateQuiz;
