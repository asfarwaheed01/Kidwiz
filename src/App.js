import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { ColorModeContext, useMode } from "./theme";
import { ROUTES } from "./config/routes";

import {
  LoginScreen,
  SignUpScreen,
  ResetPasswordScreen,
  ConfirmationScreen,
  ProtectedRoutes,
  ParentProtectedRoutes,
  AdminProtectedRoutes
} from "./screens/authentication";

import { UnderDevelopmentScreen } from "./screens/common";

import {
  AddChildrenScreen,
  PersonalityTestsScreen,
  BigFivePersonalityTestIntroScreen,
  BigFivePersonalityTestQuestionsScreen,
  BigFivePersonalityTestResultScreen,
  EmotionalIntelligenceTestIntroScreen,
  EmotionalIntelligenceTestQuestionsScreen,
  EmotionalIntelligenceTestResultScreen,
  ConflictResolutionStyleTestIntroScreen,
  ConflictResolutionStyleTestQuestionsScreen,
  ConflictResolutionStyleTestResultScreen,
  ValuesAssessmentTestIntroScreen,
  ValuesAssessmentTestQuestionsScreen,
  ValuesAssessmentTestResultScreen,
} from "./screens/onBoarding";

import {
  DashboardHome,
  PerformanceHome,
  LearnSubjectHome,
  LearnSubjectDetail,
  LearnSubjectChat,
  DailyQuizHome,
  ImproveParentingHome,
  ImproveParentingChat,
  ExploreHome,
  JournalHome,
  SettingsHome,
} from "./screens/parent";

import {
  ReportCardHome,
  LearnSubjectHome as ChildLearnSubjectHome,
  LearnSubjectDetail as ChildLearnSubjectDetail,
  LearnSubjectChat as ChildLearnSubjectChat,
} from "./screens/child";

import {
  AITrainingHome,
  KeywordsAlertHome,
  PromptsHome,
  QuizzesHome,
  RolePlayingHome,
  SubjectsHome,
} from "./screens/admin";

import {
  ParentDashboardLayout,
  ChildDashboardLayout,
  AdminDashboardLayout,
} from "./components";
import DailyQuizResult from "./screens/parent/dailyQuiz/DailyQuizResult";
import VoiceClone from "./screens/onBoarding/voiceCloning/VoiceClone";
import VoiceCloneDone from "./screens/onBoarding/voiceCloning/VoiceCloneDone";
import ConfirmPassword from "./screens/authentication/confirmPassword/ConfirmPassword";

const Redirect = ({ to }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return <></>;
};

const App = () => {
  const [theme, colorMode] = useMode();

  /* PATCH: ADDED THIS TO DISABLE ALL VIEWS EXCEPT DESKTOP */
  const [isTablet, setIsTablet] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  /* PATCH: ADDED THIS TO DISABLE ALL VIEWS EXCEPT DESKTOP */
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsTablet(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* PATCH: ADDED THIS TO DISABLE ALL VIEWS EXCEPT DESKTOP */
  if ((isMobile || isTablet) && process.env.REACT_APP_DEV_MODE === "0") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isMobile ? (
          <h3>Mobile Version Not Available!</h3>
        ) : (
          <h3>Tablet Version Not Available!</h3>
        )}
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path={ROUTES.AUTHENTICATION.LOGIN} element={<LoginScreen />} />
          <Route
            path={ROUTES.AUTHENTICATION.SIGN_UP}
            element={<SignUpScreen />}
          />
          <Route
            path={ROUTES.AUTHENTICATION.RESET_PASSWORD}
            element={<ResetPasswordScreen />}
          />
          <Route
            path={ROUTES.AUTHENTICATION.CONFIRM_PASSWORD}
            element={<ConfirmPassword/>}
          />

          <Route
            path="/"
            element={<Redirect to={ROUTES.AUTHENTICATION.LOGIN} />}
          />
          <Route
            path={ROUTES.AUTHENTICATION.CONFIRMATION}
            element={
              <ProtectedRoutes>
                <ConfirmationScreen />
              </ProtectedRoutes>
            }
          />

          <Route
            path={ROUTES.ON_BOARDING.ADD_CHILDREN}
            element={
              <ProtectedRoutes>
               <AddChildrenScreen />
            </ProtectedRoutes>
            }
          />
          <Route
            path={ROUTES.ON_BOARDING.PERSONALITY_TESTS}
            element={<PersonalityTestsScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.BIG_FIVE_PERSONALITY.INTRO}
            element={<BigFivePersonalityTestIntroScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.BIG_FIVE_PERSONALITY.QUESTIONS}
            element={<BigFivePersonalityTestQuestionsScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.BIG_FIVE_PERSONALITY.RESULT}
            element={<BigFivePersonalityTestResultScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.EMOTIONAL_INTELLIGENCE.INTRO}
            element={<EmotionalIntelligenceTestIntroScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.EMOTIONAL_INTELLIGENCE.QUESTIONS}
            element={<EmotionalIntelligenceTestQuestionsScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.EMOTIONAL_INTELLIGENCE.RESULT}
            element={<EmotionalIntelligenceTestResultScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.CONFLICT_RESOLUTION_STYLE.INTRO}
            element={<ConflictResolutionStyleTestIntroScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.CONFLICT_RESOLUTION_STYLE.QUESTIONS}
            element={<ConflictResolutionStyleTestQuestionsScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.CONFLICT_RESOLUTION_STYLE.RESULT}
            element={<ConflictResolutionStyleTestResultScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.VALUES_ASSESSMENT.INTRO}
            element={<ValuesAssessmentTestIntroScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.VALUES_ASSESSMENT.QUESTIONS}
            element={<ValuesAssessmentTestQuestionsScreen />}
          />
          <Route
            path={ROUTES.ON_BOARDING.VALUES_ASSESSMENT.RESULT}
            element={<ValuesAssessmentTestResultScreen />}
          />

          <Route
            path={ROUTES.ON_BOARDING.VOICE_CLONE.VOICE}
            element={<VoiceClone/>}
          />

          <Route
            path={ROUTES.ON_BOARDING.VOICE_CLONE.CLONING_DONE}
            element={<VoiceCloneDone/>}
          />

          <Route
            path={ROUTES.PARENT.DASHBOARD.INDEX}
            element={
              <ProtectedRoutes>
                <ParentProtectedRoutes>
                  <ParentDashboardLayout />
                </ParentProtectedRoutes>
              </ProtectedRoutes>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route
              path={ROUTES.PARENT.PERFORMANCE.INDEX}
              element={<PerformanceHome />}
            />
            <Route
              path={ROUTES.PARENT.LEARN_SUBJECT.INDEX}
              element={<LearnSubjectHome />}
            />
            <Route
              path={ROUTES.PARENT.LEARN_SUBJECT.DETAIL}
              element={<LearnSubjectDetail />}
            />
            <Route
              path={ROUTES.PARENT.LEARN_SUBJECT.CHAT}
              element={<LearnSubjectChat />}
            />
            <Route
              
              path={ROUTES.PARENT.DAILY_QUIZ.INDEX}
              element={<DailyQuizHome />}
            />
            <Route
              
              path={ROUTES.PARENT.DAILY_QUIZ.RESULT}
              element={<DailyQuizResult />}
            />
            <Route
              path={ROUTES.PARENT.IMPROVE_PARENTING.INDEX}
              element={<ImproveParentingHome />}
            />
            <Route
            path={ROUTES.PARENT.IMPROVE_PARENTING.CHAT}
            element={<ImproveParentingChat/>}/>
            <Route
              
              path={ROUTES.PARENT.EXPLORE.INDEX}
              element={<ExploreHome />}
            />
            <Route
              
              path={ROUTES.PARENT.JOURNAL.INDEX}
              element={<JournalHome />}
            />
            <Route
              path={ROUTES.PARENT.SETTINGS.INDEX}
              element={<SettingsHome />}
            />

            <Route path="*" element={<UnderDevelopmentScreen />} />
          </Route>

          <Route
            path={ROUTES.CHILD.DASHBOARD.INDEX}
            element={<ChildDashboardLayout />}
          >
            <Route
              index
              element={<Redirect to={ROUTES.CHILD.REPORT_CARD.INDEX} />}
            />
            <Route
              index
              path={ROUTES.CHILD.REPORT_CARD.INDEX}
              element={<ReportCardHome />}
            />
            <Route
              index
              path={ROUTES.CHILD.LEARN_SUBJECT.INDEX}
              element={<ChildLearnSubjectHome />}
            />
            <Route
              index
              path={ROUTES.CHILD.LEARN_SUBJECT.DETAIL}
              element={<ChildLearnSubjectDetail />}
            />
            <Route
              index
              path={ROUTES.CHILD.LEARN_SUBJECT.CHAT}
              element={<ChildLearnSubjectChat />}
            />
            <Route
              index
              path={ROUTES.CHILD.DAILY_QUIZ.INDEX}
              element={<DailyQuizHome />}
            />
            <Route
              index
              path={ROUTES.CHILD.EXPLORE.INDEX}
              element={<ExploreHome />}
            />

            <Route path="*" element={<UnderDevelopmentScreen />} />
          </Route>

          <Route
            path={ROUTES.ADMIN.DASHBOARD.INDEX}
            element={
              <ProtectedRoutes>
                <AdminProtectedRoutes>
                  <AdminDashboardLayout />
                </AdminProtectedRoutes>
              </ProtectedRoutes>
          }
          >
            <Route
              index
              element={<Redirect to={ROUTES.ADMIN.PROMPTS.INDEX} />}
            />
            <Route
              index
              path={ROUTES.ADMIN.PROMPTS.INDEX}
              element={<PromptsHome />}
            />
            <Route
              index
              path={ROUTES.ADMIN.QUIZZES.INDEX}
              element={<QuizzesHome />}
            />
            <Route
              index
              path={ROUTES.ADMIN.SUBJECTS.INDEX}
              element={<SubjectsHome />}
            />
            <Route
              index
              path={ROUTES.ADMIN.ROLE_PLAYING.INDEX}
              element={<RolePlayingHome />}
            />
            <Route
              index
              path={ROUTES.ADMIN.AI_TRAINING.INDEX}
              element={<AITrainingHome />}
            />
            <Route
              index
              path={ROUTES.ADMIN.KEYWORDS_ALERT.INDEX}
              element={<KeywordsAlertHome />}
            />

            <Route path="*" element={<UnderDevelopmentScreen />} />
          </Route>

          <Route path="*" element={<UnderDevelopmentScreen />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
