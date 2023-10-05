import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Container,
  Snackbar,
  styled,
  TextField,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import placeholder from '../assets/placeholder.jpeg';
import UserStats from '../components/other/UserStats';
import { useUserContext } from '../context/UserContext/UserContext';
import { useCookies } from 'react-cookie';
import ThemeToggleButton from '../components/buttons/ThemeToggleButton';
import { useCombinedContext } from '../context/CombinedProvider';
import { useCollectionStore } from '../context/hooks/collection';

const AvatarStyled = styled(Avatar)({
  width: 60,
  height: 60,
  marginBottom: 15,
});

const TypographyStyled = styled(Typography)({
  marginBottom: 15,
});

const IconButtonStyled = styled(IconButton)({
  marginBottom: 20,
});

const DataBoxStyled = styled(Box)({
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  width: '100%',
});

const ButtonStyled = styled(Button)({
  margin: '15px 0',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#3f51b5',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const DataTextStyled = styled(Typography)({
  margin: '5px 0',
  fontSize: '0.9rem',
});

function convertCardToChartData(cardData, userId) {
  const currentDate = new Date();

  // Extracting values from the card data
  const cardName = cardData.name;
  const cardPrice = cardData.card_prices[0]?.tcgplayer_price || 0; // Assuming tcgplayer_price is the main price point
  const totalQuantity = cardData.quantity;
  const totalPrice = cardPrice * totalQuantity;

  // Constructing the data point
  const dataPoint = {
    cardName: cardName,
    x: currentDate, // Current date for the data point
    y: cardPrice, // Single card price
    totalQuantity: totalQuantity,
    totalPrice: totalPrice, // Total price for this card
    // _id: new mongoose.Types.ObjectId(), // New MongoDB Object ID for the data point
  };

  // Constructing the dataset (assuming you might have more datasets in future)
  const dataset = {
    label: cardName, // Using card name as label for the dataset
    totalquantity: totalQuantity,
    data: {
      points: [dataPoint], // Initial single data point for the card
    },
    // You can also define other properties like backgroundColor, borderColor etc.
  };

  // Constructing the entire chart data
  const chartData = {
    // _id: new mongoose.Types.ObjectId(), // New MongoDB Object ID for the chart data
    name: cardName, // Using card name as chart name
    userId: userId,
    datasets: [dataset], // Initial single dataset for the chart data
    // You can also define other properties like collectionId, chartId etc.
  };

  return chartData;
}

const ProfileForm = ({ userName, name, age, status, onSave }) => {
  const [formData, setFormData] = useState({
    userName: userName || '', // default to empty string if undefined
    name: name || '',
    age: age || '',
    status: status || '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
    setFormData({
      userName: userName || '',
      name: name || '',
      age: age || '',
      status: status || '',
    });
  }, [userName, name, age, status]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="userName"
        value={formData?.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        id="name"
        value={formData?.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        id="age"
        value={formData?.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        id="status"
        value={formData?.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add more TextField components as needed */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
    </form>
  );
};

ProfileForm.propTypes = {
  userName: PropTypes.string,
  name: PropTypes.string,
  age: PropTypes.string,
  status: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

const ProfilePage = () => {
  const { selectedCollection } = useCollectionStore();
  const { user, updateUser } = useUserContext();
  const [cookies] = useCookies(['userCookie']);
  const {
    handleSend,
    handleRequestData,
    handleRequestChartData,
    handleSendData,
    handleSendChart,
    handleCronRequest,
    chartDataToSend,
  } = useCombinedContext();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveChanges = useCallback(
    (data) => {
      updateUser(data);
      setOpenSnackbar(true);
    },
    [updateUser]
  );

  const handleSendMessage = () => {
    handleSend('Hello, Server!');
  };

  const handleRequestCollectionData = () => {
    const userIdString = user?.userID?.toString();
    if (userIdString) handleRequestData(userIdString);
  };

  const handleRequestChartDataFunction = () => {
    const userIdString = user?.userID?.toString();
    if (!userIdString) return;
    const { datasets, name } = chartDataToSend || {};
    handleRequestChartData(userIdString, datasets, name);
  };

  const handleTriggerCronJob = () => {
    handleCronRequest(user?.userID);
  };

  const handleSendCollectionData = () => {
    const userIdString = user?.userID?.toString();
    if (userIdString) {
      handleSendData(userIdString, selectedCollection?._id, {
        data: selectedCollection?.cards,
      });
    }
  };
  const handleSendChartData = () => {
    const userId = user?.userID;
    const collectionId = selectedCollection?._id;
    const rawDatasets = selectedCollection?.cards || [];
    const name = selectedCollection?.name || '';
    const chartId = selectedCollection?._id || '';

    // Convert raw data to chart data
    const datasets = rawDatasets.map((card) =>
      convertCardToChartData(card, userId)
    );

    // Logging to check values
    console.log('handleSendChartData -> userId:', userId);
    console.log('handleSendChartData -> chartId:', chartId);
    console.log('handleSendChartData -> datasets:', datasets);
    console.log('handleSendChartData -> name:', name);

    // Uncomment below to hardcode values for testing
    // userId = "your-hardcoded-value";
    // chartId = "your-hardcoded-value";
    // datasets = [{...}]; // hardcode datasets structure
    // name = "your-hardcoded-value";

    if (!userId) console.error('userId is missing');
    if (!chartId) console.error('chartId is missing');
    if (!datasets || datasets.length === 0)
      console.error('datasets is missing or empty');
    if (!name) console.error('name is missing');

    const chartDataToSend = {
      userId,
      datasets: datasets || [],
      name,
      chartId,
    };

    // Now, use the handleSendChart function from the combined context to send the chart data
    handleSendChart(chartDataToSend);
  };
  // const chartData = {};

  return (
    <Container maxWidth="sm">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <AvatarStyled src={placeholder} alt="User Avatar" />
        <TypographyStyled variant="h4" gutterBottom>
          Profile
        </TypographyStyled>
        <IconButtonStyled>
          <EditIcon />
        </IconButtonStyled>
        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send Message to Server
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleRequestCollectionData}
        >
          Request Collection Data
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleRequestChartDataFunction}
        >
          Request Chart Data
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendChartData} // directly calling the function without needing to pass chartData
        >
          Request Chart Data Update
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleTriggerCronJob}
        >
          Trigger Cron Job
        </ButtonStyled>

        <ButtonStyled
          variant="contained"
          color="primary"
          onClick={handleSendCollectionData}
        >
          Send Collection Data
        </ButtonStyled>
        {chartDataToSend?.datasets?.map((dataset) =>
          dataset.data?.points?.map((data) => (
            <DataBoxStyled key={data.cardId || data._id}>
              {data?.x && (
                <>
                  <DataTextStyled variant="body2">
                    Date: {new Date(data.x).toLocaleDateString()}
                  </DataTextStyled>
                  <DataTextStyled variant="body2">
                    Time: {new Date(data.x).toLocaleTimeString()}
                  </DataTextStyled>
                </>
              )}
              <DataTextStyled variant="body2">Value: {data?.y}</DataTextStyled>
            </DataBoxStyled>
          ))
        )}
      </Box>
      <Box mt={3}>
        <ProfileForm
          {...user}
          userName={cookies.userCookie?.username}
          onSave={handleSaveChanges}
        />
      </Box>
      <UserStats />
      <ThemeToggleButton />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Profile updated successfully"
      />
    </Container>
  );
};

export default ProfilePage;
