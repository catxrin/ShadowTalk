/* eslint-disable react/no-unknown-property */

export default function Shape({ position }) {
  return (
    <div className={`absolute z-40 ${position}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        id='SvgjsSvg3429'
        width='400'
        height='400'
        viewBox='0 0 200 200'
        version='1.1'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        xmlns:svgjs='http://svgjs.dev/svgjs'
      >
        <path
          id='SvgjsPath3428'
          d='M12 17v83c0 49.3 40.5 89.1 90.1 88 46.8-1.1 85-39.4 85.9-86.2.5-25-9.5-47.7-25.8-64C146.3 21.9 124.3 12 100 12H17c-2.7 0-5 2.3-5 5z'
          fill='url("#SvgjsLinearGradient3430")'
        ></path>
        <defs>
          <linearGradient gradientTransform='rotate(0 0.5 0.5)' id='SvgjsLinearGradient3430'>
            <stop stopOpacity=' 1' stopColor='#777777' offset='0'></stop>
            <stop stopOpacity=' 1' stopColor='#999999' offset='0.483499755859375'></stop>
            <stop stopOpacity=' 1' stopColor='#bbbbbb' offset='1'></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
