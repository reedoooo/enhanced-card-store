import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import { GiAxeSword } from 'react-icons/gi';
import CardDetail from './CardDetail';
import { useMode } from '../../context';
import styled from 'styled-components';

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
  { title: 'Description' },
  { title: 'Price' },
  { title: 'Rarity', isMultiValue: true, action: 'onRarityClick' },
  { title: 'Card Sets', isMultiValue: true, action: 'onRarityClick' },
];

const inventoryDetails = [
  { title: 'Deck', key: 'deck' },
  { title: 'Collection', key: 'collection' },
  { title: 'Cart', key: 'cart' },
];
// Consolidating the rendering of both icon and text details into a single component.
const RenderDetailsSection = ({ details, card, className, handleAction }) => {
  const { theme } = useMode();

  return details.map((detail, index) => (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
      <CardDetail
        theme={theme}
        className={className}
        icon={
          detail.icon ? (
            <IconWrapper theme={theme}>
              <detail.icon aria-label={detail.title} />
            </IconWrapper>
          ) : null
        }
        title={detail.title}
        value={
          detail.isMultiValue
            ? card?.card_sets?.map((set) => set[detail.title.toLowerCase()])
            : card?.[detail.title.toLowerCase()]
        }
        quantity={card?.quantity}
        {...(detail.action ? { [detail.action]: handleAction } : {})}
      />
    </Grid>
  ));
};

const RenderInventoryList = () => (
  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={'inventory-list'}>
    <Stack>
      <Card>
        {/* Render the header separately */}
        <CardHeader
          title={
            <Typography variant="h6">{inventoryDetails[0].title}</Typography>
          }
        />
        <CardContent>
          <List>
            {/* Skip the header in mapping */}
            {inventoryDetails.slice(1).map((detail, index) => (
              <ListItem key={index}>{detail.title}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  </Grid>
);
const CardDetailsContainer = ({
  card,
  className,
  isIconSection,
  isTextSection,
  isInventorySection,
  titles,
}) => {
  const { theme } = useMode();
  const handleAction = () => console.log('Action clicked');

  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: theme.palette.chartTheme.greenAccent.light,
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {isIconSection && (
        <RenderDetailsSection
          details={iconDetails}
          card={card}
          className={className}
        />
      )}
      {isTextSection && (
        <RenderDetailsSection
          details={textDetails}
          card={card}
          className={className}
          handleAction={handleAction}
        />
      )}
      {isInventorySection && <RenderInventoryList />}
    </Grid>
  );
};

export default CardDetailsContainer;
