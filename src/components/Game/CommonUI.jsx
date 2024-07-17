import { useState, useEffect } from 'react';
import QuizResultText from './QuizResultText';
import ChatComponent from '../common/ChatComponent/ChatComponent';
import ParticipantList from './ParticipantList/ParticipantList';
import Timer from './Timer/Timer';
import QuizProgress from './QuizProgress/QuizProgress';
import TopThreeParticipants from './TopThreeParticipants/TopThreeParticipants';
import QuizQuestionCompletion from './QuizQuestionCompletion/QuizQuestionCompletion';
import useQuizRoomStore from '../../store/quizRoomStore';
import VoiceChat from './VoiceChat/VoiceChat.tsx';
import RoundEndMessage from './RounEndMessage/RoundEndMessage';

const CommonUI = ({
  quizResult,
  quiz,
  timer,
  quizCnt,
  quizIndex,
  quizAnswerer,
  nickName,
  isJoined,
  code,
  participants,
  onSelectStudent,
  selectedStudent,
  isTeacher,
}) => {
  const [showCompletion, setShowCompletion] = useState(false);
  const [showTopThree, setShowTopThree] = useState(false);
  const { isStarted, isFinished } = useQuizRoomStore(state => state.quizRoom);
  const handleOnComplete = () => {
    setShowCompletion(false);
    setShowTopThree(true);
  };

  useEffect(() => {
    if (!isStarted && quizResult) setShowCompletion(true);
  }, [isStarted, quizResult]);

  return (
    <div className="common-ui">
      {isJoined && (
        <ChatComponent
          roomCode={code}
          nickName={nickName}
          isTeacher={isTeacher}
        />
      )}
      {
        // <QuizQuestionCompletion
        //   message={'정지!'}
        //   onComplete={handleOnComplete}
        //   show={showCompletion}
        // />
        <RoundEndMessage
          message={'정지!'}
          onComplete={handleOnComplete}
          show={showCompletion}
        />
      }
      {showTopThree && quizResult && (
        <TopThreeParticipants
          quizResult={quizResult}
          isStarted={isStarted}
          participants={participants}
          setShowTopThree={setShowTopThree}
        />
      )}
      <QuizProgress currentQuiz={quizIndex} totalQuizzes={quizCnt} />
      {isFinished && <QuizResultText quizResult="퀴즈 종료" />}
      <ParticipantList
        participants={participants}
        isTeacher={isTeacher}
        onSelectStudent={onSelectStudent}
        selectedStudent={selectedStudent}
      />
      <Timer timer={timer} />
      {nickName && (
        <VoiceChat
          roomCode={code}
          nickName={nickName}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
};

export default CommonUI;
