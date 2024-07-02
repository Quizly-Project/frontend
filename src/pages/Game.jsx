import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import io from 'socket.io-client';
import Lights from '../components/3d/Environment/Lights.jsx';
import Cube from '../components/3d/Mesh/Cube.jsx';
import Level from '../components/3d/Environment/Level.jsx';
import OtherCube from '../components/3d/Mesh/OtherCube.jsx';
import '../styles/game.css';

export default function Game() {
  // useState로 관리해야 브라우저당 한 번만 접속한다.
  const [socket] = useState(() => io('http://localhost:81/quizly'));
  const [nickname] = useState(() => Math.floor(Math.random() * 10000));

  /* client의 좌표 */
  const [clientCoords, setClientCoords] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  /* 초기 위치 */
  const defaultPos = {
    x: 0,
    y: 0,
    z: 0,
  };

  /* ------- events ------- */
  useEffect(() => {
    console.log(clientCoords);
  }, [clientCoords]);

  // 리스너를 마운트 될 때 한 번만 생성한다.
  useEffect(() => {
    socket.emit('room', nickname, 1); // 1번 방에 nickname으로 입장했다고 서버에 전달

    /* 연결 성공 */
    socket.on('connect', () => {
      console.log({ nickname }, 'connected.');
    });

    socket.on('roomIn', data => {
      // state 변수가 아닌 다른 변수에 for문을 돌며 저장해준 후
      // for이 끝나면 그때 clientCoords를 setState 한다.
      console.log(data);
      setClientCoords(prevCoords => {
        const newCoords = { ...prevCoords };
        Object.keys(data).forEach(key => {
          const [name, coord] = data[key];
          if (name !== nickname) {
            newCoords[name] = coord;
          }
        });

        return newCoords;
      });
    });

    /* 다른 클라이언트 입장 
      서버가 보내주는 데이터: (새로운 클라이언트의 nickname) */
    socket.on('comeOn', data => {
      // 좌표 저장 (초기 위치는 (0,0,0))
      console.log(data, defaultPos);

      setClientCoords(prevCoords => {
        return { ...prevCoords, [data]: defaultPos };
      });
      console.log('new client!');
    });

    /* 다른 클라이언트가 이동했을 때
      서버가 보내주는 데이터: (이동한 클라이언트의 nickname, 이동한 위치 (x, y, z)) */
    socket.on(1, data => {
      setClientCoords(prevCoords => {
        return { ...prevCoords, [data[0]]: data[1] };
      });
    });

    /* 다른 클라이언트가 연결 해제 */
    socket.on('roomOut', data => {
      console.log('roomOut', data);
      setClientCoords(prevCoords => {
        const newCoords = { ...prevCoords };
        delete newCoords[data];
        return newCoords;
      });
    });

    /* 연결 해제 */
    socket.on('disconnect', data => {
      console.log({ nickname }, 'disconnected.');
      console.log(data);
      socket.disconnect();
    });

    setIsConnected(true);
  }, [socket, nickname]);

  return (
    <>
      <OrbitControls />

      <Lights />
      <Cube nickname={nickname} socket={socket} />
      {isConnected &&
        Object.keys(clientCoords).map(key => {
          if (key != nickname) {
            return (
              <OtherCube key={key} nickname={key} pos={clientCoords[key]} />
            );
          }
        })}
      <Level />
    </>
  );
}
