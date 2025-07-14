import { JSX } from 'react';
import { useAppSelector } from '../hooks/index.js';

function LoadingScreen(): JSX.Element {
  // const isLoading = useAppSelector((state) => state.isLoading);
  // if(isLoading) {
  //   return (
  //     <p>Loading ...</p>
  //   );
  // }
  return <p>Loading ...</p>

}

export default LoadingScreen;
