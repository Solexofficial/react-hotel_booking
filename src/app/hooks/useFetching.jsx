import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function useFetching(callback) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetching = async (...args) => {
    try {
      setLoading(true);
      await callback(...args);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const errorCatcher = error => {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  };

  return [fetching, isLoading, error];
}
