import React from 'react';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import TimelineItem from 'examples/Timeline/TimelineItem';

function CollectionGoalsTimeLine({ color, icon, title, dateTime, completed }) {
  return (
    <TimelineItem
      color={color}
      icon={icon}
      title={`${title} - ${completed ? 'Completed' : 'Not Completed'}`}
      dateTime={dateTime}
    />
  );
}

function GoalsOverview() {
  const goals = [
    { title: '$2,000 Goal', dateTime: '1 Jan', completed: true },
    { title: '$4,000 Goal', dateTime: '15 Feb', completed: true },
    { title: '$6,000 Goal', dateTime: '10 Mar', completed: true },
    { title: '$8,000 Goal', dateTime: '5 Apr', completed: false },
    { title: '$9,000 Goal', dateTime: '30 Apr', completed: false },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Collection Goals Overview
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {goals.map((goal, index) => (
          <CollectionGoalsTimeLine
            key={index}
            color={goal.completed ? 'success' : 'error'}
            icon={goal.completed ? 'check_circle' : 'pending'}
            title={goal.title}
            dateTime={`${goal.dateTime} ${goal.completed ? '' : '- Pending'}`}
            completed={goal.completed}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default GoalsOverview;
