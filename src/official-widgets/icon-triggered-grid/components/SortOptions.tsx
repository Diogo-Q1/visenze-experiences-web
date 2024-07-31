import type { FC, ReactElement } from 'react';
import { memo } from 'react';
import { Button } from '@nextui-org/button';
import { cn } from '@nextui-org/theme';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { useIntl } from 'react-intl';
import { SortType } from '../../../common/types/constants';
import type { ScreenType } from '../icon-triggered-grid';
import { getSortTypeIntlId } from '../../../common/utils';

/**
 * A component for selecting and applying product result sorting options.
 */

interface SortOptionsProps {
  sortType: SortType;
  setSortType: (selectedOption: SortType) => void;
  setScreen: (screen: ScreenType | null) => void;
  className: string;
}

const SortOptions: FC<SortOptionsProps> = ({ sortType, setSortType, setScreen, className }): ReactElement => {
  const intl = useIntl();

  return (
    <div className={cn('bg-primary', className)}>
      <div className='primary-text py-3 text-center text-lg lg:py-0 lg:text-start'>{intl.formatMessage({ id: 'iconTriggeredGrid.sort' })}</div>
      <div className='calls-to-action-text flex h-full flex-col gap-2 border-1 p-4'>
        <RadioGroup
          value={sortType}
          onChange={(event) => setSortType(event.target.value as SortType)}
          color='secondary'
        >
          <Radio value={SortType.RELEVANCE} data-pw='itg-sort-relevance'>{intl.formatMessage({ id: getSortTypeIntlId(SortType.RELEVANCE) })}</Radio>
          <Radio value={SortType.PRICE_HTL} data-pw='itg-sort-high-to-low'>{intl.formatMessage({ id: getSortTypeIntlId(SortType.PRICE_HTL) })}</Radio>
          <Radio value={SortType.PRICE_LTH} data-pw='itg-sort-low-to-high'>{intl.formatMessage({ id: getSortTypeIntlId(SortType.PRICE_LTH) })}</Radio>
        </RadioGroup>
      </div>

      {/* Back button */}
      <Button className='my-3 mr-3 w-1/4 flex-shrink-0 self-end rounded border bg-buttonPrimary px-14 text-white'
              radius='none' onClick={() => setScreen(null)} data-pw='itg-back-button'>
        <span className='text-buttonPrimary'>
          {intl.formatMessage({ id: 'iconTriggeredGrid.back' })}
        </span>
      </Button>
    </div>
  );
};

export default memo(SortOptions);
