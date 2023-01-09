import { IconButton } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

type BottomButtonProps = {
  onClick: () => void;
};
const BottomButton = ({ onClick }: BottomButtonProps) => {
  return (
    <IconButton
      size="lg"
      aria-label="go bottom"
      icon={<ArrowDownIcon />}
      onClick={onClick}
    />
  );
};
export default BottomButton;
