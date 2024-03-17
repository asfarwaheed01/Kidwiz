import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Typography, alpha, useTheme } from "@mui/material";
import { Pie } from "@nivo/pie";



import { DashboardContainer } from "../../../components";
import QuestionWithResult from "../../../icons/misc/QuestionWithResult";

import { tokens } from "../../../theme";
import { $ } from "../../../utils";

const DailyQuizResult = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state.questions);
  console.log(state.answers);
  console.log(state.subjectAndQuiz);

  const [result, setResult] = useState(checkGrade(state.questions, state.answers));
    // check grade

    
    


  return (
    <DashboardContainer
      wrapperStyle={{
        paddingLeft: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        pr: {
          xs: $({ size: 20 }),
          md: $({ size: 48 }),
        },
        overflow: "scroll",
      }}
    //   containerStyle={{
    //     gap: {
    //       xs: $({ size: 20 }),
    //       md: $({ size: 24 }),
    //     },
    //   }}
      >
        <Box sx={{ width: "100%" }}>
            <Typography
            sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: "600",
                lineHeight: $({ size: 40 }),
                color: colors.extra.grey1,
                display: "inline",
            }}
            >
            Daily Quiz:
            </Typography>
            <Typography
            sx={{
                fontSize: $({ size: 31.98 }),
                fontWeight: "600",
                lineHeight: $({ size: 40 }),
                color: colors.greenAccent[500],
                display: "inline",
            }}
            >
            {state.subjectAndQuiz.subject}
            </Typography>
        </Box>
        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            //   gap: {
            //     xs: $({ size: 20 }),
            //     md: $({ size: 24 }),
            //   },
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            }}>
            <Box>
            <Pie
                data={[
                {
                    id: "1",
                    label: "corrent",
                    value: result.percentage,
                    color: colors.greenAccent[500],
                },
                {
                    id: "2",
                    label: "notcorrent",
                    value: 100 - result.percentage,
                    color: alpha(colors.extra.grey1, 0.15),
                },
                ]}
                innerRadius={0.70}
                padAngle={0}
                legends={[]}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                isInteractive={false}
                width={$({ size: 200, numeric: true })}
                height={$({ size: 200, numeric: true })}
                animate={false}
                fit={true}
                colors={(d) => d.data.color}
                sortByValue={true}
            />
            </Box>
            <Box sx={{ position: "relative", top: "0%", left: "-12%", display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <Typography
                sx={{
                fontWeight: "700",
                fontSize: $({ size: 42 }),
                color: colors.extra.grey1,

                // transform: 'translate(-50%, -50%)',
                }}
            >
                { result.grade }
            </Typography>
            <Typography
                sx={{
                fontWeight: "400",
                fontSize: $({ size: 16 }),
                color: colors.extra.grey1,

                // transform: 'translate(-50%, -50%)',
                }}
            >
                {`${result.percentage}%`}
            </Typography>
            </Box>
        </Box>
        {/* <Box sx={{width:'100%', alignItems:'center', justifyContent:'center'}}> */}
            <Typography
                sx={{
                    width:'100%',
                    textAlign:'center',
                    fontWeight: "600",
                    fontSize: $({ size: 25 }),
                    color: colors.extra.grey1,
                    marginTop: '-35px',
                    marginBottom: '0px',
                    marginLeft: '-20px',
                // transform: 'translate(-50%, -50%)',
                }}
                >
                Well done!
            </Typography>
        {/* </Box> */}

        <Typography
            sx={{
            fontWeight: "500",
            fontSize: $({ size: 20 }),
            color: colors.extra.grey1,
            }}
            >
            Your Answers
        </Typography>

            {state.questions.map((item, index)=>{
                console.log(item);
                return(
                <QuestionWithResult 
                    question = { item.question }
                    correctAnswer = { item.answer } 
                    wrongAnswer = {item.options[state.answers[index]-1] === item.answer ? '' : item.options[state.answers[index]-1]}
                    />
                );
            })}
            {/* <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/>
            <QuestionWithResult/> */}
        
        
    </DashboardContainer>
  );
};

const checkGrade = (questions, answers) => {
    let obtainedNumbers = 0;
    let percentage = 0;
    let grade = 'F';
    for (let index = 0; index < questions.length; index++) {
        const element = questions[index];
        console.log(element.options[answers[index]-1] + " -- " + element.answer);
        if (element.options[answers[index]-1] === element.answer) {
            obtainedNumbers += 10;
        }
    }

    percentage = (obtainedNumbers / 100) * 100;

    if (percentage >= 90) {
        grade = 'A+';
    }else if (percentage >= 80) {
        grade = 'A-';
    }else if (percentage >= 70) {
        grade = 'B+';
    }else if (percentage >= 60) {
        grade = 'B-';
    }else if (percentage >= 50) {
        grade = 'C+';
    }else if (percentage >= 40) {
        grade = 'C-';
    }else if (percentage >= 30) {
        grade = 'D+';
    }else if (percentage >= 30) {
        grade = 'D-';
    }

    return {
        grade: grade,
        percentage: percentage,
    };

}

export default DailyQuizResult;
