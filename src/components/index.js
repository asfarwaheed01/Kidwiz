/* eslint-disable import/first */
/*** MISC COMPONENTS *************************************************************************************/
import CustomTextInput, { CustomLabel } from './misc/CustomTextInput';
import CustomSearchInput from './misc/CustomSearchInput';
import CustomButton from './misc/CustomButton';
import CustomDropDown from './misc/CustomDropDown';
import CustomBreadcrumbs from './misc/CustomBreadcrumbs';
import CustomModal from './misc/CustomModal';
import CustomFileUploader from './misc/CustomFileUploader';
import CustomTabs from './misc/CustomTabs';
import CustomCheckBox from './misc/CustomCheckBox';
import CustomToggleSwitch from './misc/CustomToggleSwitch';

export {
  CustomTextInput,
  CustomLabel,
  CustomSearchInput,
  CustomButton,
  CustomDropDown,
  CustomBreadcrumbs,
  CustomModal,
  CustomFileUploader,
  CustomTabs,
  CustomCheckBox,
  CustomToggleSwitch,
};

/*** AUTHENTICATION COMPONENTS ***************************************************************************/
import AuthenticationFormBackground from './authentication/AuthenticationFormBackground';

export { AuthenticationFormBackground };

/*** LAYOUT COMPONENTS ***********************************************************************************/
import MainContainer from './layout/MainContainer';
import DashboardContainer from './layout/DashboardContainer';
import ParentDashboardLayout from './layout/ParentDashboardLayout';
import ChildDashboardLayout from './layout/ChildDashboardLayout';
import AdminDashboardLayout from './layout/AdminDashboardLayout';
import NotificationsTopBar from './layout/topBar/NotificationsTopBar';
import ChatWithSupportTopBar from './layout/topBar/ChatWithSupportTopBar';

export {
  MainContainer,
  DashboardContainer,
  ParentDashboardLayout,
  ChildDashboardLayout,
  AdminDashboardLayout,
  NotificationsTopBar,
  ChatWithSupportTopBar,
};

import SelectChildAndDatePanel from './parentDashboard/SelectChildAndDatePanel';
import SelectedChildWithTimeDetails from './parentDashboard/SelectedChildWithTimeDetails';

export { SelectChildAndDatePanel, SelectedChildWithTimeDetails}

/*** LEARN COMPONENTS ************************************************************************************/
import QuestionProgressBar from './learn/QuestionProgressBar';
import LikertScale from './learn/LikertScale';
import VerticalFiller from './learn/VerticalFiller';
import CustomSubjectFoucsSlider from './learn/CustomSubjectFoucsSlider';

export {
  QuestionProgressBar,
  LikertScale,
  VerticalFiller,
  CustomSubjectFoucsSlider,
};

/*** WHEEL OF FORTUNE ************************************************************************************/
import Spinner from './wheelOfFortune/spinner';
import SPINNER_POINTS from './wheelOfFortune/points';

export { Spinner, SPINNER_POINTS };


// CHAT COMPONENTS
import TypingDots from './chat/TypingDots';
import Message from './chat/Message';

export { TypingDots, Message}