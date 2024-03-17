import React from 'react'
import { Box, Grid, Typography, alpha, useTheme } from "@mui/material";
import { TickIcon, CrossIcon } from "../../icons";


import { $ } from "../../utils";
import { tokens } from "../../theme";

const QuestionWithResult = ({
    question = 'This is a question?',
    wrongAnswer = '',
    correctAnswer = ''
}) => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(correctAnswer);
  return (
    <Box sx={{marginTop: '-25px'}}>
          
            <Box sx={{
                display:'flex',
                flexDirection: 'row'
            }}>
                <Typography
                    sx={{
                    fontWeight: "500",
                    fontSize: $({ size: 15 }),
                    color: colors.extra.grey1,
                    }}
                >
                    {question}
                </Typography>

                { wrongAnswer !== ''  && (  
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginLeft: '5px'
                        }}>

                        <Typography
                            sx={{
                            fontWeight: "400",
                            fontSize: $({ size: 15 }),
                            color: colors.redAccent[300],
                            
                            }}
                        >
                            { wrongAnswer }
                            
                        </Typography>
                        
                        <Box sx={{paddingTop:'2px', paddingLeft:'5px'}}>
                            <CrossIcon 
                                color = {colors.redAccent[300]} 
                                size={12}
                                />
                        </Box> 

                    </Box>
                )
            }

            { wrongAnswer === ''  && (      
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginLeft: '5px'
                    }}>

                    <Typography
                        sx={{
                        fontWeight: "400",
                        fontSize: $({ size: 15 }),
                        color: colors.greenAccent[500],
                        
                        }}
                    >
                        { correctAnswer }
                    </Typography>
                    <Box sx={{paddingTop:'2px', paddingLeft:'5px'}}>
                        <TickIcon 
                            color = {colors.greenAccent[500]} 
                            size={12}
                            />
                    </Box>
                </Box>
                )
            }
                { wrongAnswer !== ''  && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginLeft: '5px'
                        }}>

                        <Typography
                            sx={{
                            fontWeight: "400",
                            fontSize: $({ size: 15 }),
                            color: alpha(colors.extra.grey1, 0.7),
                            
                            }}
                        >
                            { correctAnswer }
                        </Typography>
                        <Box sx={{paddingTop:'2px', paddingLeft:'5px'}}>
                            <TickIcon 
                                color = {alpha(colors.extra.grey1, 0.7)} 
                                size={12}
                                />
                        </Box>
                    </Box> )
                }
            </Box>

        </Box>
  )
}

export default QuestionWithResult