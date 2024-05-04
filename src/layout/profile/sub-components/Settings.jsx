import { useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import MDBox from 'layout/REUSABLE_COMPONENTS/MDBOX';
import RCTypography from 'layout/REUSABLE_COMPONENTS/RCTYPOGRAPHY';
import { useMode } from 'context';

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const { theme } = useMode();
  return (
    <Card sx={{ boxShadow: 'none' }}>
      <MDBox p={2}>
        <RCTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          platform settings
        </RCTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <RCTypography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          account
        </RCTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={followsMe}
              onChange={() => setFollowsMe(!followsMe)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              Email me when someone follows me
            </RCTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={answersPost}
              onChange={() => setAnswersPost(!answersPost)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              Email me when someone answers on my post
            </RCTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={mentionsMe}
              onChange={() => setMentionsMe(!mentionsMe)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </RCTypography>
          </MDBox>
        </MDBox>
        <MDBox mt={3}>
          <RCTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            application
          </RCTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={newLaunches}
              onChange={() => setNewLaunches(!newLaunches)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              New launches and projects
            </RCTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={productUpdate}
              onChange={() => setProductUpdate(!productUpdate)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              Monthly product updates
            </RCTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
              theme={theme}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <RCTypography variant="button" fontWeight="regular" color="text">
              Subscribe to newsletter
            </RCTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
