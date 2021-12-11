import { useEffect, useState } from 'react';
import rooms from '../mockData/rooms.json';
import users from '../mockData/users.json';
import httpService from '../services/http.service';

const useMockData = () => {
  const statusMap = {
    idle: 'Not Started',
    pending: 'In Process',
    success: 'Ready',
    error: 'Error occurred',
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusMap.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = [rooms, users].reduce((acc, cur) => acc + cur.length, 0);

  const incrementCount = () => {
    setCount(prevState => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusMap.idle) {
      setStatus(statusMap.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusMap.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const room of rooms) {
        await httpService.put('rooms/' + room._id, room);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put('user/' + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusMap.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
