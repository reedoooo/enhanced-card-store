import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlined from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
  FaDragon,
  FaLevelUpAlt,
  FaRegLightbulb,
  FaShieldAlt,
  FaVenusMars,
} from 'react-icons/fa';
import AdjustSharpIcon from '@mui/icons-material/AdjustSharp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CollectionsIcon from '@mui/icons-material/Collections';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';

const iconData = [
  {
    id: 1,
    icon: <AdjustSharpIcon className="icon" />,
    component: 'ReusableLoadingButton',
  },
  {
    id: 2,
    icon: <AddCircleOutlineOutlined className="icon" />,
    component: 'AddCircleOutlineOutlined',
  },
  {
    id: 3,
    icon: <RemoveCircleOutlineOutlined className="icon" />,
    component: 'RemoveCircleOutlineOutlined',
  },
  {
    id: 4,
    icon: <CheckCircleOutlineOutlinedIcon className="icon" />,
    component: 'CheckCircleOutlineOutlinedIcon',
  },
  {
    id: 5,
    icon: <FaDragon className="icon" />,
    component: 'FaDragon',
  },
  {
    id: 6,
    icon: <FaLevelUpAlt className="icon" />,
    component: 'FaLevelUpAlt',
  },
  {
    id: 7,
    icon: <FaRegLightbulb className="icon" />,
    component: 'FaRegLightbulb',
  },
  {
    id: 8,
    icon: <FaShieldAlt className="icon" />,
    component: 'FaShieldAlt',
  },
  {
    id: 9,
    icon: <FaVenusMars className="icon" />,
    component: 'FaVenusMars',
  },
  {
    id: 10,
    icon: <LockOutlinedIcon className="icon" />,
    component: 'LockOutlinedIcon',
  },
  {
    id: 11,
    icon: <FaGithub className="icon" />,
    component: 'FaGithub',
  },
  {
    id: 12,
    icon: <FaExternalLinkAlt className="icon" />,
    component: 'FaExternalLinkAlt',
  },
  {
    id: 13,
    icon: <CloseIcon className="icon" />,
    component: 'CloseIcon',
  },
  {
    id: 14,
    icon: <LoginIcon className="icon" />,
    component: 'LoginIcon',
  },
  {
    id: 15,
    icon: <PersonAddIcon className="icon" />,
    component: 'PersonAddIcon',
  },
  {
    id: 16,
    icon: <AddIcon className="icon" />,
    component: 'AddIcon',
  },
  {
    id: 17,
    icon: <SettingsIcon className="icon" />,
    component: 'SettingsIcon',
  },
  {
    id: 18,
    icon: <SaveIcon className="icon" />,
    component: 'SaveIcon',
  },
  {
    id: 19,
    icon: <LockIcon className="icon" />,
    component: 'LockIcon',
  },
  {
    id: 20,
    icon: <SearchIcon className="icon" />,
    component: 'SearchIcon',
  },
  {
    id: 21,
    icon: <DeleteIcon className="icon" />,
    component: 'DeleteIcon',
  },
  {
    id: 22,
    icon: <MonetizationOnIcon className="icon" />,
    component: 'MonetizationOnIcon',
  },
  {
    id: 23,
    icon: <StackedLineChartRoundedIcon className="icon" />,
    component: 'StackedLineChartRoundedIcon',
  },
  {
    id: 24,
    icon: <FormatListNumberedRoundedIcon className="icon" />,
    component: 'FormatListNumberedRoundedIcon',
  },
  {
    id: 25,
    icon: <TrendingUpIcon className="icon" />,
    component: 'TrendingUpIcon',
  },
  {
    id: 26,
    icon: <ArrowBackIcon className="icon" />,
    component: 'ArrowBackIcon',
  },
  {
    id: 27,
    icon: <CollectionsIcon className="icon" />,
    component: 'CollectionsIcon',
  },
  {
    id: 28,
    icon: <KeyboardArrowLeft className="icon" />,
    component: 'KeyboardArrowLeft',
  },
  {
    id: 29,
    icon: <KeyboardArrowRight className="icon" />,
    component: 'KeyboardArrowRight',
  },
  {
    id: 30,
    icon: <AppsIcon className="icon" />,
    component: 'AppsIcon',
  },
  {
    id: 31,
    icon: <MoreVertIcon className="icon" />,
    component: 'MoreVertIcon',
  },
  {
    id: 32,
    icon: <ListItemIcon className="icon" />,
    component: 'ListItemIcon',
  },
  {
    id: 33,
    icon: <EditIcon className="icon" />,
    component: 'EditIcon',
  },
  {
    id: 34,
    icon: <VisibilityIcon className="icon" />,
    component: 'VisibilityIcon',
  },
  {
    id: 35,
    icon: <BarChartIcon className="icon" />,
    component: 'BarChartIcon',
  },
];

const getIconDataByComponent = (component) => {
  const match = iconData.find((i) => i.component === component);
  const returnIcon = match ? match.icon : null;
  return returnIcon;
};

export default { iconData, getIconDataByComponent };
