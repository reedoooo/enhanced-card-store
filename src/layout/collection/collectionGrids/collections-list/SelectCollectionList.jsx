// import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
// import { Box, Card, Collapse, Grid, List, Skeleton } from '@mui/material';
// import PropTypes from 'prop-types';
// import { roundToNearestTenth } from '../../../../context/Helpers';
// import { useMode, usePageContext } from '../../../../context';
// import CollectionListItem from './CollectionListItem';
// import { StyledSkeletonCard } from '../../../../pages/pageStyles/StyledComponents';
// import { SelectCollectionListContainer } from '../../../../context/hooks/style-hooks/usePortfolioStyles';
// import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
// import { TransitionGroup } from 'react-transition-group';
// const MemoizedCollectionListItem = memo(CollectionListItem);

// function renderItem({ collection, roundToNearestTenth }) {
//   return (
//     <MemoizedCollectionListItem
//       key={collection?._id}
//       collection={collection}
//       roundToNearestTenth={roundToNearestTenth}
//     />
//   );
// }
// const SelectCollectionList = ({ allCollections, openDialog }) => {
//   const { theme } = useMode();
//   const { loadingStatus } = usePageContext();
//   const listRef = useRef(null);

//   useEffect(() => {
//     if (listRef.current) {
//       let totalHeight = 0;
//       Array.from(listRef.current.children).forEach((child) => {
//         totalHeight += child.offsetHeight;
//       });
//       listRef.current.style.minHeight = `${totalHeight}px`;
//     }
//   }, [allCollections, loadingStatus]); // Depend on allCollections and loadingStatus
//   const renderSkeletons = useCallback(
//     (count) =>
//       Array.from({ length: count }).map((_, index) => (
//         <Box
//           key={index}
//           sx={{
//             padding: theme.spacing(1),
//             width: '100%',
//             justifyContent: 'center',
//           }}
//         >
//           <Card sx={{ marginBottom: theme.spacing(2) }}>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={3}>
//                 <Skeleton
//                   variant="rectangular"
//                   animation="wave"
//                   width={100}
//                   height={50}
//                 />
//               </Grid>
//               <Grid item xs={9}>
//                 <Skeleton variant="text" animation="wave" height={30} />
//                 <Skeleton variant="text" animation="wave" width="80%" />
//               </Grid>
//             </Grid>
//           </Card>
//         </Box>
//       )),
//     [theme]
//   );
//   return (
//     <MDBox sx={{ justifyContent: 'center', width: '100%' }}>
//       <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
//         <TransitionGroup>
//           {allCollections?.map((collection) => (
//             <Collapse key={collection?._id}>
//               {renderItem({ collection, roundToNearestTenth })}
//             </Collapse>
//           ))}
//           {allCollections.length < 5 &&
//             renderSkeletons(5 - allCollections.length)}
//         </TransitionGroup>
//       </List>
//     </MDBox>
//   );
// };

// SelectCollectionList.propTypes = {
//   openDialog: PropTypes.func.isRequired,
//   allCollections: PropTypes.array.isRequired, // Ensure this is passed or obtained from context
// };

// export default SelectCollectionList;
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, Collapse, Grid, List, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import CollectionListItem from './CollectionListItem';
import MDBox from '../../../REUSABLE_COMPONENTS/MDBOX';
import { useMode } from '../../../../context';
import LoadingIndicator from '../../../../components/reusable/indicators/LoadingIndicator';

const MemoizedCollectionListItem = memo(CollectionListItem);

function renderItem({ collection, roundToNearestTenth }) {
  return (
    <MemoizedCollectionListItem
      key={collection?._id}
      collection={collection}
      roundToNearestTenth={roundToNearestTenth}
    />
  );
}
const SelectCollectionList = ({ allCollections, openDialog }) => {
  const { theme } = useMode();
  const [show, setShow] = useState(
    new Array(allCollections.length).fill(false)
  );
  const roundToNearestTenth = (number) => Math.ceil(number / 10) * 10;
  if (!allCollections) return <LoadingIndicator />;
  useEffect(() => {
    allCollections?.forEach((_, index) => {
      setTimeout(() => {
        setShow((show) => {
          const updatedShow = [...show];
          updatedShow[index] = true;
          return updatedShow;
        });
      }, index * 300); // Adjust the delay as needed
    });
  }, [allCollections.length]);

  const renderSkeletons = useCallback(
    (count) =>
      Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            padding: theme.spacing(1),
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Card sx={{ marginBottom: theme.spacing(2) }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={100}
                  height={50}
                />
              </Grid>
              <Grid item xs={9}>
                <Skeleton variant="text" animation="wave" height={30} />
                <Skeleton variant="text" animation="wave" width="80%" />
              </Grid>
            </Grid>
          </Card>
        </Box>
      )),
    [theme]
  );

  return (
    <MDBox sx={{ justifyContent: 'center', width: '100%' }}>
      <List sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto' }}>
        <TransitionGroup>
          {allCollections.map((collection, index) => (
            <Collapse key={collection?._id} in={show[index]}>
              {renderItem({ collection, roundToNearestTenth })}
            </Collapse>
          ))}
          {allCollections.length < 5 &&
            renderSkeletons(5 - allCollections.length)}
        </TransitionGroup>
      </List>
    </MDBox>
  );
};

SelectCollectionList.propTypes = {
  openDialog: PropTypes.func.isRequired,
  allCollections: PropTypes.array.isRequired,
};

export default SelectCollectionList;
