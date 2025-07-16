import React from 'react';
import { Badge, Tooltip } from '@mui/material';
import IconFilter from '@hcl-software/enchanted-icons/dist/carbon/es/filter';
import IconButton from '../IconButton';

const BadgeFilterButton: React.FC = () => {
  const [badgeVisible, setBadgeVisible] = React.useState(false);
  return (
    <Tooltip title="Filter Assets">
      <span data-testid="testFilterButtonContainer">
        <Badge
          color="primary"
          variant="dot"
          invisible={!badgeVisible}
          overlap="circular"
          data-testid="testFilterBadge"
          sx={{ '& .MuiBadge-dot': { top: '5%', right: '5%' } }}
        >
          <IconButton
            value="filter"
            sx={{ height: '26px', width: '26px' }}
            disabled={false}
            data-testid="testFilterButton"
            onClick={() => { return setBadgeVisible((prev) => { return !prev; }); }}
          >
            <IconFilter />
          </IconButton>
        </Badge>
      </span>
    </Tooltip>
  );
};

export default BadgeFilterButton;
