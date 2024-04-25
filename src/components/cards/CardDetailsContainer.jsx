import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  Container,
  Collapse,
} from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import { GiAxeSword } from 'react-icons/gi';
import { useMode } from '../../context';
import styled from 'styled-components';
import MDBox from '../../layout/REUSABLE_COMPONENTS/MDBOX';
import MDTypography from '../../layout/REUSABLE_COMPONENTS/MDTYPOGRAPHY/MDTypography';
import { CardWrapper } from '../../layout/REUSABLE_STYLED_COMPONENTS/SpecificStyledComponents';
const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
  color: theme.palette.text.primary,
}));
const iconDetails = [
  { icon: FaLevelUpAlt, title: 'Level' },
  { icon: FaVenusMars, title: 'Type' },
  { icon: FaDragon, title: 'Race' },
  { icon: FaRegLightbulb, title: 'Attribute' },
  { icon: GiAxeSword, title: 'ATK' },
  { icon: FaShieldAlt, title: 'DEF' },
];
const textDetails = [
  { title: 'Description', key: 'desc' },
  { title: 'Price', key: 'price' },
  {
    title: 'Rarity',
    key: 'rarities',
    isMultiValue: true,
    action: 'onRarityClick',
  },
  {
    title: 'Card Sets',
    key: 'card_sets',
    isMultiValue: true,
    action: 'onRarityClick',
  },
  {
    title: 'Type',
    key: 'type',
    isMultiValue: false,
  },
  {
    title: 'Race',
    key: 'race',
    isMultiValue: false,
  },
  {
    title: 'Attribute',
    key: 'attribute',
    isMultiValue: false,
  },
  {
    title: 'ATK',
    key: 'atk',
    isMultiValue: false,
  },
  {
    title: 'DEF',
    key: 'def',
    isMultiValue: false,
  },
  {
    title: 'Level',
    key: 'level',
    isMultiValue: false,
  },
];
const CardDetailChip = styled(Chip)(({ theme }) => ({
  borderWidth: '2px',
  fontWeight: 700,
  margin: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(12), // Smaller font size on small devices
  },
}));
const CardDetailDescription = ({ value }) => (
  <MDTypography variant="body1" sx={{ color: 'text.secondary' }}>
    {value}
  </MDTypography>
);
const CardDetailPrice = ({ value }) => (
  <MDTypography variant="body1" sx={{ color: 'text.secondary' }}>
    {value}
  </MDTypography>
);
const CardDetailRarity = ({ values, onRarityClick }) => {
  const { theme } = useMode();

  return values?.map((rarity, index) => {
    <CardDetailChip
      key={index}
      theme={theme}
      // label={`${rarity.name}: ${rarity.value}`}
      label={`${rarity.value}`}
      onClick={() => onRarityClick(rarity.name)}
      sx={{
        borderWidth: '2px',
        fontWeight: 700,
        margin: '5px',
      }}
      variant="outlined"
    />;
  });
};
const CardDetailSet = ({ values }) => {
  const { theme } = useMode();

  return values?.map((set, index) => (
    <CardDetailChip
      key={index}
      theme={theme}
      label={`${set.value}`}
      onClick={() => console.log(set.toString())}
      sx={{
        borderWidth: '2px',
        fontWeight: 700,
        margin: '5px',
      }}
      variant="outlined"
    />
  ));
};
const CardDetailIcon = ({ icon }) => <IconWrapper>{icon}</IconWrapper>;
const RenderDetailsSection = ({ details, card, className, handleAction }) => {
  const { theme } = useMode();
  const [openStates, setOpenStates] = useState(details.map(() => false));

  const toggleOpen = (index) => {
    // Update the state of only the clicked card
    setOpenStates((currentStates) =>
      currentStates.map((state, i) => (i === index ? !state : state))
    );
  };
  const raritiesArray = Object.entries(card?.rarities || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const cardSetsArray = Object.entries(card?.sets || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
      {details?.map((detail, index) => (
        <Grid item xs={12} sm={12} md={4} lg={6} key={index}>
          <CardWrapper
            border={false}
            content={false}
            theme={theme}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  onClick={() => toggleOpen(index)} // Click event to toggle the collapse of specific card
                  sx={{ cursor: 'pointer' }} // Change cursor to indicate clickable
                >
                  {detail.title}
                </Typography>
              }
            />
            {/* <Divider /> */}
            <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
              <Divider />
              <CardContent>
                {detail.key === 'desc' && (
                  <CardDetailDescription value={card?.desc} />
                )}
                {detail.key === 'price' && (
                  <CardDetailPrice value={card?.price} />
                )}
                {detail.key === 'rarities' && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <CardDetailRarity
                      values={raritiesArray}
                      onRarityClick={handleAction}
                    />
                  </Stack>
                )}
                {detail.key === 'card_sets' && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <CardDetailSet values={cardSetsArray} />
                  </Stack>
                )}
                {/* {detail.icon && (
                <CardDetailIcon
                  icon={
                    iconDetails.forEach(
                      (iconDetail) => iconDetail.key === detail.key
                    )?.icon
                  }
                />
              )} */}
                {/* </MDBox> */}
              </CardContent>
            </Collapse>
          </CardWrapper>
        </Grid>
      ))}
    </Grid>
  );
};
const CardDetailsContainer = ({
  card,
  className,
  isTextSection,
  isInventorySection,
  titles,
}) => {
  const { theme } = useMode();
  const handleAction = () => console.log('Action clicked');
  return (
    <Grid
      container
      // spacing={2}
      sx={{
        // background: theme.palette.chartTheme.greenAccent.light,
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
        maxWidth: '100%',
      }}
    >
      {/* {isInventorySection && <RenderInventoryList />} */}
      {className === 'card-details-container-swiper' && (
        <RenderDetailsSection
          details={textDetails}
          card={card}
          className={className}
          handleAction={handleAction}
        />
      )}
    </Grid>
  );
};

export default CardDetailsContainer;
