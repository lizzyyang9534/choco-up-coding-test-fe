import { IconButton, Tooltip } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

type BottomButtonProps = {
  onClick: () => void;
};
const BottomButton = ({ onClick }: BottomButtonProps) => {
  return (
    <Tooltip label="Scroll To Bottom">
      <IconButton
        size="lg"
        aria-label="go bottom"
        icon={<ArrowDownIcon />}
        onClick={onClick}
      />
    </Tooltip>
  );
};
export default BottomButton;
