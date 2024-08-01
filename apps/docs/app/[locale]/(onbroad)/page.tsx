'use client'

import { useEffect } from 'react';
import { useRouter } from '@shared/next-intl/navigation';

import TypographyLarge from "@ui/components/typography/large"
import TypographySmall from '@ui/components/typography/small';

const OnBroadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/exchange');
  }, [router]);

  return (
    <div className="w-full flex flex-col items-end justify-end h-screen bg-[url('/project/bg_tg.png')] bg-cover bg-no-repeat bg-center">
      <div className='w-full h-[100px] flex flex-col gap-2 items-center justify-center'>
        <svg className='animate-spin' width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.1013 29C57.1499 29 58.0065 28.1489 57.9379 27.1026C57.5969 21.901 55.8587 16.8745 52.8905 12.5609C49.5627 7.7247 44.8455 4.01233 39.3625 1.91462C33.8796 -0.183096 27.8891 -0.567366 22.183 0.812613C16.477 2.19259 11.3241 5.27183 7.40566 9.64323C3.48722 14.0146 0.987742 19.4723 0.237679 25.2948C-0.512385 31.1172 0.522291 37.0302 3.20491 42.2519C5.88753 47.4737 10.0918 51.7583 15.2618 54.5394C19.8731 57.0199 25.059 58.2001 30.2668 57.9723C31.3144 57.9265 32.0671 56.9823 31.9528 55.94C31.8386 54.8976 30.9005 54.1528 29.8525 54.1882C25.4103 54.3386 20.9949 53.3115 17.0607 51.1952C12.5677 48.7783 8.91395 45.0547 6.5826 40.5167C4.25125 35.9787 3.35206 30.84 4.0039 25.7799C4.65575 20.7199 6.82794 15.9769 10.2333 12.1779C13.6386 8.37887 18.1168 5.70284 23.0757 4.50356C28.0345 3.30427 33.2406 3.63823 38.0056 5.46126C42.7706 7.28429 46.8702 10.5106 49.7622 14.7135C52.2945 18.3937 53.7967 22.6709 54.1312 27.1031C54.2101 28.1487 55.0527 29 56.1013 29Z" fill="url(#paint0_linear_37_172)"></path>
          <defs>
            <linearGradient id="paint0_linear_37_172" x1="29" y1="58" x2="29" y2="2.73685e-07" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"></stop>
              <stop offset="1" stop-color="#FFC14A"></stop>
            </linearGradient>
          </defs>
        </svg>
        <TypographyLarge text="Đang tải" className="text-white text-2xl" />
      </div>
      <div className="loading-launch-bottom">
        <TypographyLarge text="Hamster Kombat Token" className="text-2xl text-[#ffc147] font-black" />
        <TypographySmall text="will be launched" className="text-[14px] text-[#fff8] font-bold" />
        <TypographySmall text="on TON" className="text-5xl text-white font-black mt-2" />
      </div>
    </div>
  );
};

export default OnBroadingPage;