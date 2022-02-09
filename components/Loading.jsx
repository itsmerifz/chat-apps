import React from 'react';
import Image from 'next/image';
import { ThreeBounce } from 'better-react-spinkit';

function Loading() {
  return (
    <center style={{
      display: 'grid',
      placeItems: 'center',
      height: '100vh',
    }}>
      <div>
        <div style={{
          marginBottom: '10px',
        }}>
          <Image
            src="https://goto.itsmerifz.my.id/img/logo%20porto%20pth.png"
            alt=""
            height={200}
            width={300}
          />
        </div>
        <ThreeBounce color="white" gutter={20} timingFunction='ease' />
      </div>
    </center>
  );
}

export default Loading;
