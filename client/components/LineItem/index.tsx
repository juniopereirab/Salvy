"use client"
import React from 'react'
import { ILine } from '@/interfaces/Line'
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import { PlansName } from '@/constants'
import { formatPhoneNumber } from '@/utils'

interface IlineItem {
  line: ILine
  index: number
}

const LineItem: React.FC<IlineItem> = ({ line, index }) => {
    const theme = useTheme()
    return (
        <Grid
            container
            padding='16px'
            sx={{
                transition: 'all 0.2s',
                '&:hover': { background: theme.palette.grey['100'] }
            }}
        >
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Stack
                    sx={{ background: theme.palette.primary.main }}
                    width='40px'
                    height='40px'
                    borderRadius='50%'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography fontWeight='bold' color='grey.100'>{index}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={5}>
                <Stack>
                    <Typography fontWeight='bold'>Número</Typography>
                    <Typography>{formatPhoneNumber(line.phoneNumber)}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={5}>
                <Stack>
                    <Typography fontWeight='bold'>Plano</Typography>
                    <Typography>{PlansName[line.plan]}</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default LineItem