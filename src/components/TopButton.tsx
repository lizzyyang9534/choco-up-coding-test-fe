import { IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

type TopButtonProps = {
  onClick: () => void;
};
const TopButton = ({ onClick }: TopButtonProps) => {
  return (
    <IconButton
      size="lg"
      aria-label="go top"
      icon={<ArrowUpIcon />}
      onClick={onClick}
    />
  );
};
export default TopButton;
