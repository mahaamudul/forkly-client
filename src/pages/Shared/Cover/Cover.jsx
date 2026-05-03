import { Parallax,} from 'react-parallax';

const Cover = ({img,title,subTitle}) => {
  return (
    <Parallax
    blur={{ min: -15, max: 15 }}
    bgImage={img}
    bgImageAlt={title}
    strength={-200}
>
<div
      className="hero min-h-[360px] md:min-h-[520px]"
     
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content content-shell w-full text-center text-neutral-content">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-5 text-4xl md:text-6xl uppercase font-bold">{title}</h1>
          {subTitle && <p className="mb-5 text-base md:text-lg">
            {subTitle}
          </p>}
        </div>
      </div>
    </div>
</Parallax>
  );
};

export default Cover;
