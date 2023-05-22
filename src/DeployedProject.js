import { Avatar, Card, CardOverflow ,CardActionArea, CardHeader,Divider , Fade, Grid, Hidden, makeStyles, Typography, useMediaQuery, useTheme, CardContent, CardActions, Chip } from "@material-ui/core";

import { RepoIcon} from '@primer/octicons-react';
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
		minHeight: '15vh'
    },
    cardActionArea: {
        height: '100%',
    },
    expObj: {
        marginBottom: theme.spacing(4)
    },
	cardContent: {
		minHeight: '20vh'
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
												<Card key={i} className={classes.card} variant="outlined">
													<CardActionArea
														className={classes.cardActionArea}
														href={url}
														target="_blank"
														rel="noopener noreferrer"
													>
														<CardHeader className={classes.cardHeader}
															title={<><RepoIcon verticalAlign='middle' /> {companyName}</>}
														/>
														<CardContent className={classes.cardContent}>
															<Typography level="body3" align="right" sx={{ alignItems: 'flex-end', wordBreak: 'break-all' }}>
																{jobDesk}
															</Typography>
															<Divider inset="none" />
															<Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
																Project name :	{projectName}
															</Typography>
															
														</CardContent>
														<Divider />
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