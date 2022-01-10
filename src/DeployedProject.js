import { Avatar, Card, CardActionArea, CardHeader, Fade, Grid, Hidden, makeStyles, Typography, useMediaQuery, useTheme, CardContent, CardActions, Chip } from "@material-ui/core";
import Image from 'next/image'
import { RepoForkedIcon, RepoIcon, StarIcon } from '@primer/octicons-react';
import { DateRange, LocationCity } from '@material-ui/icons';
import data from '../data.json'
import { useRef } from "react";
import useAnimate from "./useAnimate";
const { deployed_projects } = data

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
    },
    card: {
        height: '100%',
    },
    cardHeader: {
        paddingTop: 0
    },
    cardActionArea: {
        height: '100%',
    },
    expObj: {
        marginBottom: theme.spacing(4)
    }
}))

export default function DeployedProject() {

    const classes = useStyles()
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const align = mdDown ? "center" : "flex-end"
    const textAlign = mdDown ? "center" : "left"

    const animRef = useRef(null)
    const animate = useAnimate(animRef)

	console.log(deployed_projects)
    return (
		<Grid direction="row-reverse" container justify="center" alignItems="center" spacing={10} className={classes.cont}>
			<Grid container item xs={12} lg={12} direction="row" spacing={1} alignItems={align}>
				{
					Object.getOwnPropertyNames(deployed_projects).map((title, id) => 
						<Grid item sm={12} xs={12} key={id}>
                            <Typography variant="h4" align={textAlign} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container item xs={12} lg={12} direction="row" spacing={1}>
                                {
									deployed_projects[title].map(({
										jobDesk,
										url,
										companyName,
										role,
										projectName,
                                    }, i) => 
										<Grid item sm={3} xs={12} key={i}>
											<Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
												<Card key={i} className={classes.card}>
													<CardActionArea
														className={classes.cardActionArea}
														href={url}
														target="_blank"
														rel="noopener noreferrer"
													>
														<CardHeader
															title={<><RepoIcon verticalAlign='middle' /> {projectName}</>}
														/>
														<CardContent>
															<Typography variant="body2" color="textSecondary" component="p">
																{projectName}
															</Typography>
															<Typography variant="body2" color="textSecondary" component="p">
																{jobDesk}
															</Typography>
															<Typography variant="body2" color="textSecondary" component="p">
																{companyName}
															</Typography>
														</CardContent>
														<CardActions>
															<Grid container direction="row" spacing={1}>
																<Grid item key={i}>
																	<Chip
																		key={i}
																		label={role}
																		size="small"
																	/>
																</Grid>
															</Grid>
														</CardActions>
													</CardActionArea>
												</Card>
											</Fade>
										</Grid>
									)
								}
                            </Grid>
                        </Grid>
                    )
				}
			</Grid>
			<div ref={animRef}></div>
		</Grid>
	)
}