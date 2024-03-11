// import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Box,
//   Card,
//   CardActionArea,
//   Collapse,
//   Grid,
//   List,
//   Skeleton,
// } from '@mui/material';
// import PropTypes from 'prop-types';
// import { TransitionGroup } from 'react-transition-group';
// import CollectionListItem from './CollectionListItem';
// import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
// import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
// import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
// import FlexBetween from '../../../REUSABLE_COMPONENTS/FlexBetween';
// // <Collapse key={`skeleton-${count}`}>
// // <Card variant="outlined" sx={{ m: 1 }}>
// const CollectionListItemSkeleton = ({ count }) => {
//   return (
//     <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
//       <Card sx={{ width: '100%' }}>
//         <CardActionArea sx={{ width: '100%' }} disabled={true}>
//           <Grid container spacing={2} sx={{ p: 2 }}>
//             <Skeleton variant="circular" width={40} height={40} />
//             <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
//             <Skeleton variant="text" width="60%" />
//           </Grid>
//         </CardActionArea>
//       </Card>
//     </Box>
//   );
// };

// CollectionListItemSkeleton.propTypes = {
//   count: PropTypes.number,
// };

// CollectionListItemSkeleton.displayName = 'CollectionListItemSkeleton';

// const SelectCollectionList = ({ openDialog }) => {
//   const { allCollections } = useSelectedCollection();
//   const minListSize = 5;
//   const collectionCount = allCollections?.length || 0;
//   const skeletonsNeeded = Math.max(0, minListSize - collectionCount);

//   return (
//     <Box sx={{ justifyContent: 'center', width: '100%' }}>
//       <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
//         <TransitionGroup>
//           {allCollections?.map((collection, index) => (
//             <Collapse key={`${collection?._id}-${index}`}>
//               <CollectionListItem
//                 collection={collection}
//                 openDialog={openDialog}
//               />
//               {skeletonsNeeded > 0 && (
//                 <CollectionListItemSkeleton count={skeletonsNeeded} />
//               )}
//             </Collapse>
//           ))}
//         </TransitionGroup>
//       </List>
//     </Box>
//   );
// };

// SelectCollectionList.propTypes = {
//   openDialog: PropTypes.func.isRequired,
// };

// export default SelectCollectionList;
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Collapse,
  Grid,
  List,
  Skeleton,
} from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import useSelectedCollection from '../../../../context/MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import styled from 'styled-components';
import SimpleCard from '../../../REUSABLE_COMPONENTS/unique/SimpleCard';
import uniqueTheme from '../../../REUSABLE_COMPONENTS/unique/uniqueTheme';
const FlexContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;
const CollectionListItemSkeleton = ({ count }) => {
  return [...Array(count).keys()].map((index) => (
    <Collapse key={`skeleton-${index}`}>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'row' }}>
        <Card sx={{ width: '100%' }}>
          <CardActionArea sx={{ width: '100%' }} disabled={true}>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ flexGrow: 1, mx: 2 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          </CardActionArea>
        </Card>
      </Box>
    </Collapse>
  ));
};

CollectionListItemSkeleton.propTypes = {
  count: PropTypes.number.isRequired,
};

const SelectCollectionList = ({ openDialog }) => {
  const { allCollections } = useSelectedCollection();
  // const [skeletonCount, setSkeletonCount] = useState(0);
  const listRef = useRef();
  const minItems = 5;
  const numRequired = minItems - (allCollections?.length || 0);
  const allSkeletonCollections = [...Array(numRequired).keys()].map((index) => (
    <CollectionListItemSkeleton key={`skeleton-${index}`} count={1} />
  ));
  const combinedCollections = [...allCollections, ...allSkeletonCollections];
  return (
    <SimpleCard
      // ref={listRef}
      theme={uniqueTheme}
      hasTitle={false}
      isPrimary={false}
      noBottomMargin={true}
    >
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {combinedCollections?.map((collection, index) => (
            <Collapse key={`${collection?._id}-${index}`}>
              <CollectionListItem
                collection={collection}
                openDialog={openDialog}
              />
            </Collapse>
          ))}
          {/* <CollectionListItemSkeleton count={skeletonCount} /> */}
        </TransitionGroup>
      </List>
    </SimpleCard>
  );
};

SelectCollectionList.propTypes = {
  openDialog: PropTypes.func.isRequired,
};

export default memo(SelectCollectionList);
