import React from 'react';
import { useLiveKitStore } from '../../../store/liveKitStore';
import styles from './ParticipantList.module.css';

const ParticipantList = ({
  participants,
  isTeacher,
  onSelectStudent,
  selectedStudent,
}) => {
  const { currentSpeakers } = useLiveKitStore();

  return (
    <div className={styles.participantList}>
      {/* <h3 className={styles.title}>참가자 목록</h3> */}
      {isTeacher && selectedStudent && (
        <button
          className={styles.resetButton}
          onClick={() => onSelectStudent(null)}
        >
          내 시점으로
        </button>
      )}
      <ul className={styles.list}>
        {participants.map(participant => {
          const iconClass = participant ? styles[participant.icon] : '';
          return (
            <li
              key={participant.nickName}
              className={`${styles.participant} ${participant.nickName === selectedStudent ? styles.selected : ''} ${participant.isTeacher ? styles.teacher : ''} ${currentSpeakers.includes(participant.nickName) ? styles.speaking : ''}`}
              onClick={() => {
                return isTeacher && onSelectStudent(participant.nickName);
              }}
            >
              <div className={styles.participantInfo}>
                <div className={`${styles.participantIcon} ${iconClass}`}></div>
                <span className={styles.nickname}>{participant.nickName}</span>
              </div>
              {participant.isTeacher && (
                <span className={styles.teacherBadge}>선생님</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ParticipantList;
