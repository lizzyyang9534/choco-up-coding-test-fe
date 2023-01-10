import { IconButton, Tooltip } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

type ScrollButtonProps = {
  direction: 'top' | 'bottom';
};
const ScrollButton = ({ direction }: ScrollButtonProps) => {
  const scrollTo = () => {
    window.scrollTo({
      top: direction === 'top' ? 0 : document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Tooltip label={`Scroll To ${direction}`} textTransform="capitalize">
      <IconButton
        variant="outline"
        colorScheme="blackAlpha"
        size="lg"
        aria-label={`go ${direction}`}
        icon={direction === 'top' ? <ArrowUpIcon /> : <ArrowDownIcon />}
        onClick={scrollTo}
      />
    </Tooltip>
  );
};
export default ScrollButton;
