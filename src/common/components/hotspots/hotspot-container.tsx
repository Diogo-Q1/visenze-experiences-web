import type { FC } from 'react';
import { useEffect, useContext, useState, useRef } from 'react';
import { cn } from '@nextui-org/theme';
import { CroppingContext, WidgetResultContext } from '../../types/contexts';
import { isSameBox } from '../../box-utils';
import type { CroppedBox } from '../../types/box';
import Hotspot from './hotspot';

interface HotspotContainerProps {
  referenceImage: string;
  className?: string;
}

const HotspotContainer: FC<HotspotContainerProps> = ({
  referenceImage,
  className,
}) => {
  const { productTypes = [] } = useContext(WidgetResultContext);
  const croppingContext = useContext(CroppingContext);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [heightScale, setHeightScale] = useState(1);
  const [widthScale, setWidthScale] = useState(1);
  const [selectedHotspot, setSelectedHotspot] = useState(-1);
  const [croppedBoxes, setCroppedBoxes] = useState<CroppedBox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onCropBoxInit = (): void => {
    const boxes: CroppedBox[] = productTypes.map((productType) => {
      const dataBox = productType.box;
      return {
        x1: dataBox[0] * widthScale,
        y1: dataBox[1] * heightScale,
        x2: dataBox[2] * widthScale,
        y2: dataBox[3] * heightScale,
      };
    });
    setCroppedBoxes(boxes);

    const croppedBox = croppingContext.boxData?.box;
    if (croppedBox) {
      const index = boxes.findIndex((box) => isSameBox(box, croppedBox));
      if (index !== -1) setSelectedHotspot(index);
    } else {
      setSelectedHotspot(0);
    }
  };

  const handleInnerDotClick = (index: number): void => {
    setSelectedHotspot(index);
    if (croppingContext.setBoxData) {
      croppingContext.setBoxData({
        box: croppedBoxes[index],
        index,
      });
    }
  };

  const onLoad = (): void => {
    const img = imageRef.current;
    if (!img) {
      return;
    }
    setImageWidth(img.clientWidth);
    setImageHeight(img.clientHeight);
    setWidthScale(img.clientWidth / img.naturalWidth);
    setHeightScale(img.clientHeight / img.naturalHeight);
  };

  useEffect(() => {
    if (productTypes.length > 0) {
      onCropBoxInit();
    }
  }, [productTypes]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={cn('flex w-full justify-center', className)}>
      <div className='size-full overflow-hidden'>
        <div className='relative size-full text-center' ref={boxRef}>
          <>
            <img
              className='object-cover object-center lg:h-full'
              ref={imageRef}
              src={referenceImage}
              onLoad={() => setTimeout(() => onLoad(), 500)} // Delay needed to get correct image width and height for calculation in onLoad
              data-pw='hotspot-reference-image'
            />
            <div
              className='absolute top-1/2 inline-block max-h-full max-w-full -translate-x-1/2 -translate-y-1/2'
              style={{
                width: imageWidth,
                height: imageHeight,
              }}>
              {croppedBoxes.map((box, index) => (
                <Hotspot
                  key={index}
                  index={index}
                  box={box}
                  heightScale={heightScale}
                  widthScale={widthScale}
                  isSelected={selectedHotspot === index}
                  handleInnerDotClick={handleInnerDotClick}
                />
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default HotspotContainer;
